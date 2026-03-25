// import logoImage from "../../assets/images/cisco.png";
import '../../App.css';
// import {Link} from "react-router-dom";

function Header() {
    // const location = useLocation();
    //
    // const isActive = (path: string) => {
    //     return location.pathname === path;
    // };

    return (
        <div>
            <header className="navbar">
                <div className="logo">
                    {/* <span><img src={logoImage} alt="logo" className="logo-icon"/> </span> */}
                        <span> QA Dashboard</span>

                </div>
{/*<div>*/}
{/*   <img src={logoImage} alt="logo" className="logo"/>*/}
{/*</div>*/}
{/*                <div className="logo">*/}
{/*                   QA AI Agent*/}
{/*                </div>*/}
                
                {/*<nav className="nav-menu">*/}
                {/*    <Link */}
                {/*        to="/dashboard" */}
                {/*        className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}*/}
                {/*    >*/}
                {/*        Dashboard*/}
                {/*    </Link>*/}
                {/*    <Link */}
                {/*        to="/tests" */}
                {/*        className={`nav-link ${isActive('/tests') ? 'active' : ''}`}*/}
                {/*    >*/}
                {/*        Tests*/}
                {/*    </Link>*/}
                {/*    <Link */}
                {/*        to="/reports" */}
                {/*        className={`nav-link ${isActive('/reports') ? 'active' : ''}`}*/}
                {/*    >*/}
                {/*        Reports*/}
                {/*    </Link>*/}
                {/*    <Link */}
                {/*        to="/settings" */}
                {/*        className={`nav-link ${isActive('/settings') ? 'active' : ''}`}*/}
                {/*    >*/}
                {/*        Settings*/}
                {/*    </Link>*/}
                {/*</nav>*/}
                
                {/*<div className="user-menu">*/}
                {/*    <span className="user-name">User</span>*/}
                {/*    <div className="user-avatar">*/}
                {/*        <span>👤</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </header>
        </div>
    );
}

export default Header;