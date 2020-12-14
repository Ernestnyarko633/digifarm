import React ,{createContext} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import getConfig from '../utils/configs'
import http from '../utils/httpFacade'
export const PaymentContext = createContext()

const PaymentContextProvider = ({children}) => {

    const PAYMENT_API = getConfig().PAYMENT_API

    const uploadPaymentDetails = async (id, formData)=> {
        try{
            return await http.patch({
                url:`${PAYMENT_API}/payment/receipt-upload?order_id=${id}`,
                body: formData
            })
        }catch(error){
            return error
        }
    }

    return(
        <PaymentContext.Provider
         value={{
             uploadPaymentDetails
         }}
        >
            {children}
        </PaymentContext.Provider>
    )
}

PaymentContextProvider.propTypes= {
    children: PropTypes.node.isRequired
}

export default PaymentContextProvider