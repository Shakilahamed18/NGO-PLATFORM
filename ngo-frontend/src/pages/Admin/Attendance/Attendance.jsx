import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import api from "../../../api/api";
import { formatDate } from "../../../utils/formatDate";
import { toast } from "react-toastify";
import { FaUser, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import "./Attendance.css";

function Attendance() {

    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        loadAttendance();
    }, []);

    const loadAttendance = async () => {

        try {

            const response = await api.get("/attendance");

            setAttendance(response.data);

        } catch (err) {

            console.log(err);

            toast.error("Unable to load attendance.");

        }

    };

    return (

        <AdminLayout>

            <div className="attendance-page">

                <div className="page-header">

                    <h1>Attendance Management</h1>

                </div>

                <div className="attendance-list">

                    <h2 className="table-title">
                        Attendance Records
                    </h2>

                    {attendance.length === 0 ? (

                        <div className="empty-state">

                            <h2>No Attendance Yet</h2>

                            <p>
                                Attendance will appear here after volunteers scan the event QR code.
                            </p>

                        </div>

                    ) : (

                        <table className="attendance-table">

                            <thead>

                                <tr>

                                    <th>Volunteer</th>

                                    <th>Event</th>

                                    <th>Checked In</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {attendance.map((record, index) => (

                                    <tr key={index}>

                                        <td>

                                            <FaUser className="table-icon" />

                                            {record.userName}

                                        </td>

                                        <td>

                                            <FaCalendarAlt className="table-icon" />

                                            {record.eventTitle}

                                        </td>

                                        <td>

                                            {formatDate(record.attendedAt)}

                                        </td>

                                        <td>

                                            <span className="present-badge">

                                                <FaCheckCircle />

                                                Present

                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    )}

                </div>

            </div>

        </AdminLayout>

    );

}

export default Attendance;