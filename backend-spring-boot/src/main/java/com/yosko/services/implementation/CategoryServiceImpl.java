package com.yosko.services.implementation;

import com.yosko.entities.Category;
import com.yosko.entities.CategoryTranslation;
import com.yosko.exceptions.ExceptionHandler;
import com.yosko.models.request.CategoryRequest;
import com.yosko.models.response.CustomResponse;
import com.yosko.repositories.CategoryRepository;
import com.yosko.services.service.CategoryService;
import com.yosko.services.service.TranslationService;
import com.yosko.utils.MultilingualFieldType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class CategoryServiceImpl implements CategoryService {
    private final TranslationService<Category> translationService;
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getCategories(String currentLang) {
        List<Category> categories = categoryRepository.findAll();

        return translationService.translateMultipleObjects(categories, currentLang);
    }

    @Override
    public Category getCategory(long id, String currentLang) {
        Category category = categoryRepository.findById(id).orElseThrow(() ->
                ExceptionHandler.throwNotFoundStatusException("global.noDataWithProvidedCategory", currentLang));

        return translationService.translateSingleObject(category, currentLang);
    }

    @Override
    public CustomResponse createCategory(CategoryRequest categoryRequest, String currentLang) {
        Category category = categoryRepository.findByName(categoryRequest.getName());

        if (category != null) {
            log.warn("Category with provided name ({}) already exists", categoryRequest.getName());
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    new MultilingualFieldType(Locale.forLanguageTag(currentLang))
                            .getLocalizedString("controllers.category.nameAlreadyExists"));
        }
        log.info("Saving category");

        Category newCategory = new Category(
                categoryRequest.getName(),
                categoryRequest.getBannerImg(),
                categoryRequest.getName()
        );

        if (!Objects.equals(currentLang, "en")) {
            assignNewCategoryTranslation(newCategory, categoryRequest, currentLang);
        }

        categoryRepository.save(newCategory);
        log.info("Category saved.");

        return new CustomResponse(new MultilingualFieldType(Locale.forLanguageTag(currentLang))
                .getLocalizedString("controllers.category.categoryCreated"), newCategory);
    }

    @Override
    public CustomResponse updateCategory(long id, CategoryRequest categoryRequest, String currentLang) {
        Category currentCategory = categoryRepository.findById(id).orElseThrow(() ->
                ExceptionHandler.throwNotFoundStatusException("global.noDataWithProvidedCategory", currentLang));

        updateProvidedCategory(currentCategory, categoryRequest, currentLang);

        return new CustomResponse(new MultilingualFieldType(Locale.forLanguageTag(currentLang))
                .getLocalizedString("controllers.category.categoryUpdated"));
    }

    @Override
    public CustomResponse deleteCategory(long id, String currentLang) {
        log.info("Deleting category with id ({})", id);
        categoryRepository.findById(id).orElseThrow(() ->
                ExceptionHandler.throwNotFoundStatusException("global.noDataWithProvidedCategory", currentLang));

//        TODO delete products from carts
//        if (productsInProvidedCategory != null) {
//            productsInProvidedCategory.forEach(async(product) = > {
//                    await this.cartsService.deleteProductFromAllCarts(product.id);
//      });
//        }
        categoryRepository.deleteById(id);
        log.info("Category deleted");

        return new CustomResponse(new MultilingualFieldType(Locale.forLanguageTag(currentLang))
                .getLocalizedString("controllers.category.categoryDeleted"));
    }

    @Override
    public void updateProvidedCategory(Category currentCategory, CategoryRequest categoryRequest, String currentLang) {
        log.info("Updating category with name ({})", categoryRequest.getName());
        if (!"en".equals(currentLang)) {
            // Update non-English
            AtomicBoolean updatedExistingLanguage = new AtomicBoolean(false);

            for (CategoryTranslation translation : currentCategory.getTranslations()) {
                if (translation.getLang().equals(currentLang)) {
                    translation.setName(categoryRequest.getName());
                    updatedExistingLanguage.set(true);
                }
            }
            if (!updatedExistingLanguage.get()) {
                assignNewCategoryTranslation(currentCategory, categoryRequest, currentLang);
            }
        } else {
            currentCategory.setName(categoryRequest.getName());
        }
        currentCategory.setBannerImage(categoryRequest.getBannerImg());

        categoryRepository.save(currentCategory);
        log.info("Category updated.");

    }

    @Override
    public Category retrieveCategory(String categoryName, String currentLang) {
        log.info("Retrieving category with name ({})", categoryName);

        Category category = categoryRepository.findByName(categoryName);

        if (category == null) {
            log.warn("Category with name ({}) could not be found.", categoryName);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    new MultilingualFieldType(Locale.forLanguageTag(currentLang))
                            .getLocalizedString("global.noDataWithProvidedCategory")
            );
        }

        return category;
    }

    private void assignNewCategoryTranslation(Category category, CategoryRequest request, String currentLang) {
        CategoryTranslation categoryTranslation = new CategoryTranslation(
                request.getName(),
                currentLang,
                category);

        category.getTranslations().add(categoryTranslation);
    }
}
