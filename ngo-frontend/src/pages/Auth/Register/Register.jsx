import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { toast } from "react-toastify";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleRegister = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await api.post("/auth/register", form);

            toast.success("Registration successful!");

            navigate("/");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Registration failed"
            );

        }

        setLoading(false);

    };

    return (

        <div className="register-container">

            <div className="register-card">

                <h1>VolunteerHub</h1>

                <h3>Create Your Account</h3>

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>

                <p>

                    Already have an account?

                    <Link to="/"> Login</Link>

                </p>

            </div>

        </div>

    );

}

export default Register;