import React from "react";
import Header from "../../../partials/Header";
import Footer from "../../../partials/Footer";
import Banner from "./banner/Banner";
import Services from "./services/Services";
import Testimonials from "./testimonials/Testimonials";
import Contact from "./contact/Contact";
import About from "./about/About";


const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <Services />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
