import React from "react";
import Header from "../Layout/Header";
import StoryGrid from "./StoryGrid";
import SubmitForm from "./SubmitForm";
import Footer from "../Layout/Footer";

const HomePage = () => {
  return (
    <>
    <Header/>
      <div className="mt-8 mx-auto max-w-7xl ">
        <a
          href="https://careduel.com/topic-of-the-week"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-md p-4 md:p-6 text-center hover:scale-[1.02] transition-transform"
        >
          <h2 className="text-lg md:text-xl font-semibold">
            💡 Topic of the Week: Explore on CareDuel
          </h2>
          <p className="text-sm md:text-base mt-1 opacity-90">
            Tap to read the weekly conversation starter on careduel.com
          </p>
        </a>
      </div>
      <StoryGrid/>
      <SubmitForm/>
      <Footer/>
    </>
  );
};

export default HomePage;
