import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    exportExcelApi,
} from "../../Api/Service";
const ExportExcel = () => {

    let authUser = useAuthUser();
    let Navigate = useNavigate();
    useEffect(() => {
        if (authUser().user.role === "admin") {

            return;
        } else {
            Navigate("/dashboard");
        }
    }, []);
    // const handleExport = async () => {
    //     let data = await axios.get("http://localhost:4000/api/v1/exportExcel", {
    //         responseType: "blob", // ✅ Important! Ensures binary response
    //         withCredentials: true, // ✅ Needed if using CORS with credentials
    //     });
    //     console.log('data: ', data);
    // };
    const handleExport = async () => {
        try {
            const response = await exportExcelApi(); // Axios response

            console.log("Response:", response);

            // ✅ Correctly create a downloadable file
            const url = window.URL.createObjectURL(response);
            const a = document.createElement("a");
            a.href = url;
            a.download = "data.xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error exporting Excel:", error);
        }
    };



    return (
        <button onClick={handleExport}>Export to Excel</button>
    );
};

export default ExportExcel;
