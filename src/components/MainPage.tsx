import { useState, useEffect } from "react";
import { Home } from "./Home";
import { Team } from "./Team";
import { About } from "./About";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import Events from "./Events";
import { MerchPage } from "./MerchPage";
import { Sponsors } from "./Sponsors";
import ScrollToTop from "./ScrollToTop";

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const path = window.location.pathname.slice(1) || "home";
    setCurrentPage(path);
  }, []);

  useEffect(() => {
    const newPath = `/${currentPage === "home" ? "" : currentPage}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, "", newPath);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1) || "home";
      setCurrentPage(path);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const pageComponents: Record<string, React.ReactNode> = {
    home: <Home onNavigate={setCurrentPage} />,
    events: <Events />,
    team: <Team />,
    merch: <MerchPage />,
    about: <About />,
    sponsors: <Sponsors />,
  };

  const PageToRender = pageComponents[currentPage] || pageComponents.home;

  return (
    <div className="flex flex-col min-h-screen bg-black w-full">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">
        {PageToRender}
        <ScrollToTop />
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
