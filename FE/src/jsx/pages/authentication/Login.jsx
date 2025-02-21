import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { toast } from "react-toastify";
import LogoNew from "../../../assets/newlogo/logo.png";
import { loginApi } from "../../../Api/Service";
import { useSignIn, useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { useAuth } from "../../../store/auth";


import { IMAGES } from '../../constant/theme';
import { useTranslation } from 'react-i18next';


function Login(props) {
	// 

	const { t } = useTranslation();

	const [isloading, setisloading] = useState(false);
	const signIn = useSignIn();
	const isAuthenticated = useIsAuthenticated();
	const authUser = useAuthUser();
	const navigate = useNavigate();
	const location = useLocation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [type1, settype1] = useState("password");

	const handleTogglePassword = () => {
		type1 === "password"
			? settype1("text")
			: type1 === "text"
				? settype1("password")
				: settype1("password");
	};

	const { storeTokenInLs } = useAuth();
	const onLogin = async (e) => {
		e.preventDefault();
		let error = false;
		const errorObj = { ...errorsObj };
		if (email === '') {
			errorObj.email = t("signupPage.emailRequired");
			error = true;
		}
		if (password === '') {
			errorObj.password = t("signupPage.passwordRequired");
			error = true;
		}
		setErrors(errorObj);
		if (error) {
			return;
		}
		setisloading(true);
		try {
			let data = { email, password };

			const updateHeader = await loginApi(data);
			let newData = updateHeader;
			if (updateHeader.success === true && updateHeader.link === false) {


				newData = {
					success: updateHeader.success,
					token: updateHeader.token,
					user: {
						_id: updateHeader.user._id,
						address: updateHeader.user.address,
						city: updateHeader.user.city,
						country: updateHeader.user.country,
						email: updateHeader.user.email,
						kyc: updateHeader.user.kyc,
						firstName: updateHeader.user.firstName,
						lastName: updateHeader.user.lastName,
						note: updateHeader.user.note,
						phone: updateHeader.user.phone,
						postalCode: updateHeader.user.postalCode,
						role: updateHeader.user.role,
						status: updateHeader.user.status,

						verified: updateHeader.user.verified,
					},
				};
			}
			if (
				updateHeader.success && updateHeader.link === false &&
				signIn({
					token: updateHeader.token.token,
					expiresIn: 4317,
					tokenType: "Bearer",
					authState: newData,
					sameSite: false,
				})
			) {
				storeTokenInLs(updateHeader.token);
				toast.dismiss();
				toast.success(updateHeader.msg);
				console.log('location.state?.from: ', location.state?.from);
				if (updateHeader.user.role === "user") {
					const redirectTo = location.state?.from || '/dashboard';
					navigate(redirectTo);


					return;
				} else if (
					updateHeader.user.role === "admin" ||
					updateHeader.user.role === "subadmin"
				) {
					const redirectTo = location.state?.from || '/admin/dashboard';
					navigate(redirectTo);
					// navigate("/admin/dashboard");
					return
				}
			} else if (updateHeader.success === true && updateHeader.link === true) {
				toast.dismiss();
				toast.info(updateHeader.msg);
				console.log(updateHeader);
				setPassword("");
				return
			} else {
				toast.dismiss();
				toast.error(updateHeader.msg);
				console.log(updateHeader);
			}
		} catch (error) {
			console.log('error: ', error);
			toast.dismiss();
			toast.error(error?.data?.msg || t("toasts.someThingWrong"));
		} finally {
			setisloading(false);
		}

	}

	useEffect(() => {

		if (isAuthenticated() && authUser().user.role === "user") {
			navigate("/dashboard");

			return;
		}
		if (isAuthenticated() && authUser().user.role === "admin") {
			navigate("/admin/dashboard");
		} else if (isAuthenticated() && authUser().user.role === "subadmin") {
			navigate("/admin/dashboard");
		}
	}, []);
	// 
	let errorsObj = { email: '', password: '' };
	const [errors, setErrors] = useState(errorsObj);



	return (

		<>
			<div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
				<div className="login-aside text-center  d-flex flex-column flex-row-auto">
					<div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
						<Link to='/' className="text-center mb-lg-4 mb-2 pt-5 logo">
							<img src={LogoNew} alt="" />
						</Link>

						<h3 className="mb-2 text-white">{t("loginPage.welcomeBack")}</h3>
						<p className="mb-4">{t("loginPage.loginWith")}</p>
					</div>
					<div className="aside-image position-relative" style={{ backgroundImage: 'url("/static/media/pic-2.5d17daa845e18143e6eb.png")' }}>
						<img className="img1 move-1" src="data:image/png;base64,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" alt /><img className="img2 move-2" src="data:image/png;base64,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" alt /><img className="img3 move-3" src="data:image/png;base64,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" alt /></div>
				</div>
				<div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
					<div className="d-flex justify-content-center h-100 align-items-center">
						<div className="authincation-content style-2">
							<div className="row no-gutters">
								<div className="col-xl-12 tab-content">
									<div id="sign-up" className="auth-form tab-pane fade show active  form-validation">
										<form onSubmit={onLogin}>
											<div className="text-center mb-4">
												<h3 className="text-center mb-2 text-dark">{t("loginPage.signIn")}</h3>
												<span>{t("loginPage.yourSocialCampaigns")}</span>
											</div>
											<div className="row mb-4">
												<div className="col-xl-6 col-12">
													<button disabled={true} className="btn btn-outline-dark btn-sm btn-block">
														<svg className="me-1" width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M27.9851 14.2618C27.9851 13.1146 27.8899 12.2775 27.6837 11.4094H14.2788V16.5871H22.1472C21.9886 17.8738 21.132 19.8116 19.2283 21.1137L19.2016 21.287L23.44 24.4956L23.7336 24.5242C26.4304 22.0904 27.9851 18.5093 27.9851 14.2618Z" fill="#4285F4" />
															<path d="M14.279 27.904C18.1338 27.904 21.37 26.6637 23.7338 24.5245L19.2285 21.114C18.0228 21.9356 16.4047 22.5092 14.279 22.5092C10.5034 22.5092 7.29894 20.0754 6.15663 16.7114L5.9892 16.7253L1.58205 20.0583L1.52441 20.2149C3.87224 24.7725 8.69486 27.904 14.279 27.904Z" fill="#34A853" />
															<path d="M6.15656 16.7113C5.85516 15.8432 5.68072 14.913 5.68072 13.9519C5.68072 12.9907 5.85516 12.0606 6.14071 11.1925L6.13272 11.0076L1.67035 7.62109L1.52435 7.68896C0.556704 9.58024 0.00146484 11.7041 0.00146484 13.9519C0.00146484 16.1997 0.556704 18.3234 1.52435 20.2147L6.15656 16.7113Z" fill="#FBBC05" />
															<path d="M14.279 5.3947C16.9599 5.3947 18.7683 6.52635 19.7995 7.47204L23.8289 3.6275C21.3542 1.37969 18.1338 0 14.279 0C8.69485 0 3.87223 3.1314 1.52441 7.68899L6.14077 11.1925C7.29893 7.82856 10.5034 5.3947 14.279 5.3947Z" fill="#EB4335" />
														</svg>
														{t("loginPage.signInWithGoogle")}
													</button>
												</div>
												<div className="col-xl-6 col-12">
													<button disabled={true} className="btn btn-outline-dark btn-sm btn-block mt-xl-0 mt-3">
														<svg className="me-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 456.008 560.035">
															<path d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655" />
														</svg>
														{t("loginPage.signInWithApple")}
													</button>
												</div>
											</div>
											<div className="sepertor">
												<span className="d-block mb-4 fs-13">{t("loginPage.orWithEmail")}</span>
											</div>
											<div className="mb-3">
												<label htmlFor="exampleFormControlInput1" className="form-label required">{t("loginPage.emailAddress")}</label>
												<input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("loginPage.typeYourEmail")} />
												{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
											</div>
											<div className="mb-3 position-relative relative">
												<label className="form-label required">{t("loginPage.password")}</label>
												<input type={type1} className="form-control" value={password} placeholder={t("loginPage.typeYourPassword")} onChange={(e) => setPassword(e.target.value)} />
												<span onClick={handleTogglePassword} className="show-pass eye">
													{type1 === "password" ? (
														<i className="fa fa-eye-slash" />
													) : (
														<i className="fa fa-eye" />
													)}
												</span>
												{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
											</div>
											<div className="form-row d-flex justify-content-between mt-4 mb-2">
												<div className="mb-3">
													<div className="form-check custom-checkbox mb-0">
														<input type="checkbox" className="form-check-input" id="customCheckBox1" required="" />
														<label className="form-check-label" htmlFor="customCheckBox1">{t("loginPage.rememberMyPreference")}</label>
													</div>
												</div>
											</div>
											<button disabled={isloading} className="btn btn-block btn-primary">{t("loginPage.signIn")}</button>
										</form>
										<div className="new-account mt-3 text-center">
											<p className="font-w500">{t("loginPage.createAnAccount")} <Link className="text-primary" to="/auth/signup">{t("loginPage.signUp")}</Link></p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	);
};

export default Login;
