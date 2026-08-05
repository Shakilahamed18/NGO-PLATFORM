import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import api from "../../../api/api";
import { toast } from "react-toastify";
import "./Users.css";

function Users() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const response = await api.get("/users");

            setUsers(response.data);

        } catch (err) {

            console.log(err);

            toast.error("Unable to load users.");

        }

    };

    const searchUsers = async (value) => {

        setSearch(value);

        try {

            if (value.trim() === "") {

                loadUsers();

                return;

            }

            const response = await api.get(
                `/users/search?keyword=${value}`
            );

            setUsers(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <AdminLayout>

            <div className="users-page">

                <div className="page-header">

                    <h1>Users Management</h1>

                    <input
                        className="search-box"
                        type="text"
                        placeholder="🔍 Search by name or email..."
                        value={search}
                        onChange={(e) =>
                            searchUsers(e.target.value)
                        }
                    />

                </div>

                <div className="stats">

                    <div className="stat-card">

                        <h3>Total Users</h3>

                        <span>{users.length}</span>

                    </div>

                    <div className="stat-card">

                        <h3>Admins</h3>

                        <span>
                            {
                                users.filter(
                                    user => user.role === "ADMIN"
                                ).length
                            }
                        </span>

                    </div>

                    <div className="stat-card">

                        <h3>Volunteers</h3>

                        <span>
                            {
                                users.filter(
                                    user => user.role === "USER"
                                ).length
                            }
                        </span>

                    </div>

                </div>

                {users.length === 0 ? (

                    <div className="empty-state">

                        <h2>No Users Found</h2>
                        <p>Try another search keyword.</p>

                    </div>

                ) : (

                    <table className="users-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map((user, index) => (

                                <tr key={user.id}>

                                    <td>{index + 1}</td>

                                    <td>👤 {user.name}</td>

                                    <td>📧 {user.email}</td>

                                    <td>

                                        <span
                                            className={`role ${user.role}`}
                                        >
                                            {user.role}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </AdminLayout>

    );

}

export default Users;