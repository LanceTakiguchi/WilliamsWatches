import React, { useState } from "react";

const OrderIdContext = React.createContext({
    orderId: '',
    changeOrderId: (value: string) => {}
});

export default OrderIdContext;