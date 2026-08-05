import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import api from "../../../api/api";
import { toast } from "react-toastify";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

import {
    FaUsers,
    FaCalendarAlt,
    FaClipboardList,
    FaCheckCircle
} from "react-icons/fa";
import "./Reports.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Reports() {

    const [report, setReport] = useState({
        totalUsers: 0,
        totalEvents: 0,
        totalApplications: 0,
        totalAttendance: 0
    });

    const chartData = {

        labels: [
            "Users",
            "Events",
            "Applications",
            "Attendance"
        ],

        datasets: [
            {
                label: "Count",
                data: [
                    report.totalUsers,
                    report.totalEvents,
                    report.totalApplications,
                    report.totalAttendance
                ],

                backgroundColor: [
                    "#3b82f6", // Blue
                    "#10b981", // Green
                    "#f59e0b", // Orange
                    "#ef4444"  // Red
                ],

                borderRadius: 8,
                borderWidth: 1
            }
        ]

    };

    const chartOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            },

            title: {

                display: true,

                text: "VolunteerHub Statistics",

                font: {
                    size: 20
                }

            }

        },

        scales: {

            y: {

                beginAtZero: true,

                ticks: {

                    precision: 0

                }

            }

        }

    };

    useEffect(() => {
        loadReport();
    }, []);

    const loadReport = async () => {

        try {

            const response = await api.get("/reports");

            setReport(response.data);

        } catch (err) {

            console.log(err);

            toast.error("Unable to load reports.");

        }

    };

    return (

        <AdminLayout>

            <div className="reports-page">

                <h1>Reports Dashboard</h1>

                <div className="report-cards">

                    <div className="report-card">

                        <FaUsers className="report-icon" />

                        <h3>Total Users</h3>

                        <span>{report.totalUsers}</span>

                    </div>

                    <div className="report-card">

                        <FaCalendarAlt className="report-icon" />

                        <h3>Total Events</h3>

                        <span>{report.totalEvents}</span>

                    </div>

                    <div className="report-card">

                        <FaClipboardList className="report-icon" />

                        <h3>Applications</h3>

                        <span>{report.totalApplications}</span>

                    </div>

                    <div className="report-card">

                        <FaCheckCircle className="report-icon" />

                        <h3>Attendance</h3>

                        <span>{report.totalAttendance}</span>

                    </div>

                </div>
                <div className="chart-container">

                    <Bar
                        data={chartData}
                        options={chartOptions}
                    />

                </div>
            </div>

        </AdminLayout>

    );

}

export default Reports;