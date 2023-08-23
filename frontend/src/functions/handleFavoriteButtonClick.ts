import checkIfLiked from './checkIfLiked';

export const handleFavoriteButtonClick = (productID: string): void => {
  const checkExists = checkIfLiked(productID);

  // Check if array is empty
  let likedLocalStorage: string[] = [];
  if (localStorage.getItem('liked') !== '[]') {
    likedLocalStorage = JSON.parse(localStorage.getItem('liked')!);
  }

  // Check if product id is already in array
  if (!checkExists) {
    // Not in array (add it)
    const likedProducts = [...likedLocalStorage, productID];
    localStorage.setItem('liked', JSON.stringify(likedProducts));
  } else {
    // Product id is in array (remove it)
    const likedProducts = likedLocalStorage.filter(
      (likedProduct: string) => likedProduct !== productID
    );
    localStorage.setItem('liked', JSON.stringify(likedProducts));
  }

  // Notify there was a change in storage so event listener can trigger
  window.dispatchEvent(new Event('storage'));
};

export default handleFavoriteButtonClick;
