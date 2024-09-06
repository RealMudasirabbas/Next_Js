import React from "react";
import Header from "./components/Header";
import HeroSectionHeader from "./components/HeroSectionHeader";
import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";
import TopContributers from "./components/TopContributers";
import Footer from "./components/Footer";

function Home() {
  return (
    <>
    <main className="flex flex-col items-center justify-center min-h-screen mb-8">
      <Header />
      <HeroSection />
      
        <LatestQuestions />
      
      <TopContributers />
    </main>
      <Footer />
      </>
  );
}

export default Home;
