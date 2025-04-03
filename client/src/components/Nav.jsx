import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ItemsAll from "./ItemsAll";
import MyInventory from "./MyInventory";
import Button from "react-bootstrap/Button";
import { useAuth } from "./Auth";

export default function Nav() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="nav-container">
        <Link to="/home">
          <Button variant="outline-light">Home</Button>
        </Link>
        <Link to="/myinventory">
          <Button variant="outline-light">My Inventory</Button>
        </Link>
        <div className="login-btn">
          {user ? (
            <Link to="/" onClick={handleLogout}>
              <Button variant="outline-light">Log out</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="outline-light">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
