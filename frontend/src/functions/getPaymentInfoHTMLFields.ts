import HTMLFields from '../types/htmlFields';
import PaymentType from '../types/paymentType';
import TextDataType from '../types/textDataType';

const getPaymentInfoHTMLFields = (
  lang: HTMLFields,
  location: { state: PaymentType }
) => {
  const paymentInfoHTMLFields: TextDataType[] = [
    {
      text: lang.cart.successfulPaymentPage.status,
      data: location.state.status
    },
    {
      text: lang.cart.successfulPaymentPage.createTime,
      data: location.state.create_time
    },
    {
      text: lang.cart.successfulPaymentPage.currentCurrency,
      data: location.state.purchase_units[0].amount.currency_code
    },
    {
      text: lang.cart.successfulPaymentPage.email,
      data: location.state.payer.email_address
    },
    {
      text: lang.cart.successfulPaymentPage.description,
      data: location.state.purchase_units[0].description
    },
    {
      text: lang.cart.successfulPaymentPage.paymentID,
      data: location.state.id
    }
  ];
  return paymentInfoHTMLFields;
};

export default getPaymentInfoHTMLFields;
