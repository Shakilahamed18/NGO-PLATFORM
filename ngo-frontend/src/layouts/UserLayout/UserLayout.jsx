import UserNavbar from "../../components/UserNavbar/UserNavbar";
import "./UserLayout.css";

function UserLayout({ children }) {

    return (
        <>
            <UserNavbar />

            <main>
                {children}
            </main>
        </>
    );

}

export default UserLayout;