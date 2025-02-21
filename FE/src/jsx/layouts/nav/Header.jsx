import React, { useContext, useEffect, useState } from "react";

import { Dropdown } from "react-bootstrap";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { logoutApi, getsignUserApi, getCoinsUserApi } from "../../../Api/Service";
import { toast } from "react-toastify";
import axios from "axios";
/// Image
import profile from "../../../assets/images/7309681.jpg";
import avatar from "../../../assets/images/avatar/1.jpg";

import { ThemeContext } from "../../../context/ThemeContext";
import Logout from "../nav/Logout";
import { SVGICON } from "../../constant/theme";
import { useTranslation } from "react-i18next";
import usflg from '../../../assets/images/united-states.png'
import franceflg from '../../../assets/images/france.png'
const listBlog = [
  { icon: SVGICON.LtcSvgIcon, name: 'LTC in DexignLab' },
  { icon: SVGICON.BtcSvgIcon, name: 'BTC/USD in DexignLab' },
  { icon: SVGICON.EthSvgIcon, name: 'ETH/USD Dlab ' },
  { icon: SVGICON.BtcSvgIcon, name: 'BTC/USD in DexignLab' },
  { icon: SVGICON.EthSvgIcon, name: 'ETH/USD Dlab ' },
  { icon: SVGICON.LtcSvgIcon, name: 'LTC in DexignLab' },
];

