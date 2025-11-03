import React from "react";
import MainHeader from "../components/common/Header/MainHeader";
import AppRoutes from "../app/AppRoutes";
import MainFooter from "../components/common/Footer/MainFooter";

const MainLayout = () => {
  return (
    <section className="flex min-h-screen flex-col">
      <header>
        <MainHeader />
      </header>
      <main className="flex-1">
        <AppRoutes />
      </main>
      <footer>
        <MainFooter />
      </footer>
    </section>
  );
};

export default MainLayout;
