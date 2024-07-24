import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../Styles/Resetpass.scss"; // ملف CSS لتخصيص النموذج

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate(); // افتراضي أنك تستخدم React Navigation هنا

  async function changePassword(values) {
    setIsLoading(true);
    const response = await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
        toast.error(error.response.data.message, {
          position: "top-right",
          style: {
            background: "#363636",
            color: "#fff",
          },
        });
      });
    // catch (error) {
    //             if (error.response) {
    //                 // المشكلة في الرد من الخادم
    //                 console.error('Error response:', error.response);
    //                 setMessage(`Error: ${error.response.data.message}`);
    //             } else if (error.request) {
    //                 // المشكلة في الطلب المرسل
    //                 console.error('Error request:', error.request);
    //                 setMessage('Error: No response received from server');
    //             } else {
    //                 // مشكلة أخرى
    //                 console.error('Error:', error.message);
    //                 setMessage(`Error: ${error.message}`);
    //             }
    //         }

    if (response) {
      setIsLoading(false);
      navigate("/");
      console.log(response);
      toast.success("نجحت", {
        position: "top-right",
        style: {
          background: "#363636",
          color: "#fff",
        },
      });
    }
  }

  let mySchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: mySchema,
    onSubmit: changePassword,
  });

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={formik.handleSubmit} className="reset-password-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control"
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control"
            required
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="error-message">{formik.errors.newPassword}</div>
          ) : null}
        </div>
        {isLoading ? (
          <span>
            <i className="fa fa-spin fa-spinner"></i>
          </span>
        ) : (
          <button
            type="submit"
            className="registerBtn"
            disabled={!(formik.isValid && formik.dirty)}
          >
            register
          </button>
        )}
      </form>
    </div>
  );
}
