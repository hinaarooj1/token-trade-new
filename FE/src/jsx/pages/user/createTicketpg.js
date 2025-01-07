import React, { useContext, useEffect } from "react";
import Nav from "../../layouts/nav/index.jsx";
import RightWalletBar from "../../layouts/nav/RightWalletBar.jsx";
import Footer from "../../layouts/Footer.jsx";
import { ThemeContext } from "../../../context/ThemeContext.jsx";
import Support from "../report/Support.jsx";
import { useSelector } from "react-redux";
import { getAllDataApi } from "../../../Api/Service.js";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import AllDocuments from "../dashboard/Documents.jsx";
import CreateTicket from "../report/createTicket";
const Supportpg = () => {
  const { sidebariconHover, headWallet } = useContext(ThemeContext);
  const sideMenu = useSelector((state) => state.sideMenu);
  const authUser = useAuthUser();
  const Navigate = useNavigate();

  useEffect(() => {
    if (authUser().user.role === "user") {
      return;
    } else if (authUser().user.role === "admin") {
      Navigate("/admin/dashboard");
      return;
    }
  }, []);
  return (
    <div
      id="main-wrapper"
      className={`show wallet-open ${headWallet ? "" : "active"} ${sidebariconHover ? "iconhover-toggle" : ""
        } ${sideMenu ? "menu-toggle" : ""}`}
    >
      <Nav />
      <RightWalletBar />
      <div className="content-body">
        <div
          className="container-fluid"
          style={{ minHeight: window.screen.height - 45 }}
        >
          <CreateTicket />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Supportpg;
