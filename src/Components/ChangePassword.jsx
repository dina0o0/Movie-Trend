import React from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string()
                .required('Current password is required'),
            newPassword: Yup.string()
                .required('New password is required')
                .matches(/^(?=.*[A-Z])[A-Za-z0-9]{4,9}$/, 'Password must start with a capital letter and be 4-9 characters long'),
            confirmNewPassword: Yup.string()
                .required('Please confirm your new password')
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        }),
        onSubmit: async (values) => {
            try {
                // افترض أنك قمت بتخزين التوكن في localStorage بعد تسجيل الدخول
                const token = localStorage.getItem('userToken');

                if (!token) {
                    toast.error('No token found, please login again');
                    navigate('/'); // توجيه المستخدم لصفحة تسجيل الدخول إذا لم يتم العثور على التوكن
                    return;
                }

                // إعداد الرؤوس مع التوكن
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };

                // إرسال الطلب مع الرؤوس
                const response = await axios.put(
                    'https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',
                    {
                        currentPassword: values.currentPassword,
                        password: values.newPassword,
                        rePassword: values.confirmNewPassword
                    },
                    config
                );

                console.log('API Response:', response); // عرض الاستجابة في ال console

                if (response.status === 200) {
                    toast.success('Password changed successfully');
                    navigate('/'); // توجيه المستخدم لصفحة الرئيسية أو أي صفحة أخرى بعد تغيير كلمة المرور بنجاح
                } else {
                    toast.error('Failed to change password');
                }
            } catch (error) {
                console.error('Error changing password:', error);
                if (error.response && error.response.status === 401) {
                    toast.error('Unauthorized: Invalid token or session expired. Please login again.');
                    navigate('/'); // توجيه المستخدم لصفحة تسجيل الدخول إذا كان التوكن غير صالح أو انتهت صلاحيته
                } else {
                    toast.error('Error changing password');
                }
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h1>Change Password</h1>
            <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="Current Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentPassword}
            />
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
                <div className="error">{formik.errors.currentPassword}</div>
            ) : null}

            <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="New Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="error">{formik.errors.newPassword}</div>
            ) : null}

            <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmNewPassword}
            />
            {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
                <div className="error">{formik.errors.confirmNewPassword}</div>
            ) : null}

            <button type="submit">Change Password</button>
        </form>
    );
};

export default ChangePasswordForm;