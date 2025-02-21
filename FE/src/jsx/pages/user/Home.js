import logo from "../../../assets/newlogo/logo.png";
import menu_btn_1 from "../../../assets/images/icons/menu_btn_1.png";
import close_2 from "../../../assets/images/icons/close_2.png";
import promo_img from "../../../assets/images/img/promo_img.svg";
import promo_shape from "../../../assets/images/img/promo_shape.svg";
import Bar_Chart from "../../../assets/images/icons/Bar_Chart.svg";
import Person from "../../../assets/images/icons/Person.svg";
import Earth from "../../../assets/images/icons/Earth.svg";
import features_big from "../../../assets/images/img/Features/features_big.svg";
import btc from "../../../assets/images/icons/btc.svg";
import eth from "../../../assets/images/icons/eth.svg";
import ltc from "../../../assets/images/icons/ltc.svg";
import graph_1 from "../../../assets/images/img/Benefits/graph_1.svg";
import arrow_top from "../../../assets/images/icons/arrow_top.svg";
import graph_2 from "../../../assets/images/img/Benefits/graph_2.svg";
import increase from "../../../assets/images/icons/increase.svg";
import decrease from "../../../assets/images/icons/decrease.svg";
import visa from "../../../assets/images/icons/visa.svg";
import mastercard from "../../../assets/images/icons/mastercard.svg";
import bitcoin from "../../../assets/images/icons/bitcoin.svg";
import facebook from "../../../assets/images/icons/facebook.svg";
import instagram from "../../../assets/images/icons/instagram.svg";
import youtube from "../../../assets/images/icons/youtube.svg";
import twitter from "../../../assets/images/icons/twitter.svg";
import linkedin from "../../../assets/images/icons/linkedin.svg";
import modal_close from "../../../assets/images/icons/modal_close.png";
import { useTranslation } from 'react-i18next';

import franceflg from '../../../assets/images/france.png'
import usflg from '../../../assets/images/united-states.png'
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "./style.css";


