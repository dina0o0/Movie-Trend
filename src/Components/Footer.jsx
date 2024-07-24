import React from "react";
import '../Styles/Footer.scss';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom/dist";
// import logoBlack from '../Assets/Image/LogoBlack.svg';
// import logoGray from '../Assets/Image/LogoGray.svg';
// import logoPink from '../Assets/Image/LogoPink.svg';

import logo from '../Assets/Image/FooterLogo.png';
// import logoGray from "../Assets/Image/LogoGrayy.png";
// import logoPink from '../Assets/Image/LogoPinkk.png';
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <Link className='col-4' to='/'>
            <LazyLoadImage src={logo} alt="" />
          </Link>
          <p className="col-4">
            Movies Trending is a free site to explore the latest trending movies and series
            without ads, watch them later if you want, and know all the information
            about the stars. Just register.
          </p>
          <p className='col-4'>You do not need VPN software for this site to work.
            2024 MoviesTrending.com, All rights reserved.</p>
        </div>

        <div className="row">
          <ul className="group-icon">
            <li>
              <i className='fa-brands fa-facebook-f'></i>
            </li>
            <li>
              <i className='fa-brands fa-x-twitter'></i>
            </li>
            <li>
              <i className='fa-brands fa-instagram'></i>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
