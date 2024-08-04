import React from "react";
import Header from "../Header/Header";
import Welcome from "../Welcome/Welcome";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Welcome />
      <Footer/>
    </>
  );
}

export default Home;
