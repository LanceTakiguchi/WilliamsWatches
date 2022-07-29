import React, { useState } from "react";

export const OrderIdContext = React.createContext({
    orderId: '',
    changeOrderId: (value: string) => {}
});

export const OrderIdempotencyContext = React.createContext({
    orderIdempotency: '',
    changeOrderIdempotency: (value: string) => {}
});

export const PaymentIdContext = React.createContext({
    paymentId: '',
    changePaymentId: (value: string) => {}
});

export const PaymentIdempotencyContext = React.createContext({
    paymentIdempotency: '',
    changePaymentIdempotency: (value: string) => {}
});
