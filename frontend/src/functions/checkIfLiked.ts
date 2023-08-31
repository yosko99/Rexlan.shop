const checkIfLiked = (productID: string): boolean => {
  const liked = localStorage.getItem('liked');

  if (liked !== null && liked !== '[]') {
    const localStorageProducts = JSON.parse(liked);
    const productIndex = localStorageProducts.indexOf(productID);

    return productIndex !== -1;
  }

  // Init liked key in local storage
  localStorage.setItem('liked', '[]');
  return false;
};

export default checkIfLiked;
