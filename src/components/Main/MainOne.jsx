import React, { useRef, useState, useEffect } from "react";
import "./MainOne.css";
import HelloImg from "../../assets/hi.png";
import FarhaddJPG from "../../assets/farhad.jpg";
import Projects from "../Projects/Projects";
import AboutSection from "../About/About";
import { FaDownload } from "react-icons/fa";
import BackVideo from "../../assets/BackVideo.mp4";
import AOS from "aos";
import "aos/dist/aos.css";

const MainOne = () => {
  const projectsRef = useRef(null);
  const [frontendText, setFrontendText] = useState("Frontend");

  useEffect(() => {
    const words = ["Frontend", "Web"];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentWord = words[index];
      if (!isDeleting && charIndex < currentWord.length) {
        setFrontendText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      } else if (isDeleting && charIndex > 0) {
        setFrontendText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else if (charIndex === currentWord.length && !isDeleting) {
        setTimeout(() => (isDeleting = true), 500);
      } else if (charIndex === 0 && isDeleting) {
        isDeleting = false;
        index = (index + 1) % words.length;
      }
    };

    const intervalId = setInterval(typeEffect, 200);

    return () => clearInterval(intervalId);
  }, []);

  const scrollToProjects = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <div className="CommonMenu">
      <video autoPlay muted loop className="background-video">
        <source src={BackVideo} type="video/mp4" />
        Tarayıcınız videoyu desteklemiyor.
      </video>
      <div
        className="MainOne"
      >
        <div className="left">
          <div className="hi">
            <h1>Hi, I am Farhad!</h1>
            <img src={HelloImg} alt="" />
          </div>
          <div className="frontend">
            <div className="up">
              <h1>{frontendText}</h1>
            </div>
            <h1>Developer</h1>
          </div>
          <div className="info">
            <p>
              I am a Frontend developer based in Azerbaijan, I'll help you build
              beautiful websites your users will love.
            </p>
          </div>
          <div className="buttons">
            <a href="https://drive.usercontent.google.com/u/0/uc?id=1gSe7ubc4RmjlAA47F6RfIQUsCvlAkHdn&export=download">
              <button className="downloadbutton" type="button">
                <span className="downloadbutton__text">Download CV</span>
                <span className="downloadbutton__icon">
                  <FaDownload className="svg" />
                </span>
              </button>
            </a>

            <button className="ProjectButtonn" onClick={scrollToProjects}>
              <span className="ProjectButtonn-content">Projects</span>
            </button>
          </div>
        </div>
        <div className="right">
          <div className="myphoto">
            <img src={FarhaddJPG} alt="" />
          </div>
        </div>
      </div>
      <div
        className="ProjectsSection"
        ref={projectsRef}
        data-aos="fade-down"
        data-aos-anchor-placement="center-bottom"
        data-aos-once="false"
      >
        <Projects />
      </div>
      <div
        className="AboutSection"
        data-aos="fade-down"
        data-aos-anchor-placement="center-bottom"
        data-aos-once="false"
      >
        <AboutSection />
      </div>
     
    </div>
  );
};

export default MainOne;
