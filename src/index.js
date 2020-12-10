import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index.css";
import { ChakraProvider } from "@chakra-ui/core";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import App from "container/App";
import { theme } from "theme/theme";
import reportWebVitals from "./reportWebVitals";
import PaymentContextProvider from 'context/paymentContext'
import AuthContextProvider from 'context/authContext'

const engine = new Styletron();

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <PaymentContextProvider>
          <AuthContextProvider>
              <App />
          </AuthContextProvider>
        </PaymentContextProvider>
      </BaseProvider>
    </StyletronProvider>
  </ChakraProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
