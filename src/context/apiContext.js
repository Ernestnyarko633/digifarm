import React from 'react';
import configs from 'utils/configs';
import http from 'utils/httpFacade';

const APIContext = React.createContext({});

export const APIProvider = ({ children }) => {
  const { PAYMENT_API } = configs();

  const payment = async (payload) =>
    await http.post({
      url: `${PAYMENT_API}/payment/`,
      body: JSON.stringify(payload),
    });

  return (
    <APIContext.Provider value={{ payment }}>{children}</APIContext.Provider>
  );
};

export default function useAPI() {
  const context = React.useContext(APIContext);
  return context;
}