const Header = ({ onNote }) => {



  const compare = ['/dashboard', '/index-2'];
  let AuthUse = useAuthUser();
  let signOut = useSignOut();
  const [isUser, setIsUser] = useState({});
  let Navigate = useNavigate();
  let toggleDrop = () => {
    drop ? setdrop(false) : setdrop(true);
  };
  const [drop, setdrop] = useState(false);
  const getsignUser = async () => {
    try {
      const formData = new FormData();
      formData.append("id", AuthUse().user._id);
      const userCoins = await getsignUserApi(formData);

      if (userCoins.success) {
        setIsUser(userCoins.signleUser);

        return;
      } else {
        toast.dismiss();
        toast.error(userCoins.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
    }
  };
  let authUser = useAuthUser();
  const [Admin, setAdmin] = useState("");
  console.log('Admin: ', Admin);




  useEffect(() => {
    if (authUser().user.role === "user") {
      setAdmin(authUser().user);

      return;
    } else if (authUser().user.role === "admin") {
      setAdmin(authUser().user);
      return;
    }
  }, []);
  const [headerFix, setheaderFix] = useState(false);

  function CommanScroll() {
    setheaderFix(window.scrollY > 50);
  }

  useEffect(() => {
    window.addEventListener("scroll", CommanScroll);
    return () => {
      window.removeEventListener("scroll", CommanScroll)
    }
  }, [])


  const { background, changeBackground,
    headWallet, setHeadWallet } = useContext(ThemeContext);
  const handleThemeMode = () => {
    if (background.value === 'dark') {
      changeBackground({ value: "light", label: "Light" });
    } else {
      changeBackground({ value: "dark", label: "Dark" });
    }
  }

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  const pathtitle = window.location.pathname.split("/");
  const name = pathtitle[pathtitle.length - 1].split("-");
  const filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  const finalName = filterName.includes("app")
    ? filterName.filter((f) => f !== "app")
    : filterName.includes("ui")
      ? filterName.filter((f) => f !== "ui")
      : filterName.includes("uc")
        ? filterName.filter((f) => f !== "uc")
        : filterName.includes("basic")
          ? filterName.filter((f) => f !== "basic")
          : filterName.includes("jquery")
            ? filterName.filter((f) => f !== "jquery")
            : filterName.includes("table")
              ? filterName.filter((f) => f !== "table")
              : filterName.includes("page")
                ? filterName.filter((f) => f !== "page")
                : filterName.includes("email")
                  ? filterName.filter((f) => f !== "email")
                  : filterName.includes("ecom")
                    ? filterName.filter((f) => f !== "ecom")
                    : filterName.includes("chart")
                      ? filterName.filter((f) => f !== "chart")
                      : filterName.includes("editor")
                        ? filterName.filter((f) => f !== "editor")
                        : filterName;

  function handleActiveWallet() {
    setHeadWallet(!headWallet)
  }
  const walletActive = window.matchMedia("(max-width:100rem)").matches
  useEffect(() => {
    if (walletActive) {
      setHeadWallet(true)
    } else {
      setHeadWallet(false)
    }
  }, [walletActive])
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    i18n.changeLanguage(language); // Apply stored language
  }, [language, i18n]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
    setIsOpen(!isOpen); // Toggle dropdown visibility on click
  };
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility on click
  };


  return (
    <>
      <div className={`header ${path === "dashboard" || path === "index-2" ? 'home' : ''} ${headerFix ? 'is-fixed' : ''}`}>
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left"></div>
              <ul className="navbar-nav header-right">
                {/* on mobile size */}
                <div className="language-dropdown thisd">
                  <button className="language-button" onClick={toggleDropdown}>
                    <img
                      src={language === "en" ? usflg : franceflg}
                      alt="Flag"
                      className="flag-icon"
                    />
                    {language === "en" ? t("header.english") : t("header.french")}
                  </button>
                  {isOpen && (
                    <div className="language-dropdown-menu">
                      <button
                        onClick={() => handleLanguageChange("en")}
                        className="language-option"
                      >
                        <img src={usflg} alt="English" className="flag-icon" />
                        English
                      </button>
                      <button
                        onClick={() => handleLanguageChange("fr")}
                        className="language-option"
                      >
                        <img src={franceflg} alt="French" className="flag-icon" />
                        Français
                      </button>
                    </div>
                  )}
                </div>

                <li className={`nav-item dropdown notification_dropdown ${path === "dashboard" || path === "index-2" ? '' : 'd-none'}`}>
                  <Link to={"#"} className="nav-link  menu-wallet" onClick={handleActiveWallet}>
                    {SVGICON.WalletSvgIcon}
                  </Link>
                </li>

                <Dropdown as="li" className="nav-item header-profile2">
                  <Dropdown.Toggle to={"#"} className="nav-link i-false  noap" as="div">
                    <div className="header-info2 d-flex align-items-center">
                      <div className="d-flex align-items-center sidebar-info">
                        <div>
                          <h5 className="mb-0 text-white">{Admin.firstName} {Admin.lastName}</h5>
                          <span className="d-block text-end">{Admin.email}</span>
                        </div>
                      </div>
                      <img src={profile} alt="profile" />
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end" className="mt-3 dropdown-menu dropdown-menu-right">
                    <Link to={"/edit-profile"} className="dropdown-item ai-icon ">
                      {SVGICON.SettingSvgIcon}
                      <span className="ms-2">{t("header.settings")}</span>
                    </Link>
                    <Logout />
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </div>
          </nav>
        </div>

        {path === "dashboard" || path === "index-2" ? (
          <div className="page-titles">
            <div className="sub-dz-head">
              <div className="d-flex align-items-center dz-head-title">
                <h2 className="text-white m-0">{t("header.dashboard")}</h2>
                <p className="ms-2 text-warning">{t("header.welcomeBack")} {Admin.firstName} {Admin.lastName}!</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="page-titles">
            <div className="d-flex align-items-center">
              <h2 className="text-white" style={{ textTransform: "capitalize" }}>
                {finalName.join(" ").length === 0
                  ? t("header.dashboard")
                  : finalName.join(" ") === "dashboard dark"
                    ? t("header.dashboard")
                    : finalName.join(" ")}
              </h2>
              <p className="text-warning ms-2">{t("header.welcomeBack")} {Admin.firstName} {Admin.lastName}!</p>
            </div>
            <ol className="breadcrumb">
              <li className="breadcrumb-item active ms-auto">
                <Link to={"/dashboard"} className="d-flex align-self-center">
                  {t("header.dashboard")}
                </Link>
              </li>
              <li className="breadcrumb-item"><Link to={"#"} style={{ textTransform: "capitalize" }}>{finalName.join(" ")}</Link></li>
            </ol>
          </div>
        )}
      </div>


    </>
  );
};

export default Header;
