import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import urqlClient from "apollo/urqlClient";
import React from "react";
import ReactDOM from "react-dom";
import theme from "styles/theme";
import { Provider as UrqlProvider } from "urql";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// override elevation 1 box shadow
theme.shadows[1] = "0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UrqlProvider value={urqlClient}>
        <CssBaseline />
        <App />
      </UrqlProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
