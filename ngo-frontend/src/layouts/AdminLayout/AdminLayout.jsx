import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import "./AdminLayout.css";

function AdminLayout({ children }) {

    return (

        <>

            <AdminNavbar />

            <main className="admin-content">

                {children}

            </main>



        </>

    );

}

export default AdminLayout;