const Home = () => {

  const [Bar, setBar] = useState(false);
  const [Nav, setNav] = useState(false);
  let openMenu = () => {
    setNav(true);
    setBar(true);
  };
  let closeMenu = () => {
    setNav(false);
    setBar(false);
  };
  window.addEventListener("scroll", function () {
    let header = this.document.querySelector(".header");

    header.classList.toggle("sticky", window.scrollY > 15);
  });

  // 
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (tabIndex) => {
    setActiveTab((prev) => (prev === tabIndex ? null : tabIndex));
  };
  // 
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    i18n.changeLanguage(language); // Apply stored language
  }, [language, i18n]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };
  //  
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility on click
  };

  return (
    <div className="admin">
      <div className="mainea">
        <div>
          <div className="promo">
            <div className="container">
              <header id="myHeader" className="header">
                <div className="header__logo">
                  <Link to="/">
                    <img src={logo} alt="logotype" />
                  </Link>
                </div>
                <div
                  className={
                    Nav ? "header__wrapper menu__active" : "header__wrapper"
                  }
                >
                  <nav className="header__nav">
                    <ul>
                      <li>
                        <a href="#products">Products</a>
                      </li>
                      <li>
                        <a href="#features">Features</a>
                      </li>
                      <li>
                        <a href="#about">About</a>
                      </li>
                      <li>
                        <a href="#contact">Contact</a>
                      </li>
                    </ul>
                  </nav>
                  <div className="header__reg">
                    <div className="language-dropdown">
                      <button className="language-button" onClick={toggleDropdown}>
                        <img
                          src={language === "en" ? usflg : franceflg}
                          alt="Flag"
                          className="flag-icon"
                        />
                        {language === "en" ? "English" : "Français"}
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
                    <Link to="/auth/login">Login</Link>

                    <Link to="/auth/signup" className="linka button">
                      Register
                    </Link>
                  </div>
                </div>
                <div className="header__menu" onClick={openMenu}>
                  <img src={menu_btn_1} alt="menu button" />
                </div>
                <div
                  className={
                    Bar ? "menu__overlay_active menu__overlay" : "menu__overlay"
                  }
                  onClick={closeMenu}
                >
                  <div className="header__close">
                    <img src={close_2} alt="close icon" />
                  </div>
                </div>
              </header>
              <div className="promo__wrapper">
                <div className="promo__content">
                  <div className="promo__sale">
                    <span>
                      {t("homePage.exchangePlus")}
                    </span>
                    {t("homePage.cryptoHub")}

                  </div>
                  <h1 className="promo__header">

                    {t("homePage.cryptoHub")}

                  </h1>
                  <div className="promo__descr">
                    {t("homePage.overThirty")}

                  </div>
                  <div className="promo__link">
                    <a href="#" className="button button_try btn-modal">
                      {"  "}{t("homePage.tryFree")}
                      <span>&gt;</span>
                    </a>
                  </div>
                </div>
                <div className="promo__img">
                  <img
                    className="wow animate__animated animate__pulse animate__slow animate__infinite"
                    src={promo_img}
                    alt="promo"
                  />
                </div>
              </div>
            </div>
            <div className="promo__shape-1">
              <img
                className="wow animate__animated animate__fadeIn"
                src={promo_shape}
                alt="shape"
              />
            </div>
            <div className="promo__shape-2">
              <img
                className="wow animate__animated animate__fadeIn"
                src={promo_shape}
                alt="shape"
              />
            </div>
          </div>
          <section id="features" className="features">
            <div className="container">
              <div className="features__statistic">
                <div className="features__number wow animate__animated animate__fadeIn">
                  <div className="img">
                    <img src={Bar_Chart} alt="diagram icon" />
                  </div>
                  <div className="text">{t("homePage.currencyExchanged")}</div>
                </div>
                <div className="features__number wow animate__animated animate__fadeIn">
                  <div className="img">
                    <img src={Person} alt="person icon" />
                  </div>
                  <div className="text">{t("homePage.trustedWallets")}</div>
                </div>
                <div className="features__number wow animate__animated animate__fadeIn">
                  <div className="img">
                    <img src={Earth} alt="earth icon" />
                  </div>
                  <div className="text">{t("homePage.countriesSupported")}</div>
                </div>
              </div>
              <div className="features__content">
                <div className="features__img">
                  <img
                    className="wow animate__animated animate__pulse animate__slow animate__infinite"
                    src={features_big}
                    alt="illustration"
                  />
                </div>
                <div className="features__text">
                  <h2 className="features__heading">{t("homePage.whyChooseUs")}</h2>
                  <p className="features__descr">{t("homePage.futureCrypto")}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="calculating">
            <div className="container">
              <h2 className="calculating__title wow animate__animated animate__fadeIn">
                {t("homePage.cryptoMiningTitle")}
              </h2>
              <p className="calculating__descr wow animate__animated animate__slideInLeft">
                {t("homePage.cryptoMiningDescr")}
              </p>
              <div className="calculating__calc">
                <form className="calculating__form">
                  <input
                    name="rate"
                    type="text"
                    placeholder={t("homePage.enterHashRate")}
                    required
                  />
                  <select name="select" id="select" required>
                    <option value="TH/s">{t("homePage.thPerSecond")}</option>
                    <option value="Second option">{t("homePage.secondOption")}</option>
                    <option value="Third option">{t("homePage.thirdOption")}</option>
                  </select>
                  <button className="button button_classic">{t("homePage.calculate")}</button>
                </form>
                <div className="calculating__info">
                  <div className="calculating__revenue-text">
                    {t("homePage.estimatedRevenue")}
                  </div>
                  <div className="calculating__revenue-val">
                    {t("homePage.revenueValue")} <span>{t("homePage.revenueInUSD")}</span>
                  </div>
                  <div className="calculating__revenue-descr">
                    {t("homePage.revenueNotice")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="products" className="options">
            <div className="container">
              <h2 className="options__title wow animate__animated animate__fadeIn">
                {t("homePage.safeTradeTitle")}
              </h2>
              <div className="options__wrapper">
                <div className="options__item wow animate__animated animate__bounceInLeft">
                  <div className="options__item-icon">
                    <img src={btc} alt="btc" />
                  </div>
                  <div className="options__item-title">{t("homePage.bitcoinTitle")}</div>
                  <div className="options__item-descr">{t("homePage.bitcoinDescr")}</div>
                  <a href="#" className="button button_try options__item-btn btn-modal">
                    {t("homePage.startMining")}
                    <span>&gt;</span>
                  </a>
                </div>
                <div className="options__item wow animate__animated animate__bounceIn">
                  <div className="options__item-icon">
                    <img src={eth} alt="eth" />
                  </div>
                  <div className="options__item-title">{t("homePage.ethereumTitle")}</div>
                  <div className="options__item-descr">{t("homePage.ethereumDescr")}</div>
                  <a href="#" className="button button_try options__item-btn btn-modal">
                    {t("homePage.startMining")}
                    <span>&gt;</span>
                  </a>
                </div>
                <div className="options__item wow animate__animated animate__bounceInRight">
                  <div className="options__item-icon">
                    <img src={ltc} alt="ltc" />
                  </div>
                  <div className="options__item-title">{t("homePage.litecoinTitle")}</div>
                  <div className="options__item-descr">{t("homePage.litecoinDescr")}</div>
                  <a href="#" className="button button_try options__item-btn btn-modal">
                    {t("homePage.startMining")}
                    <span>&gt;</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="benefits">
            <div className="container">
              <h2 className="benefits__title wow animate__animated animate__fadeIn">
                {t("homePage.analyzeMarketTitle")}
              </h2>
              <div className="benefits__wrapper">
                <div className="benefits__row">
                  <div className="benefits__text">
                    <h3 className="benefits__name wow animate__animated animate__fadeIn">
                      {t("homePage.investWisely")}
                    </h3>
                    <div className="benefits__descr wow animate__animated animate__slideInLeft">
                      {t("homePage.investWiselyDescr")}
                    </div>
                  </div>
                  <div className="benefits__graph">
                    <div className="benefits__graph-top">
                      <div className="benefits__graph-name">
                        <img src={btc} alt="bitcoin" />
                        <div>
                          <h4>
                            Bitcoin <span>BTC</span>
                          </h4>
                          <span>0.00080 BTC</span>
                        </div>
                      </div>
                      <div className="benefits__graph-number">+125%</div>
                    </div>
                    <div className="benefits__graph-vector">
                      <img src={graph_1} alt="graph" />
                    </div>
                    <div className="benefits__graph-extra">
                      <div className="wow animate__animated animate__fadeIn">
                        <span>
                          {t("homePage.increaseTrade")}
                        </span>
                        <span>
                          +75% <img src={arrow_top} alt="arrow" />
                        </span>
                        <span>{t("homePage.sellOption")}</span>
                      </div>
                      <div className="wow animate__animated animate__fadeIn">
                        <span>$15.32</span>
                        <span>{t("homePage.priceDollar")}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="benefits__row">
                  <div className="benefits__img">
                    <img
                      className="wow animate__animated animate__slideInLeft"
                      src={graph_2}
                      alt="graph"
                    />
                  </div>
                  <div className="benefits__text">
                    <h3 className="benefits__name wow animate__animated animate__fadeIn">
                      {t("homePage.comprehensiveStats")}
                    </h3>
                    <div className="benefits__descr wow animate__animated animate__slideInRight">
                      {t("homePage.comprehensiveStatsDescr")}
                    </div>
                  </div>
                </div>
                <div className="benefits__row">
                  <div className="benefits__text">
                    <h3 className="benefits__name wow animate__animated animate__fadeIn">
                      {t("homePage.maximizeProfit")}
                    </h3>
                    <div className="benefits__descr wow animate__animated animate__slideInLeft">
                      {t("homePage.maximizeProfitDescr")}
                    </div>
                  </div>
                  <div className="benefits__table">
                    <div className="benefits__table-row benefits__table-head">
                      <div className="benefits__table-col" />
                      <div className="benefits__table-col">{t("homePage.price")}</div>
                      <div className="benefits__table-col">{t("homePage.change")}</div>
                      <div className="benefits__table-col">{t("homePage.volume")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="products" className="options">
            <div className="container">
              <h2 className="options__title wow animate__animated animate__fadeIn">
                {t("homePage.safelyTrade")}
              </h2>
              <div className="options__wrapper">
                <div className="options__item wow animate__animated animate__bounceInLeft">
                  <div className="options__item-icon">
                    <img src={btc} alt="btc" />
                  </div>
                  <div className="options__item-title">{t("homePage.bitcoinTitle")}</div>
                  <div className="options__item-descr">{t("homePage.bitcoinDesc")}</div>
                  <a href="#" className="button button_try options__item-btn btn-modal">
                    {t("homePage.startMining")} <span>&gt;</span>
                  </a>
                </div>

                <div className="options__item wow animate__animated animate__bounceIn">
                  <div className="options__item-icon">
                    <img src={eth} alt="eth" />
                  </div>
                  <div className="options__item-title">{t("homePage.ethereumTitle")}</div>
                  <div className="options__item-descr">{t("homePage.ethereumDesc")}</div>
                  <a href="#" className="button button_try options__item-btn btn-modal">
                    {t("homePage.startMining")} <span>&gt;</span>
                  </a>
                </div>

                <div className="options__item wow animate__animated animate__bounceInRight">
                  <div className="options__item-icon">
                    <img src={ltc} alt="ltc" />
                  </div>
                  <div className="options__item-title">{t("homePage.litecoinTitle")}</div>
                  <div className="options__item-descr">{t("homePage.litecoinDesc")}</div>
                  <a href="#" className="button button_try options__item-btn btn-modal">
                    {t("homePage.startMining")} <span>&gt;</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="subscribe">
            <div className="container">
              <div className="subscribe__content">
                <div className="subscribe__text">
                  <div className="subscribe__descr">{t("homePage.joinNewsletter")}</div>
                </div>
                <form className="subscribe__form">
                  <input type="text" placeholder={t("homePage.subscribePlaceholder")} required />
                  <button type="submit" className="button button_classic">
                    {t("homePage.subscribeBtn")}
                  </button>
                </form>
              </div>
            </div>
          </section>

          <footer className="footer">
            <div className="container">
              <div className="footer__main">
                <div className="footer__logo">
                  <Link to="/">
                    <img src={logo} alt="logotype" />
                  </Link>
                </div>
                <div className="footer__menu">
                  <div className="footer__heading">Quick Link</div>
                  <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">Contact</a></li></ul></div>

                <div className="footer__links">
                  <div className="footer__heading">{t("homePage.resources")}</div>
                  <ul>
                    <li><a href="#">{t("homePage.downloadWhitepaper")}</a></li>
                    <li><a href="#">{t("homePage.smartToken")}</a></li>
                    <li><a href="#">{t("homePage.blockchainExplorer")}</a></li>
                    <li><a href="#">{t("homePage.cryptoAPI")}</a></li>
                    <li><a href="#">{t("homePage.interest")}</a></li>
                  </ul>
                </div>
                <div className="footer__payment">
                  <div className="footer__payment-heading">{t("homePage.paymentAccepted")}</div>
                  <div className="footer__payment-wrapper">
                    <div className="footer__payment-item"><img src={visa} alt="visa" /></div>
                    <div className="footer__payment-item"><img src={mastercard} alt="mastercard" /></div>
                    <div className="footer__payment-item"><img src={bitcoin} alt="btc" /></div>
                  </div>
                </div>
              </div>
              <div className="footer__bottom">
                <div className="footer__copy">{t("homePage.rightsReserved")}</div>
                <div className="footer__social">
                  <a href="#"><img src={facebook} alt="facebook" /></a>
                  <a href="#"><img src={instagram} alt="instagram" /></a>
                  <a href="#"><img src={youtube} alt="youtube" /></a>
                  <a href="#"><img src={twitter} alt="twitter" /></a>
                  <a href="#"><img src={linkedin} alt="linkedin" /></a>
                </div>
              </div>
            </div>
          </footer>
          <div className="modal">
            <div className="modal__overlay" />
            <div className="modal__content">
              <div className="modal__close">
                <img src={modal_close} alt="close button" />
              </div>
              <div className="modal__wrapper">
                <h2 className="modal__title">Sign Up</h2>
                <div className="modal__descr">Sign up and try for free!</div>
                <form className="modal__form">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    required
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;