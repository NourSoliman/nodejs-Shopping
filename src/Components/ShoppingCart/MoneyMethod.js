import React, { useEffect } from "react";
import {PayPalScriptProvider , PayPalButtons} from '@paypal/react-paypal-js'

function MoneyMethod() {
  return (
    <div>
        <PayPalScriptProvider>
            <PayPalButtons className="paypal-buttons"/>
        </PayPalScriptProvider>
    </div>
  )
}

export default MoneyMethod