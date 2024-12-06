import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLocationArrow,
} from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { useForm, ValidationError } from '@formspree/react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";  // ReCAPTCHA import
import './About.css';

const AboutSection = () => {
  const [notification, setNotification] = useState('');
  const [notificationClass, setNotificationClass] = useState('');
  const [locationData, setLocationData] = useState({
    ip: '',
    countryFlag: '',
    countryCode: '',
    city: '',
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);  // Store ReCAPTCHA value

  // Formspree integration
  const [state, handleSubmit] = useForm("mnnqdvnp");  // Form ID from Formspree

  // Fetch location from IPStack API
  useEffect(() => {
    // Replace with your IPStack API key
    const ipStackAPIKey = 'd296f3cfbc75050526368e3f85d480db';

    const fetchLocation = async () => {
      try {
        const response = await axios.get(`http://api.ipstack.com/check?access_key=${ipStackAPIKey}`);
        if (response.data) {
          const { ip, country_flag, country_code, city } = response.data;
          setLocationData({
            ip,
            countryFlag: country_flag,
            countryCode: country_code,
            city: city,
          });
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, []);

  // Handle success notification when Formspree submission succeeds
  useEffect(() => {
    if (state.succeeded) {
      setNotification('Mesajınız uğurla göndərildi!');
      setNotificationClass('show');

      setTimeout(() => {
        setNotificationClass('hide');
        setTimeout(() => {
          setNotification('');
          setNotificationClass('');
        }, 500);
      }, 3000);
    }
  }, [state.succeeded]);

  // Modify handleSubmit to include location data
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      alert("Lütfen reCAPTCHA doğrulamasını tamamlayın.");
      return;  // If ReCAPTCHA is not solved, do not submit
    }

    // Append location info to form data
    const formData = new FormData(e.target);
    formData.append('ip_address', locationData.ip);
    formData.append('country_flag', locationData.countryFlag);
    formData.append('country_code', locationData.countryCode);
    formData.append('city', locationData.city);
    formData.append('g-recaptcha-response', recaptchaValue);  // Include the ReCAPTCHA response

    handleSubmit(formData);
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);  // Store ReCAPTCHA response
  };

  return (
    <div className="AboutSectionContainer">
      <h1>About</h1>
      <hr className="about-separator" />
      <div className="about-container">
        <div className="about-card">
          <div className="about-content">
            <p>
              I’m an aspiring frontend developer born on June 15, 1998, in
              Agstafa, Azerbaijan. I hold a bachelor's and master's degree from
              Azerbaijan Technical University. I’m passionate about
              creating user-friendly interfaces using HTML, CSS, JavaScript, and
              frameworks like React. I look forward to connecting and
              collaborating on projects!
            </p>
            <div className="about-tags">
              <span className="tag">#Innovative</span>
              <span className="tag">#Developer</span>
              <span className="tag">#Designer</span>
              <span className="tag">#Frontend</span>
              <span className="tag">#UI/UX</span>
              <span className="tag">#JavaScript</span>
              <span className="tag">#ReactJS</span>
              <span className="tag">#CSS</span>
              <span className="tag">#ResponsiveDesign</span>
            </div>

            <form className="ContactInputs" onSubmit={handleFormSubmit}>
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                required
              />
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                required
              />
              <label htmlFor="message">Mesaj:</label>
              <textarea
                name="message"
                id="message"
                placeholder="Message..."
                required
              ></textarea>
              
              {/* ReCAPTCHA */}
              <ReCAPTCHA
                sitekey="6LcATXcqAAAAAFkl0jc2DE_aA5A2QJHydpCVOihx" 
                onChange={handleRecaptchaChange}
                theme="light"  
                size="normal"
              />
              
              <button type="submit" id="message-send" disabled={state.submitting}>
                Send
              </button>
              <div className={`notification ${notificationClass}`}>
                {notification}
              </div>

              {/* Formspree Validation Errors */}
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </form>

            <div className="contact-info-container">
              <h2>Contact</h2>
              <div className="CommonContact">
                <a>
                  <p>
                    <i>
                      <FaLocationArrow size="1.2em" />
                    </i>
                    Baku, N.Narimanov 27
                  </p>
                </a>
                <a href="tel:+994555254193">
                  <p>
                    <i>
                      <IoIosCall size="1.6em" />
                    </i>
                    +994 (55) 525 4193
                  </p>
                </a>
                <a href="mailto:sultanoworks@gmail.com?subject=Hi Farhad Sultan">
                  <p>
                    <i>
                      <IoIosMail size="1.6em" />
                    </i>
                    sultanoworks@gmail.com
                  </p>
                </a>
              </div>
              <div className="ContactLinks">
                <ul className="SocialIcons">
                  <a
                    href="https://www.facebook.com/ferhad.sultann"
                    target="blank"
                  >
                    <li className="icon facebook">
                      <span className="iconname">Facebook</span>
                      <FaFacebookF size="1.6em" />
                    </li>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/farhadsultan98/"
                    target="blank"
                  >
                    <li className="icon linkedin">
                      <span className="iconname">Linkedin</span>
                      <FaLinkedinIn size="1.6em" />
                    </li>
                  </a>
                  <a
                    href="https://www.instagram.com/ferhad.sultann"
                    target="blank"
                  >
                    <li className="icon instagram">
                      <span className="iconname">Instagram</span>
                      <FaInstagram size="1.6em" />
                    </li>
                  </a>
                  <a href="https://github.com/ferhadsultan98" target="blank">
                    <li className="icon github">
                      <span className="iconname">Github</span>
                      <FaGithub size="1.6em" />
                    </li>
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
