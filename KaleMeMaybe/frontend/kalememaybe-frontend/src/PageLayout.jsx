import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import'./styles.css';

export default function PageLayout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </React.Fragment>
  );
}

function Header() {
  return (
    <header>
      <h2 className={"bg-green-dark text-white"}>Kale Me Maybe</h2>
      <NavLink to="." >
        Home
      </NavLink>
      <NavLink to="discover">
        Discover
      </NavLink>
        <NavLink to="browsing-history">
            My Recipes
        </NavLink>
        <NavLink to="favorites">
            Favorites
        </NavLink>
        <NavLink to="log-in">
            Log In
        </NavLink>
        <NavLink to="sign-up">
            Sign Up
        </NavLink>
        <NavLink to="Profile">
            Profile
        </NavLink>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <hr />
      <p>Copyright ©️ Kale Me Maybe, 2024</p>
    </footer>
  );
}
