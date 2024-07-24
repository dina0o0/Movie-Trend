import React, { useState, useEffect } from 'react';
import '../Styles/Register.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Joker from '../Assets/Image/Joker.jpg';
import rock from '../Assets/Image/Rock.jpg';
import SHK from '../Assets/Image/SHK.jpg';
import tom from '../Assets/Image/Tom.jpg';
import diesel from '../Assets/Image/Diesel.jpg';
import trailers from '../Assets/Video/Trailers.mp4';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  let navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  async function register(values) {
    setIsLoading(true);
    setErrorMsg(null);
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((error) => {
      console.log(error);
      setIsLoading(false);
      toast.error(error.response.data.message + `sdfghjkl`, {
        position: "top-right",
        style: {
          background: '#363636',
          color: '#fff',
        },
      });
    });
    console.log(data);
    if (data.message === 'success') {
      localStorage.setItem('userEmail', values.email);
      setIsLoading(false);
      setVisible(false);
      navigate('/');
      toast.success(data.message, {
        position: "top-right",
      });
    }
}
  let mySchema = Yup.object({
    name: Yup.string().required('Please enter name (Required)').min(3, 'Must be more than 3 characters').max(20, 'Must be max name 20 characters'),
    email: Yup.string().required('Please enter email (Required)').email('Invalid Format'),
    password: Yup.string().required('Please enter password (Required)').matches(/^[A-Z][a-z0-9]{3,8}$/gm, 'password must start with capital'),
    rePassword: Yup.string().required('Please enter rePassword (Required)').oneOf([Yup.ref('password')], 'password and rePassword not matched'),
    phone: Yup.string().required('Please enter phone (Required)').matches(/^01[0125][0-9]{7}[^A-Za-z]$/gim, 'Invalid phone')
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }, validationSchema: mySchema,
    onSubmit: register,
  });

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.55)'
    },
    content: {
      width: '520px',
      height: '620px',
      margin: 'auto',
      padding: '60px 35px',
      borderRadius: '18px',
    },
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (visible && !event.target.closest('.ReactModal__Content')) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  if (visible) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'auto';
  }

  return (
    <>
      <header>
        <figure className='slideShow'>
          <div className='layer'>
            <article className='col-sm-11 col-md-9 col-lg-8 col-xl-7 col-xxl-4 content'>
              <h1>Discover unlimited trending movies and TV shows.</h1>
              <p>
                Ready to watch it later? Enter your email to create your membership with us.
              </p>
              <button onClick={() => setVisible(true)}>get signup</button>

              <Modal isOpen={visible} style={customStyles}>

                <div className='container'>
                  <form onSubmit={formik.handleSubmit}>
                    <h3 className='titleFormRegister'>register:</h3>
                    {errorMsg ? <div className='errorStyle'>{errorMsg}</div> : null}

                    <label htmlFor="name" className='titleLabelRegister'>name:</label>
                    <input type="text" className='inputStyleRegister' id='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} autoFocus />
                    {formik.errors.name && formik.touched.name ? <div className='errorStyle'>{formik.errors.name}</div> : null}

                    <label htmlFor="email" className='titleLabelRegister'>email:</label>
                    <input type="email" className='inputStyleRegister' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.email && formik.touched.email ? <div className='errorStyle'>{formik.errors.email}</div> : null}

                    <label htmlFor="password" className='titleLabelRegister'>password:</label>
                    <input type="password" className='inputStyleRegister' id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.password && formik.touched.password ? <div className='errorStyle'>{formik.errors.password}</div> : null}

                    <label htmlFor="rePassword" className='titleLabelRegister'>rePassword:</label>
                    <input type="password" className='inputStyleRegister' id='rePassword' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.rePassword && formik.touched.rePassword ? <div className='errorStyle'>{formik.errors.rePassword}</div> : null}

                    <label htmlFor="phone" className='titleLabelRegister'>phone:</label>
                    <input type="tel" className='inputStyleRegister' id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.phone && formik.touched.phone ? <div className='errorStyle'>{formik.errors.phone}</div> : null}

                    {isLoading ? <span><i className='fa fa-spin fa-spinner'></i></span> : <button type='submit' className='registerBtn' disabled={!(formik.isValid && formik.dirty)} >register</button>}
                  </form>
                  <i onClick={() => setVisible(false)} className="fa-solid fa-xmark closeIcon"></i>
                </div>

              </Modal>
            </article>
          </div>
        </figure>

        <div className='container'>

          <section className='row'>
            <figcaption className='col-sm-12 col-md-12 col-lg-6'>
              <p>Discover the latest types of movies and trending series, action, romance, and drama, to enjoy on your own device.</p>
            </figcaption>
            <figure className='col-sm-12 col-md-12 col-lg-6'>
              <LazyLoadImage src={Joker} alt='Joker' effect="blur" />
            </figure>
          </section>

          <section className='row' >
            <article className='col-sm-12 col-md-12 col-lg-9 col-xl-8 col-xxl-7'>
              <h3>This is a collection of the most important trailers for the latest upcoming action films.</h3>
            </article>
            <video className='col-12' width='100%' src={trailers} controls>
            </video>
          </section>

          <section className='row'>
            <article className='col-12'>
              <h3>There is a biography of the most famous actors in the world.</h3>
            </article>
            <div className='col-sm-6 col-lg-3'>
              <div className="card">
                <LazyLoadImage src={rock} alt='Rock' />
                <div className="card-text">
                  <h3>rock</h3>
                  <p>rock description</p>
                </div>
              </div>
            </div>
            <div className='col-sm-6 col-lg-3'>
              <div className="card">
                <LazyLoadImage src={SHK} alt='SHK' />
                <div className="card-text">
                  <h3>shk</h3>
                  <p>shk description</p>
                </div>
              </div>
            </div>
            <div className='col-sm-6 col-lg-3'>
              <div className="card">
                <LazyLoadImage src={tom} alt='Tom' />
                <div className="card-text">
                  <h3>tom</h3>
                  <p>tom description</p>
                </div>
              </div>
            </div>
            <div className='col-sm-6 col-lg-3'>
              <div className="card">
                <LazyLoadImage src={diesel} alt='Diesel' />
                <div className="card-text">
                  <h3>diesel</h3>
                  <p>diesel description</p>
                </div>
              </div>
            </div>


            <div>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  const decoded = jwtDecode(credentialResponse?.credential)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          </section>
        </div>
      </header>
    </>
  );
}
