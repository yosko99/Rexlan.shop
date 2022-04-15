export const checkIfLiked = (productID: string): boolean => {
  const liked = localStorage.getItem('liked');

  if (liked !== null && liked !== '') {
    const localStorageProcuts = JSON.parse(liked);
    const productIndex = localStorageProcuts.indexOf(productID);

    return productIndex !== -1;
  }

  // Init liked key in local storage
  localStorage.setItem('liked', '');
  return false;
};

export const clickHandle = (productID: string): void => {
  const checkExists = checkIfLiked(productID);

  // Check if array is empty
  let likedLocalStorage: string[] = [];
  if (localStorage.getItem('liked') !== '') {
    likedLocalStorage = JSON.parse(localStorage.getItem('liked')!);
  }

  // Check if product id is already in array
  if (!checkExists) { // Not in array (add it)
    const likedProducts = [...likedLocalStorage, productID];
    localStorage.setItem('liked', JSON.stringify(likedProducts));
  } else { // Product id is in array (remove it)
    const likedProducts = likedLocalStorage.filter(
      (likedProduct: string) =>
        likedProduct !== productID);
    localStorage.setItem('liked', JSON.stringify(likedProducts));
  }

  // Notify there was a change in storage so event listener can trigger
  window.dispatchEvent(new Event('storage'));
};
