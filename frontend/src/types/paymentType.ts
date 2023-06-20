interface PurchaseUnitsType {
    amount: {
        currency_code: string;
        value: string
    },
    description: string;
}

interface PaymentType{
    id: string;
    create_time: string;
    payer: {
        email_address: string;
    },
    status: string;
    purchase_units: PurchaseUnitsType[];
}

export default PaymentType;
