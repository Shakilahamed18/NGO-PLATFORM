import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/UserLayout/UserLayout";
import api from "../../../api/api";
import "./Profile.css";

function Profile() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const res = await api.get("/profile");

            setProfile(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    if (!profile) {

        return (
            <DashboardLayout>
                <h2>Loading...</h2>
            </DashboardLayout>
        );

    }

    return (

        <DashboardLayout>

            <div className="profile-page">

                <div className="profile-header">

                    <h1>👤 My Profile</h1>

                    <p>Welcome back, {profile.name}!</p>

                </div>

                <div className="profile-card">

                    <div className="profile-info">

                        <h2>Personal Information</h2>

                        <p><strong>Name:</strong> {profile.name}</p>

                        <p><strong>Email:</strong> {profile.email}</p>

                        <p><strong>Role:</strong> {profile.role}</p>

                    </div>

                    <div className="stats-grid">

                        <div className="stat-box">
                            <h3>Total Applications</h3>
                            <span>{profile.totalApplications}</span>
                        </div>

                        <div className="stat-box">
                            <h3>Approved</h3>
                            <span>{profile.approvedApplications}</span>
                        </div>

                        <div className="stat-box">
                            <h3>Completed</h3>
                            <span>{profile.completedApplications}</span>
                        </div>

                        <div className="stat-box">
                            <h3>Attendance</h3>
                            <span>{profile.attendanceCount}</span>
                        </div>

                        <div className="stat-box">
                            <h3>Certificates</h3>
                            <span>{profile.certificateCount}</span>
                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Profile;