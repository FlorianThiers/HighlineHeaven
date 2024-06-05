import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Errormessage from "./components/Errormessage/Errormessage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Authentication from "./pages/Authentication/Authentication";
import HomePage from "./pages/Home/Home";
import { ProductProvider } from "./Contexts/ProductContext";

function App() {
  return (
    <>
      <ProductProvider>
        <Header />
        <Errormessage />
        <Authentication />
        <Footer />
      </ProductProvider>
    </>
  );
}

export default App;