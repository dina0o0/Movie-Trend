import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../Styles/Reset.scss';
import { useNavigate } from 'react-router-dom';

export default function VerifyResetCode() {
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();

    async function verifyCode(values) {
        setIsLoading(true);
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
            .catch(error => {
                console.log(error);
                setIsLoading(false)
                toast.error(error.response.data.message, {
                    position: "top-right",
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                });
            });

        if (response) {
            setIsLoading(false);
            navigate('/resetPass');
            console.log(response);
            toast.success('نجحت', {
                position: "top-right",
                style: {
                    background: '#363636',
                    color: '#fff',
                },
            });
        }
    }

    let mySchema = Yup.object({
        resetCode: Yup.string().min(6, 'Must be at least 6 numbers')
            .required('Please enter email (Required)')
    });

    let formik = useFormik({
        initialValues: {
            resetCode: ""
        },
        validationSchema: mySchema,
        onSubmit: verifyCode,
    });

    return (
        <div className="verify-reset-code-container">
            <h2>التحقق من رمز إعادة تعيين كلمة المرور</h2>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="resetCode"
                    placeholder="رمز إعادة تعيين كلمة المرور"
                    value={formik.values.resetCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.resetCode && formik.touched.resetCode && (
                    <div className="error">{formik.errors.resetCode}</div>
                )}
                {isLoading ? <span><i className='fa fa-spin fa-spinner'></i></span> : <button type='submit' className='registerBtn' disabled={!(formik.isValid && formik.dirty)} >reset</button>}
            </form>
        </div>
    );
}
