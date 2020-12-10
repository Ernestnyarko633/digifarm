import React ,{createContext} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import getConfig from '../utils/configs'

export const PaymentContext = createContext()

const PaymentContextProvider = ({children}) => {

    const PAYMENT_API = getConfig().PAYMENT_API

    const uploadPaymentDetails = async payload=> {
        try{
            await axios({
                method: 'post',
                url:`${PAYMENT_API}/payment/receipt-upload`,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('auth'))}`
                },
                body: payload
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