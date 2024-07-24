import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import '../Styles/Forget.scss';

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();


    async function ForgotPassword(values) {
        setIsLoading(true);
        setErrorMsg(null);
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values).catch((error) => {
            setIsLoading(false);
            toast.error(error.response.data.message, {
                position: "top-right",
                style: {
                    background: '#363636',
                    color: '#fff',
                },
            });
        });
        if (data.statusMsg === 'success') {
            setIsLoading(false);
            navigate('/code');
            console.log(data)
            toast.success(data.message, {
                position: "top-right",
            });
        }

    }
    const validationSchema = Yup.object({
        email: Yup.string().required('Please enter email (Required)').email('Invalid Format'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: ForgotPassword,
    });

    return (
        <div className="forgot-password-container">
            <h2>نسيت كلمة المرور</h2>
            <form onSubmit={formik.handleSubmit} className="forgot-password-form">
                <div className="form-group">
                    <label htmlFor="email">البريد الإلكتروني:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.errors.email && formik.touched.email ? 'input-error' : ''}
                        required
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className="error">{formik.errors.email}</div>
                    )}
                </div>
                <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? <span><i className='fa fa-spin fa-spinner'></i></span> : <button type='submit' className='registerBtn' disabled={!(formik.isValid && formik.dirty)} >reset</button>}
                </button>
            </form>
            {errorMsg && <p className="error">{errorMsg}</p>}
        </div>
    );
}