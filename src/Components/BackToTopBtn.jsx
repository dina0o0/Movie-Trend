import React, { useEffect, useState } from 'react';
import useWindowSize from '../Hooks/Window-size';
import '../Styles/BackToTopBtn.scss';
// import { FaLongArrowAltUp } from "react-icons/fa";

const BackToTopBtn = () => {
  const { scrollY } = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = Math.round((scrollY * 100) / calcHeight);
    setIsVisible(scrollValue > 5);

    const scrollProgress = document.getElementById('progress');
    scrollProgress.style.background = `conic-gradient(#fe1f20 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div id="progress" className={isVisible ? '' : 'hidden'} onClick={scrollToTop}>
      <span id="progress-value"><i className="fa-solid fa-arrow-up"></i></span>
    </div>
  );
};

export default BackToTopBtn;
