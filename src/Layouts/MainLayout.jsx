import React from "react";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Outlet } from "react-router";
import NexusAIChat from "../components/NexusChat/NexusAIChat";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
      <NexusAIChat/>
      {/* footer */}
      <Footer />
    </>
  );
};

export default MainLayout;
