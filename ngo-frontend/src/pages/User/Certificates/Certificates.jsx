import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/UserLayout/UserLayout";
import api from "../../../api/api";
import "./Certificates.css";

function Certificates() {

    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {

        try {

            const res = await api.get("/applications/my");

            const completed = res.data.filter(
                app => app.status === "COMPLETED" && app.attended
            );

            setCertificates(completed);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <DashboardLayout>

            <div className="certificates-page">

                <h1>🏆 My Certificates</h1>

                {certificates.length === 0 ? (

                    <h2>No certificates available.</h2>

                ) : (

                    <div className="certificate-grid">

                        {certificates.map(app => (

                            <div
                                className="certificate-card"
                                key={app.id}
                            >

                                <h2>{app.eventTitle}</h2>

                                <p>{new Date(app.eventDate).toLocaleDateString()}</p>

                                <button
                                    onClick={() =>
                                        window.open(
                                            `http://localhost:8080/api/certificate/${app.id}`,
                                            "_blank"
                                        )
                                    }
                                >
                                    📄 Download Certificate
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </DashboardLayout>

    );

}

export default Certificates;