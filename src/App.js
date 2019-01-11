import React from "react";

import "./index.css";

import Header from "./components/Header";
import FormContainer from "./components/FormContainer";
import Footer from "./components/Footer";

const App = () => (
  <>
    <div className="container">
      <Header />
      <FormContainer />
      <Footer />
    </div>
  </>
);

export default App;
