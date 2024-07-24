import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import '../Styles/Register.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import ForgotPassword from '../Components/ForgetPassword';


export default function Login({ saveUserData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      formik.setValues({ ...formik.values, email: storedEmail });
    }
  }, []);

  async function login(values) {
    setIsLoading(true);
    setErrorMsg(null);
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((error) => {
      setIsLoading(false);
      toast.error(error.response.data.message, {
        position: "top-right",
      });
    });
    if (data.message === 'success') {
      localStorage.setItem('userToken', data.token);
      saveUserData();
      setIsLoading(false);
      navigate('/');
      toast.success(data.message, {
        position: "top-right",
      });
    }
  }

  let mySchema = Yup.object({
    email: Yup.string().required('Please enter email (Required)').email('Invalid Format'),
    password: Yup.string().required('Please enter password (Required)').matches(/^[A-Z][a-z0-9]{3,8}$/gm, 'password must start with capital'),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: login
  });

  return (
    <>
      <div className='container my-5'>
        <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
          <h3 className='titleFormRegister'>Login Now :</h3>
          {errorMsg ? <div className='errorStyle'>{errorMsg}</div> : null}

          <label htmlFor="email" className='titleLabelRegister'>Email:</label>
          <input type="email" className='inputStyleRegister' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} autoFocus />
          {formik.errors.email && formik.touched.email ? <div className='errorStyle'>{formik.errors.email}</div> : null}

          <label htmlFor="password" className='titleLabelRegister'>Password:</label>
          <input type="password" className='inputStyleRegister' id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.password && formik.touched.password ? <div className='errorStyle'>{formik.errors.password}</div> : null}

          {isLoading ? <span><i className='fa fa-spin fa-spinner'></i></span> : <button type='submit' className='registerBtn' disabled={!(formik.isValid && formik.dirty)}>login</button>}

        </form>
        <Link to='forgetPass'>
     ForgotPassword
        
        </Link>
      </div>
    </>
  );
}
