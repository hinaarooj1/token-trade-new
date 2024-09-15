import React, { useEffect, useState } from "react";
import SideBar from "../layouts/AdminSidebar/Sidebar";
import Log from "../../assets/images/img/log.jpg";
import {
  allUsersApi,
  bypassSingleUserApi,
  deleteEachUserApi,
  updateSignleUsersStatusApi,
} from "../../Api/Service";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
const AdminUsers = () => {
  const [Users, setUsers] = useState([]);
  const [unVerified, setunVerified] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalData, setmodalData] = useState({});
  const [isDisable, setisDisable] = useState(false);
  const [isUsers, setisUsers] = useState(false);

  let authUser = useAuthUser();
  let Navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const getAllUsers = async () => {
    try {
      const allUsers = await allUsersApi();

      if (allUsers.success) {
        let filtered;
        let unverified;
        if (authUser().user.role === "admin") {
          filtered = allUsers.allUsers.filter((user) => {
            return user.role.includes("user") && user.verified === true;
          });
          unverified = allUsers.allUsers.filter((user) => {
            return user.role.includes("user") && user.verified === false;
          });
        } else if (authUser().user.role === "subadmin") {
          filtered = allUsers.allUsers.filter((user) => {
            return (
              user.role.includes("user") &&
              user.verified === true &&
              user.isShared === true
            );
          });
          unverified = allUsers.allUsers.filter((user) => {
            return (
              user.role.includes("user") &&
              user.verified === false &&
              user.isShared === true
            );
          });
        }
        setUsers(filtered.reverse());
        setunVerified(unverified.reverse());
      } else {
        toast.dismiss();
        toast.error(allUsers.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
      setisLoading(false);
    }
  };
  const deleteEachUser = async (user) => {
    try {
      setisDisable(true);
      const allUsers = await deleteEachUserApi(user._id);

      if (allUsers.success) {
        toast.dismiss();
        toast.success(allUsers.msg);
        setOpen(false);

        getAllUsers();
      } else {
        toast.dismiss();
        toast.error(allUsers.msg);
        setOpen(false);
        getAllUsers();
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
      setisDisable(false);
    }
  };

  const bypassSingleUser = async (e) => {
    try {
      setisUsers(true);
      const signleUser = await bypassSingleUserApi(e._id);

      if (signleUser.success) {
        toast.dismiss();
        getAllUsers();
        toast.success(signleUser.msg);
      } else {
        toast.dismiss();
        toast.error(signleUser.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
      setisUsers(false);
    }
  };
  const onOpenModal = (user) => {
    setOpen(true);
    setmodalData(user);
  };
  const onCloseModal = () => setOpen(false);
  useEffect(() => {
    if (authUser().user.role === "user") {
      Navigate("/dashboard");
      return;
    }
    getAllUsers();
  }, []);
  const [Active, setActive] = useState(false);
  let toggleBar = () => {
    if (Active === true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };
  const [disabledIn, setdisabledIn] = useState(false);
  const updateUserIsShared = async (userId, isShared) => {
    try {
      setdisabledIn(true);
      const updatedUser = await updateSignleUsersStatusApi(userId, {
        isShared,
      });
      if (updatedUser.success) {
        toast.success("User status updated successfully");

        getAllUsers();
      } else {
        toast.error(updatedUser.msg);
      }
    } catch (error) {
      toast.error("Error updating user status");
    } finally {
      setdisabledIn(false);
    }
  };
  return (
    <div className="admin">
      <div>
        <div className="bg-muted-100 dark:bg-muted-900 pb-20">
          <SideBar state={Active} toggle={toggleBar} />
          <div className="bg-muted-100 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10 lg:max-w-[calc(100%_-_280px)] lg:ms-[280px]">
            <div className="mx-auto w-full max-w-7xl">
              <div className="relative z-50 mb-5 flex h-16 items-center gap-2">
                <button
                  type="button"
                  className="flex h-10 for-desk w-10 items-center justify-center -ms-3"
                >
                  <div className="relative  h-5 w-5 scale-90">
                    <span className="bg-primary-500 absolute block h-0.5 w-full transition-all duration-300 top-1 max-w-[75%] -rotate-45 top-0.5" />
                    <span className="bg-primary-500 absolute top-1/2 block h-0.5 w-full max-w-[50%] transition-all duration-300 translate-x-4 opacity-0" />
                    <span className="bg-primary-500 absolute block h-0.5 w-full transition-all duration-300 bottom-1 max-w-[75%] rotate-45 bottom-0" />
                  </div>
                </button>
                <button
                  onClick={toggleBar}
                  type="button"
                  className="flex for-mbl h-10 w-10 items-center justify-center -ms-3"
                >
                  <div className="relative h-5 w-5">
                    <span className="bg-primary-500 absolute block h-0.5 w-full transition-all duration-300 top-0.5 top-0.5" />
                    <span className="bg-primary-500 absolute top-1/2 block h-0.5 w-full max-w-[50%] transition-all duration-300" />
                    <span className="bg-primary-500 absolute block h-0.5 w-full transition-all duration-300 bottom-0 bottom-0" />
                  </div>
                </button>
                <h1 className="font-heading text-2xl font-light leading-normal leading-normal text-muted-800 hidden dark:text-white md:block">
                  Users Management
                </h1>
                <div className="ms-auto" />

                <div className="group inline-flex items-center justify-center text-right">
                  <div
                    data-headlessui-state
                    className="relative h-9 w-9 text-left"
                  >
                    <button
                      className="group-hover:ring-primary-500 dark:ring-offset-muted-900 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-offset-4"
                      id="headlessui-menu-button-25"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      type="button"
                    >
                      <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-full">
                        <img
                          src={Log}
                          className="max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
                          alt=""
                        />
                      </div>
                    </button>
                    {/**/}
                  </div>
                </div>
              </div>
              <div
                className="nuxt-loading-indicator"
                style={{
                  position: "fixed",
                  top: "0px",
                  right: "0px",
                  left: "0px",
                  pointerEvents: "none",
                  width: "auto",
                  height: "3px",
                  opacity: 0,
                  background: "var(--color-primary-500)",
                  transform: "scaleX(0)",
                  transformOrigin: "left center",
                  transition:
                    "transform 0.1s ease 0s, height 0.4s ease 0s, opacity 0.4s ease 0s",
                  zIndex: 999999,
                }}
              />
              <seokit />
              <div className>
                <div>
                  <div className="mb-6 flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex w-full items-center gap-4 sm:w-auto">
                      <div className="relative w-full sm:w-auto">
                        {/**/}
                        <div className="group/nui-input relative">
                          <input
                            id="ninja-input-10"
                            type="text"
                            className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded-full"
                            placeholder="Search users..."
                          />
                          {/**/}
                          {/**/}
                          <div className="text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75 h-10 w-10">
                            <svg
                              data-v-cd102a71
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              aria-hidden="true"
                              role="img"
                              className="icon h-[1.15rem] w-[1.15rem]"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              >
                                <circle cx={11} cy={11} r={8} />
                                <path d="m21 21l-4.3-4.3" />
                              </g>
                            </svg>
                          </div>
                          {/**/}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-end gap-4 sm:w-auto" />
                  </div>

                  <div className="">
                    {isLoading ? (
                      <div className="mx-auto loading-pg w-full text-center max-w-xs">
                        <div className="mx-auto max-w-xs new">
                          <svg
                            data-v-cd102a71
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            className="icon h-12 w-12 text-primary-500"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                              opacity=".25"
                            />
                            <path
                              fill="currentColor"
                              d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
                            >
                              <animateTransform
                                attributeName="transform"
                                dur="0.75s"
                                repeatCount="indefinite"
                                type="rotate"
                                values="0 12 12;360 12 12"
                              />
                            </path>
                          </svg>
                        </div>
                        <div className="mx-auto max-w-sm">
                          <h4 className="font-heading text-xl font-medium leading-normal leading-normal text-muted-800 mb-1 mt-4 dark:text-white">
                            Loading Users
                          </h4>
                          <p className="text-muted-400 font-sans text-sm">
                            Please wait while we load the Users.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h1 className="mb-3 bolda">
                          Users who verified their email: {Users.length}
                        </h1>
                        <div className="ltablet:grid-cols-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {Users.map((user, index) => (
                            <div
                              key={index}
                              className="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-md hover:shadow-muted-300/30 dark:hover:shadow-muted-800/30 hover:shadow-xl overflow-hidden"
                            >
                              <div className="nui-bg-50 p-6">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-alt text-xs font-normal leading-normal leading-normal text-muted-400">
                                      {" "}
                                      Registered at:{" "}
                                      {new Date(
                                        user.createdAt
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="p-6">
                                <div className="mb-3 flex w-full items-center justify-center">
                                  <div className="relative inline-flex shrink-0 items-center justify-center outline-none h-20 w-20 rounded-full bg-purple-500/20 text-purple-500">
                                    <div className="flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300 rounded-full">
                                      <img
                                        src={Log}
                                        className="max-h-full max-w-full object-cover shadow-sm dark:border-transparent h-20 w-20"
                                      />
                                      {/**/}
                                      {/**/}
                                    </div>
                                    {/**/}
                                    {/**/}
                                  </div>
                                </div>
                                <div className="text-center">
                                  <p
                                    className="font-heading text-base font-medium leading-none"
                                    tag="h3"
                                  >
                                    {`${user.firstName} ${user.lastName}`}
                                  </p>
                                  <p className="font-alt text-xs font-normal leading-normal leading-normal text-muted-400">
                                    {user.email}
                                  </p>
                                </div>
                                {authUser().user.role === "admin" ? (
                                  <>
                                    <p className="mt-1 font-heading text-base font-medium leading-none">
                                      User Shared with sub admin
                                    </p>
                                    <div className="mt-2 flex items-center justify-center">
                                      <label className="toggle-switch">
                                        <input
                                          className="chkbx"
                                          type="checkbox"
                                          checked={user.isShared}
                                          disabled={disabledIn}
                                          onChange={(e) =>
                                            updateUserIsShared(
                                              user._id,
                                              e.target.checked
                                            )
                                          }
                                        />
                                        <span className="slider"></span>
                                      </label>
                                    </div>
                                  </>
                                ) : (
                                  ""
                                )}
                                <div className="flex items-center mt-5">
                                  <Link
                                    data-v-71bb21a6
                                    to={`/admin/users/${user._id}/general`}
                                    className="is-button rounded is-button-default w-full"
                                    disabled="false"
                                  >
                                    <svg
                                      data-v-cd102a71
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlnsXlink="http://www.w3.org/1999/xlink"
                                      aria-hidden="true"
                                      role="img"
                                      className="icon h-4 w-4"
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 256 256"
                                    >
                                      <g fill="currentColor">
                                        <path
                                          d="M192 96a64 64 0 1 1-64-64a64 64 0 0 1 64 64"
                                          opacity=".2"
                                        />
                                        <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56" />
                                      </g>
                                    </svg>
                                    <span>Manage User</span>
                                  </Link>
                                </div>
                                {authUser().user.role === "admin" ? (
                                  <div
                                    onClick={() => onOpenModal(user)}
                                    className="flex  items-center mt-2"
                                  >
                                    <button className="is-button pointer flex align-center justify p-2 cursor-pointer bg-danger-400a rounded is-button-default w-full">
                                      <svg
                                        className="icon h-4 w-4"
                                        width="1em"
                                        height="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 32 32"
                                        id="delete"
                                      >
                                        <path
                                          fill="white"
                                          d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"
                                        ></path>
                                      </svg>
                                      <span>Delete User</span>
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}{" "}
                              </div>
                            </div>
                          ))}
                        </div>
                        <h1 className="mb-5 mt-5 bolda">
                          Users who do not verified their email yet:{" "}
                          {unVerified.length}
                        </h1>
                        <div className="ltablet:grid-cols-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {unVerified.map((user, index) => (
                            <div
                              key={index}
                              className="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-md hover:shadow-muted-300/30 dark:hover:shadow-muted-800/30 hover:shadow-xl overflow-hidden"
                            >
                              {user.createdAt != undefined ? (
                                <div className="nui-bg-50 p-6">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-alt text-xs font-normal leading-normal leading-normal text-muted-400">
                                        {" "}
                                        Registered at:{" "}
                                        {new Date(
                                          user.createdAt
                                        ).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              <div className="p-6">
                                <div className="mb-3 flex w-full items-center justify-center">
                                  <div className="relative inline-flex shrink-0 items-center justify-center outline-none h-20 w-20 rounded-full bg-purple-500/20 text-purple-500">
                                    <div className="flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300 rounded-full">
                                      <img
                                        src={Log}
                                        className="max-h-full max-w-full object-cover shadow-sm dark:border-transparent h-20 w-20"
                                      />
                                      {/**/}
                                      {/**/}
                                    </div>
                                    {/**/}
                                    {/**/}
                                  </div>
                                </div>
                                <div className="text-center">
                                  <p
                                    className="font-heading text-base font-medium leading-none"
                                    tag="h3"
                                  >
                                    {`${user.firstName} ${user.lastName}`}
                                  </p>
                                  <p className="font-alt text-xs font-normal leading-normal leading-normal text-muted-400">
                                    {user.email}
                                  </p>
                                </div>
                                <div className="flex items-center mt-5">
                                  <Link
                                    data-v-71bb21a6
                                    to={`/admin/users/${user._id}/general`}
                                    className="is-button rounded is-button-default w-full"
                                    disabled="false"
                                  >
                                    <svg
                                      data-v-cd102a71
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlnsXlink="http://www.w3.org/1999/xlink"
                                      aria-hidden="true"
                                      role="img"
                                      className="icon h-4 w-4"
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 256 256"
                                    >
                                      <g fill="currentColor">
                                        <path
                                          d="M192 96a64 64 0 1 1-64-64a64 64 0 0 1 64 64"
                                          opacity=".2"
                                        />
                                        <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56" />
                                      </g>
                                    </svg>
                                    <span>Manage User</span>
                                  </Link>
                                </div>
                                <div className="flex  items-center mt-2">
                                  <button
                                    disabled={isUsers}
                                    onClick={() => bypassSingleUser(user)}
                                    className="is-button pointer flex align-center  justify p-2 cursor-pointer :disabled bg-success-500 rounded is-button-default w-full"
                                  >
                                    {isUsers ? (
                                      <div>
                                        <div className="nui-placeload animate-nui-placeload h-4 w-8 rounded mx-auto"></div>
                                      </div>
                                    ) : (
                                      <>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          x="0px"
                                          y="0px"
                                          className="icon h-4 w-4 me-1"
                                          width="1em"
                                          height="1em"
                                          viewBox="0 0 30 30"
                                        >
                                          <path
                                            fill="white"
                                            d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"
                                          ></path>
                                        </svg>
                                        <span className="text-white">
                                          Verify Email
                                        </span>
                                      </>
                                    )}
                                  </button>
                                </div>
                                <div
                                  onClick={() => onOpenModal(user)}
                                  className="flex  items-center mt-2"
                                >
                                  <button className="is-button pointer flex align-center justify p-2 cursor-pointer bg-danger-400a rounded is-button-default w-full">
                                    <svg
                                      className="icon h-4 w-4"
                                      width="1em"
                                      height="1em"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 32 32"
                                      id="delete"
                                    >
                                      <path
                                        fill="white"
                                        d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"
                                      ></path>
                                    </svg>
                                    <span>Delete User</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/**/}
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="p-5 rounded2">
          <h2>
            Do you want to delete{" "}
            <b>{`${modalData.firstName} ${modalData.lastName}`}</b> Permanently?
            <div className="flex flex-col gap-2 mt-2 flex-row  items-center">
              <div className="relative flex h-8 items-center justify-end px-6 sm:h-10 sm:justify-center sm:px-2 w-full sm:w-80">
                <button
                  onClick={() => deleteEachUser(modalData)}
                  type="button"
                  disabled={isDisable}
                  className="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none border-danger-500 text-danger-50 bg-danger-500 dark:bg-danger-500 dark:border-danger-500 text-white hover:enabled:bg-danger-400 dark:hover:enabled:bg-danger-400 hover:enabled:shadow-lg hover:enabled:shadow-danger-500/50 dark:hover:enabled:shadow-danger-800/20 focus-visible:outline-danger-400/70 focus-within:outline-danger-400/70 focus-visible:bg-danger-500 active:enabled:bg-danger-500 dark:focus-visible:outline-danger-400/70 dark:focus-within:outline-danger-400/70 dark:focus-visible:bg-danger-500 dark:active:enabled:bg-danger-500 rounded-md mr-2"
                >
                  {isDisable ? (
                    <div>
                      <div className="nui-placeload animate-nui-placeload h-4 w-8 rounded mx-auto"></div>
                    </div>
                  ) : (
                    "Delete"
                  )}
                </button>
                <button
                  onClick={onCloseModal}
                  type="button"
                  className="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none border-info-500 text-info-50 bg-info-500 dark:bg-info-500 dark:border-info-500 text-white hover:enabled:bg-info-400 dark:hover:enabled:bg-info-400 hover:enabled:shadow-lg hover:enabled:shadow-info-500/50 dark:hover:enabled:shadow-info-800/20 focus-visible:outline-info-400/70 focus-within:outline-info-400/70 focus-visible:bg-info-500 active:enabled:bg-info-500 dark:focus-visible:outline-info-400/70 dark:focus-within:outline-info-400/70 dark:focus-visible:bg-info-500 dark:active:enabled:bg-info-500 rounded-md mr-2"
                >
                  <span>Cancel</span>
                </button>
                {/**/}
                {/**/}
              </div>
            </div>
          </h2>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUsers;
