import { ActiveOrbitProvider, AuthProvider } from "contexts";
import React from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter as Router } from "react-router-dom";
import "styles/styles.css";
import routes from "./routes";

const App = () => (
  <AuthProvider>
    <ActiveOrbitProvider>
      <Router>{renderRoutes(routes)}</Router>
    </ActiveOrbitProvider>
  </AuthProvider>
);

export default App;
