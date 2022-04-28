const getQueryQty = (queryQty) => {
  const queryQuantity = queryQty;

  const quantity = queryQuantity !== undefined ? queryQuantity : 0;

  return quantity;
};

module.exports = getQueryQty;
