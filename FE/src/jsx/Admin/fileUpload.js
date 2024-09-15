import React, { useState, useEffect } from "react";
import SideBar from "../layouts/AdminSidebar/Sidebar";
import { uploadFilesApi } from "../../Api/Service";
import { Dropzone, FileMosaic } from "@files-ui/react";
import Log from "../../assets/images/img/log.jpg";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
const FileUpload = () => {
  let authUser = useAuthUser();
  let Navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [Active, setActive] = useState(false);
  const [uploadState, setuploadState] = useState({
    isLoading: false,
    disable: true,
  });
  let toggleBar = () => {
    if (Active === true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };
  const updateFiles = (incomingFiles) => {
    setFiles(incomingFiles);
  };

  const handleUpload = async () => {
    setuploadState((prevState) => ({
      ...prevState,
      isLoading: true,
      disable: true,
    })); // Set loading state to true
    if (files.length === 0) {
      return toast.error("No file selected");
    }
    // Assuming your dynamic array is named 'yourDynamicArray'
    const fileArray = files.map((item) => item.file);

    try {
      const formData = new FormData();

      fileArray.forEach((file, index) => {
        formData.append(`file_${index + 1}`, file);
      });

      const uploadFiles = await uploadFilesApi(formData);

      if (uploadFiles.success) {
        setFiles([]);
        toast.success(uploadFiles.msg);
      } else {
        console.log();
        toast.error(uploadFiles.msg);
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(error?.data?.msg || error?.message || "Something went wrong");
    } finally {
      setuploadState((prevState) => ({
        ...prevState,
        isLoading: false,
        disable: false,
      })); // Set loading state back to false
    }
  };

  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const removeAllFiles = (evt) => {
    evt.stopPropagation();
    setFiles([]);
  };
  useEffect(() => {
    if (authUser().user.role === "user") {
      Navigate("/dashboard");
      return;
    } else if (authUser().user.role === "admin") {
      return;
    }
  }, []);
  useEffect(() => {
    if (files.length === 0) {
      setuploadState({ disable: true });
    } else {
      setuploadState({ disable: false });
    }
  }, [files]);
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
                  Upload Files
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
              <div className>
                <div>
                  <div className="mb-6 flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex w-full items-center gap-4 sm:w-auto"></div>
                    <div className="flex w-full items-center justify-end gap-4 sm:w-auto" />
                  </div>

                  <div className="">
                    <>
                      <h1 className="mb-3 bolda">Upload new files:</h1>
                      <div>
                        <div className="row bg-white p-4 rounded">
                          <Dropzone
                            onChange={updateFiles}
                            value={files}
                            headerConfig={{
                              customHeader: (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <button
                                    disabled={uploadState.isLoading}
                                    style={{
                                      backgroundColor: "teal",
                                      color: "white",
                                    }}
                                    onClick={removeAllFiles}
                                  >
                                    delete files
                                  </button>
                                </div>
                              ),
                            }}
                          >
                            {files.map((file) => (
                              <FileMosaic
                                key={file.id}
                                {...file}
                                onDelete={
                                  uploadState.isLoading ? undefined : removeFile
                                }
                                info
                              />
                            ))}
                          </Dropzone>
                          <button
                            className="mybtna"
                            onClick={handleUpload}
                            disabled={uploadState.disable} // Disable the button while uploading
                            style={{
                              backgroundColor: uploadState.disable
                                ? "#ddd"
                                : "#0087F7",
                              color: "white",

                              padding: "10px",
                              borderRadius: "5px",
                              marginTop: "10px",
                              border: "none",
                            }}
                          >
                            {uploadState.isLoading
                              ? "Uploading..."
                              : "Upload Files"}
                          </button>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
              {/**/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
