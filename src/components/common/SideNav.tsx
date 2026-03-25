import '../../assets/styles/SideNav.css';
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate, useLocation} from 'react-router-dom';

/* import all the icons in Free Solid, Duotone Solid, and Duotone Thin styles */
import {faHome, faPieChart} from '@fortawesome/free-solid-svg-icons'


function SideNav(){
    const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Dynamic sidebar items array
    const sidebarItems = [
        {
            id: 'home',
            icon: faHome,
            label: 'Home',
            href: '/home',
            route: '/home'
        },
        {
            id: 'observability',
            icon: faPieChart,
            label: 'Observability',
            href: '/observability',
            route: '/dashboard'
        },
    ];

    const [activeItem, setActiveItem] = useState(() => {
        const currentPath = location.pathname;
        const activeItem = sidebarItems.find(item => 
            currentPath === item.route || currentPath.startsWith(item.route)
        );
        return activeItem?.id || '';
    });

    // Update active item when route changes
    useEffect(() => {
        const currentPath = location.pathname;
        const foundItem = sidebarItems.find(item => 
            currentPath === item.route || currentPath.startsWith(item.route)
        );
        setActiveItem(foundItem?.id || '');
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isSidebarExpanded) {
                const sidebar = document.getElementById('sidebar');
                if (sidebar && !sidebar.contains(event.target as Node)) {
                    setIsSidebarExpanded(false);
                }
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isSidebarExpanded]);

    const toggleSidebar = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent event bubbling
        console.log('Menu button clicked! Current state:', isSidebarExpanded);
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    const handleNavItemClick = (itemId: string, route: string, event: React.MouseEvent) => {
        event.preventDefault();
        setActiveItem(itemId);
        navigate(route);
    };

    return(
            <nav className={`sidebar ${isSidebarExpanded ? 'expanded' : ''}`} id="sidebar">
                <button onClick={toggleSidebar} className="menu-btn" id="menuBtn">
                    <div className="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                <div className="nav-items item-list">
                    {sidebarItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            onClick={(e) => handleNavItemClick(item.id, item.route, e)}
                            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                            title={item.label}
                        >
                            <div className="nav-item-icon">
                            <div className="nav-icon">
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className='flip-on-hover'
                                    style={{color: "#d2caec"}}
                                />
                            </div>
                            <span className="nav-text">{item.label}</span>
                            </div>

                        </a>
                    ))}
                </div>
            </nav>

    )
}


export default SideNav;