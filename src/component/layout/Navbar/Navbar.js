        import React, { useState } from "react";
        import { Link, useNavigate } from "react-router-dom";
        import { useSelector, useDispatch } from "react-redux";
        import logo from "../../../images/logo.png";
        import { logout } from "../../../actions/userAction";
        import { useAlert } from "react-alert";
        import "./Navbar.css";

        const Navbar = () => {
        const [menuOpen, setMenuOpen] = useState(false);
        const [dropdownOpen, setDropdownOpen] = useState(false);

        const { isAuthenticated, user } = useSelector((state) => state.user);
        const dispatch = useDispatch();
        const alert = useAlert();
        const navigate = useNavigate();

        const handleMenuToggle = () => setMenuOpen(!menuOpen);
        const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);
        const handleDropdownClose = () => setDropdownOpen(false);

        const handleLogout = () => {
            dispatch(logout());
            alert.success("Logout Successfully");
            setDropdownOpen(false);
            navigate("/");
        };

        return (
            <nav className="main-navbar">
            <div className="navbar-logo">   
                <Link to="/">
                <img src={logo} alt="Logo"  />            
                </Link>
            </div>

            <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={handleMenuToggle}>Home</Link>
                <Link to="/about" onClick={handleMenuToggle}>About Us</Link>
                <Link to="/services" onClick={handleMenuToggle}>Services</Link>
                <Link to="/products" onClick={handleMenuToggle}>Products</Link>
                <Link to="/contact" onClick={handleMenuToggle}>Contact</Link>
            </div>

            {/* Mobile Auth/Profile */}
            <div className="navbar-auth-mobile">
                {!isAuthenticated ? (
                <Link to="/login" onClick={handleMenuToggle}>Login / Register</Link>
                ) : (
                <div className="navbar-profile-mobile">
                    <span onClick={handleDropdownToggle}>
                    <img
                        className="navbar-avatar"
                        src={user?.avatar?.url || "/Profile.png"}
                        alt="Profile"
                    />
                    </span>
                    {dropdownOpen && (
                    <div className="navbar-dropdown-mobile">
                        <Link to="/account" onClick={handleMenuToggle}>Profile</Link>
                        <Link to="/cart" onClick={handleMenuToggle}>Add to Cart</Link>
                        <Link to="/orders" onClick={handleMenuToggle}>Orders</Link>
                        {user?.role === "admin" && (
                        <Link to="/admin/dashboard" onClick={handleMenuToggle}>Dashboard</Link>
                        )}
                        <span onClick={handleLogout} style={{ cursor: "pointer", padding: "0.7rem 1.2rem" }}>
                        Logout
                        </span>
                    </div>
                    )}
                </div>
                )}
            </div>

            {/* Desktop Auth/Profile */}
            <div className="navbar-auth-desktop">
                {!isAuthenticated ? (
                <Link to="/login">Login / Register</Link>
                ) : (
                <div
                    className="navbar-profile"
                    onClick={handleDropdownToggle}

                >
                    <img
                    className="navbar-avatar"
                    src={user?.avatar?.url || "/Profile.png"}
                    alt="Profile"
                    style={{ width: 32, height: 32, borderRadius: "50%" }}
                    />
                    {dropdownOpen && (
                    <div className="navbar-dropdown">
                        <Link to="/account">Profile</Link>
                        <Link to="/cart">Add to Cart</Link>
                        <Link to="/orders">Orders</Link>
                        {user?.role === "admin" && (
                        <Link to="/admin/dashboard">Dashboard</Link>
                        )}
                        <span onClick={handleLogout} style={{ cursor: "pointer", padding: "0.7rem 1.2rem" }}>
                        Logout
                        </span>
                    </div>
                    )}
                </div>
                )}
            </div>

            <div className="navbar-toggle" onClick={handleMenuToggle}>
                <span className="navbar-toggle-icon">☰</span>
            </div>
            </nav>
        );
        };

        export default Navbar;
