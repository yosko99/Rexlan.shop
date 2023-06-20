const getQueryQty = (queryQty) => {
  const queryQuantity = queryQty;

  const quantity = queryQuantity !== undefined ? queryQuantity : 0;

  return Number(quantity);
};

module.exports = getQueryQty;
