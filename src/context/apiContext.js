import React from 'react';
import configs from 'utils/configs';
import http from 'utils/httpFacade';

const APIContext = React.createContext({});

export const APIProvider = ({ children }) => {
  const PAYMENT_API = configs().PAYMENT_API;

  const payment = async (payload) => {
    try {
      return http.post({
        url: `${PAYMENT_API}/payment/`,
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <APIContext.Provider value={{ payment }}>{children}</APIContext.Provider>
  );
};

export default function useAPI() {
  const context = React.useContext(APIContext);
  return context;
}
