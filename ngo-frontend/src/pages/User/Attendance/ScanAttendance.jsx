import { useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../layouts/UserLayout/UserLayout";
import api from "../../../api/api";
import "./ScanAttendance.css";

function ScanAttendance() {

    const [scannerRunning, setScannerRunning] = useState(false);

    const navigate = useNavigate();

    const startScanner = async () => {

        if (scannerRunning) return;

        const html5QrCode = new Html5Qrcode("reader");

        try {

            await html5QrCode.start(

                { facingMode: "environment" },

                {
                    fps: 10,
                    qrbox: 250
                },

                async (decodedText) => {

                    try {

                        await api.post(`/attendance/checkin/${decodedText}`);

                        toast.success("Attendance marked successfully!");

                        await html5QrCode.stop();

                        setScannerRunning(false);

                        navigate("/dashboard");

                    } catch (err) {

                        toast.error(
                            err.response?.data?.message ||
                            "Unable to mark attendance."
                        );

                    }

                }

            );

            setScannerRunning(true);

        } catch (err) {

            console.log(err);

            toast.error("Unable to start camera.");

        }

    };

    return (

        <DashboardLayout>

            <div className="scan-page">

                <h1>Scan Attendance</h1>

                <p>
                    Scan the event QR code to mark your attendance.
                </p>

                <button
                    className="scan-btn"
                    onClick={startScanner}
                >
                    📷 Start Scanner
                </button>

                <div id="reader"></div>

            </div>

        </DashboardLayout>

    );

}

export default ScanAttendance;