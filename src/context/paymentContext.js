import React ,{createContext} from 'react'
import PropType from 'prop-types'
import axios from 'axios'
import getConfig from '../utils/configs'

const PAYMENT_API = getConfig().PAYMENT_API

export const PaymentContext = createContext()

const PaymentContextProvider = ({children}) => {

    const addPaymentDetails = async payload => {
        
        try {
            await axios({
                method: 'post',
                url: `${PAYMENT_API}y/payment/receipt-upload`,
                body: payload
            })
        } catch (error) {
            return error
        }
    }

    return(
        <PaymentContext.Provider
            value={{
                addPaymentDetails
            }}
        >
            
        </PaymentContext.Provider>
    )
}

PaymentContextProvider.propType = {
    children: PropType.node.isRequired
}

export default PaymentContextProvider