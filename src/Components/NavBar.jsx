import React, { useEffect, useState } from 'react';
import '../Styles/NavBar.scss';
import useWindowSize from '../Hooks/Window-size';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import logoBlack from '../Assets/Image/LogoBlackk.png';
import { Link, NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import Login from '../Pages/Login';
import DarkMode from './DarkMode';
export default function NavBar({ userData, logOut, saveUserData }) {
  const [menu, setMenu] = useState(false);
  const { width, scrollY } = useWindowSize();
  const [loginModalOpen, setLoginModalOpen] = useState(false); // حالة لفتح وإغلاق المودال

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.55)'
    },
    content: {
      width: '520px',
      height: '620px',
      backgroundColor: 'white',
      margin: 'auto',
      padding: '60px 35px',
      borderRadius: '18px',
      // textAlign:'center',
    },
  };
  useEffect(() => {
    if (loginModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loginModalOpen]);

  return (
    <>
      <nav>
        <div className={`${scrollY > 50 ? "activeScrollBottom" : "activeScrollTop"}`}>
          <div className='container dFlex'>
            <Link to='register'>
              <LazyLoadImage src={logoBlack} alt='Logo' effect='blur' width={200} />
            </Link>
            {width >= 991 ? (
              <>
                {userData ? (
                  <>
                    <ul>
                      <li><NavLink to='/'>home</NavLink></li>
                      <li><NavLink to='movies'>movies</NavLink></li>
                      <li><NavLink to='tvShow'>tv show</NavLink></li>
                      <li><NavLink to='Celebrities'>celebrities</NavLink></li>
                    </ul>
                    <ul>
                      <li><NavLink onClick={logOut}>logOut</NavLink></li>
                      <li><DarkMode /></li>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul>
                      <li><NavLink to='/'>register</NavLink></li>
                      <li><NavLink onClick={() => setLoginModalOpen(true)}>login</NavLink></li>
                    </ul>
                    <ul>
                      <li><DarkMode /></li>
                    </ul>
                  </>
                )}
              </>) : (
              <button className={`hamburger hamburger--elastic ${menu ? "is-active" : ''}`} type="button" onClick={() => setMenu(!menu)}>
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            )}

          </div>
        </div>
      </nav>

      <div className={`menu ${menu ? "active" : ''}`}>
        <div className="container">
          <ul>
            <li><NavLink onClick={() => setMenu(false)} to='home'>home</NavLink></li>
            <li><NavLink onClick={() => setMenu(false)} to='movies'>movies</NavLink></li>
            <li><NavLink onClick={() => setMenu(false)} to='tvShow'>tv show</NavLink></li>
            <li><NavLink onClick={() => setMenu(false)} to='people'>people</NavLink></li>
            <li><NavLink onClick={() => setMenu(false)} to='register'>register</NavLink></li>
            <li><NavLink onClick={() => { setMenu(false); setLoginModalOpen(true); }} to='login'>login</NavLink></li>
          </ul>
        </div>
      </div>

      {/* مودال تسجيل الدخول */}
      <Modal isOpen={loginModalOpen} onRequestClose={() => setLoginModalOpen(false)} style={customStyles}>
        <Login saveUserData={() => { saveUserData(); setLoginModalOpen(false); }} />
        <i onClick={() => setLoginModalOpen(false)} className="fa-solid fa-xmark closeIcon"></i>

      </Modal>
    </>
  )
}


