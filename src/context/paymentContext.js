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
                url:`${PAYMENT_API}/payment/receipt-upload?payment_id=${id}`,
                body: formData
            })
        }catch(error){
            return error
        }
    }


    const deleteBankTransfer = async (id)=> {
        try {
            return await http.patch({
                url:`${PAYMENT_API}/payment/receipt-delete?payment_id=${id}`
            })
        } catch (error) {
            return error
        }
    }

    return(
        <PaymentContext.Provider
         value={{
             uploadPaymentDetails,
             deleteBankTransfer
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