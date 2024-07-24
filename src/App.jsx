import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayOut from './LayOut/LayOut';
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import TVShow from './Pages/TVShow';
import Person from './Pages/Person';
import Register from './Pages/Register';
import ItemsDetails from './Pages/ItemsDetails';
import NotFound from './Pages/NotFound';
import ProtectedRoute from "./Components/ProtectedRoute";
import { jwtDecode } from "jwt-decode";
import { HelmetProvider } from 'react-helmet-async';
import BackToTopBtn from './Components/BackToTopBtn';
import ScrollToTop from './Components/ScrollToTop';
// import MoonLoader from "react-spinners/MoonLoader";
import { Toaster } from 'react-hot-toast';
import ForgotPassword from "./Components/ForgetPassword";
import ResetCode from "./Components/ResetCode";
import ResetPassword from "./Components/ResetPassword";
import ChangePassword from "./Components/ChangePassword";
// import Search from "./Components/Search";
// import DarkMode from "./Pages/DarkMode";
function App() {

  const [userData, setUserData] = useState(null);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      saveUserData()
    }
  }, [])
  // useEffect(() => {
  //   setLoading(true);
  // }, []);
  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken)
    console.log(userData);
  }
  return (
    <>
      <HelmetProvider>
        {/* <React.Suspense fallback={loading ? <div className="LayOut"> <MoonLoader size={80} color={"#91704f"} loading={loading} /> </div> : null}> */}
        <Router>
          <Routes>
            <Route path="" element={<LayOut userData={userData} setUserData={setUserData} saveUserData={saveUserData} />}>
              <Route path="register" element={<Register />} />
              <Route path="forgetPass" element={<ForgotPassword />} />
              <Route path="code" element={<ResetCode />} />
              <Route path="resetPass" element={<ResetPassword />} />
              {/* <Route path="sss" element={<Search />} /> */}
              {/* <Route path="login" element={<Login saveUserData={saveUserData} />} /> */}
              <Route path="change" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
              <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
              <Route path="tvshow" element={<ProtectedRoute><TVShow /></ProtectedRoute>} />
              <Route path="Celebrities" element={<ProtectedRoute><Person /></ProtectedRoute>} />
              <Route path="itemsdetails/:id/:media_type" element={<ProtectedRoute><ItemsDetails /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <ScrollToTop />
        </Router>
        {/* </React.Suspense> */}
        <BackToTopBtn />
        {/* <DarkMode/>  */}
        <Toaster />
      </HelmetProvider>
    </>
  );
}
export default App;
