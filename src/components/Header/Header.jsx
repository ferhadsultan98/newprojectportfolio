import React, { useState, useEffect } from "react";
import { Twirl as Hamburger } from "hamburger-react";
import "./Header.css";
import HeaderLogo from "../../assets/FS.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const getScrollHeight = (section) => {
    const isMobile = window.innerWidth <= 768;
    switch (section) {
      case "projects":
        return isMobile ? 1300 : 700;
      case "about":
        return isMobile ? 2400 : 1700;
      default:
        return 0;
    }
  };

  const scrollToSection = (section) => {
    const height = getScrollHeight(section);
    window.scrollTo({
      top: height,
      behavior: "smooth",
    });
    setIsMenuOpen(false); 
  };

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <header
      className={`header ${isHeaderVisible ? "visible" : "hidden"}`}>
      <div className="logo" title="Farhad Sultanov">
        <a onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={HeaderLogo} alt="" />
        </a>
      </div>
      <div className="header-right">
        <i className="hamburger-react-menuicon">
          <Hamburger
            toggled={isMenuOpen}
            toggle={setIsMenuOpen}
            color="black"
          />
        </i>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <a onClick={() => scrollToSection("home")}>Home</a>
          </li>
          <li>
            <a onClick={() => scrollToSection("projects")}>Projects</a>
          </li>
          <li>
            <a onClick={() => scrollToSection("about")}>About</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
