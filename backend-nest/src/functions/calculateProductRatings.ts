import { Rating } from '../interfaces/product';

const calculateProductRatings = (ratings: Rating[]) => {
  if (ratings !== undefined && ratings.length !== 0) {
    const totalRatings = ratings.length;
    let sumOfRatings = 0;

    for (let i = 0; i < totalRatings; i++) {
      sumOfRatings += ratings[i].rate;
    }

    return sumOfRatings / totalRatings;
  }

  return 0;
};

export default calculateProductRatings;
