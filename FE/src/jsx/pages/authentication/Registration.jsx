import React, { useState, useEffect } from "react";
import { useSignIn, useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { loginApi, registerApi } from "../../../Api/Service";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import LogoNew from "../../../assets/newlogo/logo-blue.png";
import { useTranslation } from "react-i18next";

function Register(props) {
  const [isloading, setisloading] = useState(false);
  const [chkbx, setchkbx] = useState(false);
  const [verifyP, setverifyP] = useState(false);

  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  let errorsObj = { email: '', password: '' };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState('');
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const navigate = useNavigate();
  const [type2, settype2] = useState("password");
  const [type1, settype1] = useState("password");

  const handleTogglePassword = () => {
    type1 === "password"
      ? settype1("text")
      : type1 === "text"
        ? settype1("password")
        : settype1("password");
  };
  const handleTogglePassword1 = () => {
    type2 === "password"
      ? settype2("text")
      : type2 === "text"
        ? settype2("password")
        : settype2("password");
  };
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    note: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    cpassword: "",
  });
  let handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserData({ ...userData, [name]: value });

    if (userData.password.length > 6) {
      setverifyP(true);
    } else if (userData.password.length < 8) {
      setverifyP(false);
    }
  };
  let toggleagree = (e) => {
    if (e.target.checked === true) {
      setchkbx(true);
    } else if (e.target.checked === false) {
      setchkbx(false);
    }
  };


  const onSignUp = async (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };

    if (!userData.firstName.trim()) {
      errorObj.firstName = t("signupPage.firstNameRequired");
      error = true;
      Swal.fire({
        icon: 'error',
        title: t("signupPage.oops"),
        text: errorObj.firstName,
      });
    }
    if (!userData.lastName.trim()) {
      errorObj.lastName = t("signupPage.lastNameRequired");
      error = true;
      Swal.fire({
        icon: 'error',
        title: t("signupPage.oops"),
        text: errorObj.lastName,
      });
    }
    if (!userData.phone.trim()) {
      errorObj.phone = t("signupPage.phoneRequired");
      error = true;
      Swal.fire({
        icon: 'error',
        title: t("signupPage.oops"),
        text: errorObj.phone,
      });
    }
    if (!userData.country.trim()) {
      errorObj.country = t("signupPage.countryRequired");
      error = true;
      Swal.fire({
        icon: 'error',
        title: t("signupPage.oops"),
        text: errorObj.country,
      });
    }
    if (!userData.postalCode.trim()) {
      errorObj.postalCode = t("signupPage.postalCodeRequired");
      error = true;
      Swal.fire({
        icon: 'error',
        title: t("signupPage.oops"),
        text: errorObj.postalCode,
      });
    }
    if (!userData.city.trim()) {
      errorObj.city = t("signupPage.cityRequired");
      error = true;
      Swal.fire({
        icon: 'error',
        title: t("signupPage.oops"),
        text: errorObj.city,
      });
    }
    if (!userData.address.trim()) {
      errorObj.address = t("signupPage.addressRequired");
      error = true;
      Swal.fire({
        icon: 'error',
        title: t("signupPage.oops"),
        text: errorObj.address,
      });
    }
    if (!userData.email.trim()) {
      errorObj.email = t("signupPage.emailRequired");
      error = true;
      Swal.fire({
        icon: 'error',
        title: t("signupPage.oops"),
        text: errorObj.email,
      });
    }
    if (userData.password === '') {
      errorObj.password = t("signupPage.passwordRequired");
      error = true;
      Swal.fire({
        icon: 'error',
        title: t("signupPage.oops"),
        text: errorObj.password,
      });
    } else if (userData.password.length < 8) {
      errorObj.password = t("signupPage.passwordLengthError");
      error = true;
      Swal.fire({
        icon: 'error',
        title: t("signupPage.oops"),
        text: errorObj.password,
      });
    }
    if (userData.password !== userData.cpassword) {
      errorObj.cpassword = t("signupPage.passwordMismatch");
      error = true;
      Swal.fire({
        icon: 'error',
        title: t("signupPage.oops"),
        text: errorObj.cpassword,
      });
    }

    setErrors(errorObj);
    if (error) return;

    setisloading(true);
    try {
      let data = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        country: userData.country,
        postalCode: userData.postalCode,
      };

      const updateHeader = await registerApi(data);

      if (updateHeader.success) {
        toast.dismiss();
        toast.info(updateHeader.msg);
        navigate("/auth/login");
      } else {
        toast.dismiss();
        toast.error(updateHeader.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.data?.msg || error?.message || t("toasts.someThingWrong"));
    } finally {
      setisloading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated() && authUser().user.role === "user") {
      navigate("/dashboard");
      return;
    } else if (isAuthenticated() && authUser().user.role === "admin") {
      navigate("/admin/dashboard");
    }
  }, []);
  return (
    <div className="fix-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6">
            <div className="card mb-0 h-auto">
              <div className="card-body">
                <div className="text-center mb-2">
                  <Link to="/">
                    <img src={LogoNew} alt="" />
                  </Link>
                </div>
                <h4 className="text-center mb-4">{t("signupPage.signupYourAccount")}</h4>
                {props.errorMessage && (
                  <div className='text-danger'>
                    {props.errorMessage}
                  </div>
                )}
                {props.successMessage && (
                  <div className='text-danger'>
                    {props.successMessage}
                  </div>
                )}
                <form onSubmit={onSignUp}>
                  <div className="form-group">
                    <label className="form-label">{t("signupPage.firstName")}</label>
                    <input
                      onChange={handleInput}
                      value={userData.firstName}
                      name="firstName"
                      type="text"
                      className="form-control"
                      placeholder={t("signupPage.firstName")}
                    />
                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t("signupPage.lastName")}</label>
                    <input
                      onChange={handleInput}
                      value={userData.lastName}
                      name="lastName"
                      type="text"
                      className="form-control"
                      placeholder={t("signupPage.lastName")}
                    />
                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t("signupPage.emailAddress")}</label>
                    <input
                      type="email"
                      onChange={handleInput}
                      value={userData.email}
                      name="email"
                      className="form-control"
                      placeholder={t("signupPage.emailAddress")}
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t("signupPage.phoneNumber")}</label>
                    <input
                      onChange={handleInput}
                      type="number"
                      onFocus={() => (window.onwheel = () => false)} // Disable scrolling on focus
                      onBlur={() => (window.onwheel = null)}
                      onKeyDown={(e) =>
                        [
                          "ArrowUp",
                          "ArrowDown",
                          "e",
                          "E",
                          "+",
                          "-",
                          "*",
                          "",
                        ].includes(e.key) && e.preventDefault()
                      }
                      value={userData.phone}
                      name="phone"
                      className="form-control"
                      placeholder={t("signupPage.phoneExample")}
                    />
                    {errors.phone && <div className="text-danger">{errors.phone}</div>}
                  </div>
                  <div className="mb-4 relative">
                    <label className="form-label">{t("signupPage.password")}</label>
                    <input className="form-control" placeholder={t("signupPage.password")}
                      type={type1}
                      onChange={handleInput}
                      value={userData.password}
                      name="password"
                    />
                    <span className={`show-pass eye`} onClick={handleTogglePassword}>
                      {type1 === "password" ? (
                        <i className="fa fa-eye-slash" />
                      ) : (
                        <i className="fa fa-eye" />
                      )}
                    </span>
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                  </div>
                  <div className="mb-4 relative">
                    <label className="form-label">{t("signupPage.confirmPassword")}</label>
                    <input className="form-control" placeholder={t("signupPage.password")}
                      type={type2}
                      onChange={handleInput}
                      value={userData.cpassword}
                      name="cpassword"
                    />
                    <span className={`show-pass eye`} onClick={handleTogglePassword1}>
                      {type2 === "password" ? (
                        <i className="fa fa-eye-slash" />
                      ) : (
                        <i className="fa fa-eye" />
                      )}
                    </span>
                    {errors.cpassword && <div className="text-danger">{errors.cpassword}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t("signupPage.country")}</label>
                    <input
                      type="text"
                      onChange={handleInput}
                      value={userData.country}
                      name="country"
                      placeholder={t("signupPage.country")}
                      className="form-control"
                    />
                    {errors.country && <div className="text-danger">{errors.country}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t("signupPage.postalCode")}</label>
                    <input
                      type="text"
                      onChange={handleInput}
                      value={userData.postalCode}
                      name="postalCode"
                      placeholder={t("signupPage.postalCode")}
                      className="form-control"
                    />
                    {errors.postalCode && <div className="text-danger">{errors.postalCode}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t("signupPage.city")}</label>
                    <input
                      type="text"
                      onChange={handleInput}
                      value={userData.city}
                      name="city"
                      placeholder={t("signupPage.city")}
                      className="form-control"
                    />
                    {errors.city && <div className="text-danger">{errors.city}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t("signupPage.address")}</label>
                    <input
                      type="text"
                      onChange={handleInput}
                      value={userData.address}
                      name="address"
                      placeholder={t("signupPage.address")}
                      className="form-control"
                    />
                    {errors.address && <div className="text-danger">{errors.address}</div>}
                  </div>

                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      disabled={isloading}
                      className="btn btn-primary btn-block"
                    >
                      {t("signupPage.signMeUp")}
                    </button>
                  </div>
                </form>
                <div className="new-account mt-3">
                  <p className="">
                    {t("signupPage.alreadyHaveAccount")}{" "}
                    <Link className="text-primary" to="/auth/login">
                      {t("signupPage.signIn")}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};


export default Register;
