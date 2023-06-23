package com.yosko.services.implementation;

import com.yosko.dtos.dto.ProductDTO;
import com.yosko.dtos.mapper.ProductDTOMapper;
import com.yosko.entities.Category;
import com.yosko.entities.Product;
import com.yosko.entities.ProductTranslation;
import com.yosko.enums.ProductSortingType;
import com.yosko.models.response.CustomResponse;
import com.yosko.models.request.ProductRequest;
import com.yosko.models.request.ProductUpdateRequest;
import com.yosko.repositories.ProductRepository;
import com.yosko.services.service.CategoryService;
import com.yosko.services.service.ProductService;
import com.yosko.services.service.TranslationService;
import com.yosko.utils.MultilingualFieldType;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final TranslationService<Product> translationService;

    @Override
    public List<ProductDTO> getProducts(int qty, String currentLang) {
        log.info("Retrieving products with limit ({}) and lang ({})", qty, currentLang);

        Pageable limit = PageRequest.of(0, qty);
        List<Product> products = productRepository.findAll(limit).toList();

        return translateAndMapProducts(products, currentLang);
    }

    @Override
    public ProductDTO getProduct(long productID, String currentLang) {
        Product product = retrieveProduct(productID, currentLang);

        return new ProductDTOMapper(translationService, currentLang).apply(product);
    }

    @Override
    public List<ProductDTO> getProductsByCategory(int qty, String categoryName, String currentLang) {
        log.info("Retrieving products with limit ({}), lang ({}) and category ({})", qty, currentLang, categoryName);
        categoryService.retrieveCategory(categoryName, currentLang);

        List<Product> products = productRepository.getProductsByCategoryName(categoryName)
                .stream()
                .limit(qty)
                .toList();

        return translateAndMapProducts(products, currentLang);
    }

    @Override
    public List<ProductDTO> getProductsSortedByAttribute(int qty, ProductSortingType productAttribute,
            String currentLang) {
        log.info("Retrieving products with limit ({}), lang ({}), sorted by attribute ({})",
                qty, currentLang, productAttribute.toString());

        List<Product> products = productRepository.findAll(Sort.by(Sort.Direction.DESC, productAttribute.toString()))
                .stream()
                .limit(qty)
                .toList();

        return translateAndMapProducts(products, currentLang);
    }

    @Override
    public List<ProductDTO> getProductsByQueryString(String pattern, String currentLang) {
        log.info("Retrieving products with pattern ({}) and lang ({})", pattern, currentLang);

        List<Product> products = productRepository.getProductsByPattern(pattern).stream()
                .limit(4)
                .toList();

        return translateAndMapProducts(products, currentLang);
    }

    @Override
    public Product createProduct(ProductRequest productRequest, String currentLang) {
        log.info("Saving product");
        Category category = categoryService.retrieveCategory(productRequest.getCategoryName(), currentLang);

        Product newProduct = new Product(
                productRequest.getTitle(),
                productRequest.getPrice(),
                productRequest.getDescription(),
                productRequest.getImage(),
                category);

        if (!Objects.equals(currentLang, "en")) {
            assignNewProductTranslation(newProduct, productRequest, currentLang);
        }

        productRepository.save(newProduct);
        log.info("Product saved.");

        return newProduct;
    }

    @Override
    public CustomResponse deleteProduct(long productID, String currentLang) {
        log.info("Deleting product with id ({})", productID);
        retrieveProduct(productID, currentLang);
        // TODO cartsService.deleteProductFromAllCarts
        productRepository.deleteById(productID);
        log.info("Product deleted");

        return new CustomResponse(
                new MultilingualFieldType(Locale.forLanguageTag(currentLang))
                        .getLocalizedString("global.dataDeleted"));
    }

    @Override
    public CustomResponse updateProduct(long productID, ProductUpdateRequest productRequest, String currentLang) {
        Product product = retrieveProduct(productID, currentLang);

        updateProvidedProduct(product, productRequest, currentLang);

        return new CustomResponse(
                new MultilingualFieldType(Locale.forLanguageTag(currentLang))
                        .getLocalizedString("controllers.product.productUpdated"));
    }

    @Override
    public Product updateProvidedProduct(Product currentProduct, ProductUpdateRequest updateRequest,
            String currentLang) {
        log.info("Updating product with title ({})", currentProduct.getTitle());

        Category newCategory = categoryService.retrieveCategory(updateRequest.getCategory(), currentLang);
        String newDescription = updateRequest.getDescription();
        String newTitle = updateRequest.getTitle();

        if (!"en".equals(currentLang)) {
            // Update non-English
            AtomicBoolean updatedExistingLanguage = new AtomicBoolean(false);

            for (ProductTranslation translation : currentProduct.getTranslations()) {
                if (translation.getLang().equals(currentLang)) {
                    translation.setTitle(updateRequest.getTitle());
                    translation.setDescription(updateRequest.getDescription());
                    updatedExistingLanguage.set(true);
                    break;
                }
            }
            if (!updatedExistingLanguage.get()) {
                currentProduct.getTranslations()
                        .add(new ProductTranslation(newTitle, newDescription, currentLang, currentProduct));
            }

        } else {
            // Update English
            currentProduct.setTitle(newTitle);
            currentProduct.setDescription(newDescription);
        }

        currentProduct.setPrice(updateRequest.getPrice());
        currentProduct.setCategory(newCategory);
        currentProduct.setImage(updateRequest.getImage());

        productRepository.save(currentProduct);
        log.info("Product updated.");

        return currentProduct;
    }

    @Override
    public Product retrieveProduct(long id, String currentLang) {
        log.info("Retrieving product with id ({})", id);

        return productRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        new MultilingualFieldType(Locale.forLanguageTag(currentLang))
                                .getLocalizedString("global.noDataWithProvidedID")));
    }

    private void assignNewProductTranslation(Product product, ProductRequest request, String currentLang) {
        log.info("Assigning translation to product with lang ({})", currentLang);
        ProductTranslation productTranslation = new ProductTranslation(
                request.getTitle(),
                request.getDescription(),
                currentLang,
                product);
        product.getTranslations().add(productTranslation);
    }

    public List<ProductDTO> translateAndMapProducts(List<Product> products, String currentLang) {
        ProductDTOMapper mapper = new ProductDTOMapper(translationService, currentLang);

        return translationService.translateMultipleObjects(products, currentLang)
                .stream()
                .map(mapper)
                .toList();
    }
}
