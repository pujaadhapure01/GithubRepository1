import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

const Home = lazy(() => import("../pages/Home/Home"));
const Portfolio = lazy(() =>
  import("../pages/Portfolio/Portfolio")
);
const Pathway = lazy(() =>
  import("../pages/Pathway/Pathway")
);
const Jobs = lazy(() => import("../pages/Jobs/Jobs"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/pathway" element={<Pathway />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
