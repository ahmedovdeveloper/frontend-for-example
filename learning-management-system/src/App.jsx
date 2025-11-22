import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp"; 
import About from "./pages/About";
import Course from "./pages/Course";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

const App = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <div className={isHome ? "home-page" : ""}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/About" element={<About />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
