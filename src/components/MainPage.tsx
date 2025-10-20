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

  // Initialize from URL on mount
  useEffect(() => {
    const path = window.location.pathname.slice(1) || "home";
    setCurrentPage(path);
  }, []);

  // Update URL when page changes
  useEffect(() => {
    window.history.pushState(
      {},
      "",
      `/${currentPage === "home" ? "" : currentPage}`
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1) || "home";
      setCurrentPage(path);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "events":
        return <Events />;
      case "team":
        return <Team />;
      case "merch":
        return <MerchPage />;
      case "about":
        return <About />;
      case "sponsors":
        return <Sponsors />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black w-screen">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">
        {renderPage()}
        <ScrollToTop />
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
