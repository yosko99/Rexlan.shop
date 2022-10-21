const getQueryQty = (queryQty: string) => {
  const queryQuantity = queryQty;

  const quantity = queryQuantity !== undefined ? queryQuantity : 0;

  return Number(quantity);
};

export default getQueryQty;
