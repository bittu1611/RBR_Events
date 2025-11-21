import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import Services from "./pages/Services";
// import Gallery from "./pages/Gallery";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
// import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Single Page Scroll Layout */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              {/* <section id="home"><Home /></section>
              <section id="services"><Services /></section>
              <section id="gallery"><Gallery /></section>
              <section id="about"><About /></section>
              <section id="contact"><Contact /></section>
              <section id="dashboard"><Dashboard /></section> */}
              <Footer />
            </>
          }
        />

        {/* Separate Admin Route */}
        <Route
          path="/login"
          element={
            <>
              <Admin />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
