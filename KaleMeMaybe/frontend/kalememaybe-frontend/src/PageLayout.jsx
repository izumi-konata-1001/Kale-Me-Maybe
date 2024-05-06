import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./styles.css";
import { FaHome, FaHourglassStart, FaStar, FaCompass } from "react-icons/fa";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { AuthContext } from "./contexts/AuthProvider";

export default function PageLayout() {
    const { darkMode} = useContext(AuthContext);
    return (
    <React.Fragment>
      <Header />
      <main className={darkMode ? " dark bg-black min-h-screen" : "main-background"}>
        <div className="container w-2/3 my-0 mx-auto dark:bg-black">
          <Outlet />
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}

function Header() {
    const { authToken, userAvatar, userName, logout,darkMode,setDarkMode } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="bg-lime-50">
      <div className={darkMode ? "dark" : ""}>
        <div className="md:hidden flex justify-between items-center px-4 py-2 dark:bg-green-dark">
          <img src="/logo.png" className="h-12 w-12" alt="Logo" />
          <p className={"text-green-dark font-bold dark:text-white"}>KaleMeMaybe</p>
          <button
            className="text-green-dark font-semibold dark:text-white"
            onClick={toggleMenu}
          >
            Menu &#9776;
          </button>
          {authToken ? (
            ""
          ) : (
            <NavLink
              to="sign-up"
              className="text-white bg-green-dark hover:bg-lime-800 font-medium rounded-lg text-sm px-5 py-3 text-center"
            >
              Sign Up &rarr;
            </NavLink>
          )}
          {authToken && (
            <NavLink
              to="profile"
              className="flex flex-col items-center text-center"
            >
              <img
                src={userAvatar || "/logo.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <p className="text-xs mt-1 dark:text-white">{userName || "UserOne"}</p>
            </NavLink>
          )}
          <BsFillMoonStarsFill
            onClick={() => setDarkMode(!darkMode)}
            className={
              "cursor-pointer text-xl hover:text-green-dark dark:text-green-dark"
            }
          />
        </div>

        <nav className="hidden md:flex items-stretch justify-between">
          <div className="flex items-center justify-evenly w-2/5">
            <NavLink
              to="."
              className={({ isActive }) =>
                isActive
                  ? "nav nav-link bg-green-dark text-white font-bold dark:text-green-light dark:bg-black"
                  : "nav nav-link dark:text-black"
              }
            >
              <span className="flex items-center gap-2">
                <FaHome /> Home
              </span>
            </NavLink>
            <NavLink
              to="discover"
              className={({ isActive }) =>
                isActive
                  ? "nav nav-link bg-green-dark text-white font-bold dark:text-green-light dark:bg-black"
                  : "nav nav-link dark:text-black"
              }
            >
              <span className="flex items-center gap-2">
                <FaCompass /> Discover
              </span>
            </NavLink>
          </div>

          <div className="flex flex-col items-center justify-center">
            <img src="/logo.png" className="h-20 w-20" alt="Logo" />
            <h1 className={"text-xl text-green-dark font-bold dark:text-black"}>KaleMeMaybe</h1>
          </div>

          <div className="flex items-center justify-evenly w-2/5">
            <NavLink
              to="browsing-history"
              className={({ isActive }) =>
                isActive
                  ? "nav nav-link bg-green-dark text-white font-bold dark:text-green-light dark:bg-black"
                  : "nav nav-link dark:text-black"
              }
            >
              <span className="flex items-center gap-2">
                <FaHourglassStart /> Browsing History
              </span>
            </NavLink>
            {authToken && (
              <NavLink
                to="favorites"
                className={({ isActive }) =>
                  isActive
                    ? "nav nav-link bg-green-dark text-white font-bold dark:text-green-light dark:bg-black"
                    : "nav nav-link dark:text-black"
                }
              >
                <span className="flex items-center gap-2">
                  <FaStar /> Saved recipes
                </span>
              </NavLink>
            )}
            <div className="flex items-center justify-between gap-5">
              {authToken ? (
                <>
                  <Link
                    to="/"
                    onClick={logout}
                    className="text-green-dark hover:text-lime-800"
                  >
                    <button className="text-green-dark hover:text-lime-800 dark:text-black">
                      Log Out
                    </button>
                  </Link>
                  <NavLink
                    to="profile"
                    className="flex flex-col items-center text-center"
                  >
                    <img
                      src={userAvatar || "/logo.png"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full hover:border-2 hover:border-green-dark"
                    />
                    <p className="text-xs mt-1">{userName || "UserOne"}</p>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="log-in"
                    className="text-green-dark hover:text-lime-800 dark:text-black"
                  >
                    Log In
                  </NavLink>
                  <NavLink
                    to="sign-up"
                    className="text-white bg-green-dark hover:bg-lime-800 font-bold rounded-lg text-sm px-5 py-3 text-center dark:text-green-light dark:bg-lime-900"
                  >
                    Sign Up &rarr;
                  </NavLink>
                </>
              )}
              <BsFillMoonStarsFill
                onClick={() => setDarkMode(!darkMode)}
                className={
                  "cursor-pointer text-xl hover:text-green-dark dark:text-green-dark dark:hover:text-black"
                }
              />
            </div>
          </div>
        </nav>

        <div
          className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}
          id="mobile-menu"
        >
          <NavLink
            to="."
            className="block py-2 px-4 text-sm hover:bg-green-light"
          >
            Home
          </NavLink>
          <NavLink
            to="discover"
            className="block py-2 px-4 text-sm hover:bg-green-light"
          >
            Discover
          </NavLink>
          <NavLink
            to="browsing-history"
            className="block py-2 px-4 text-sm hover:bg-green-light"
          >
            Browsing History
          </NavLink>
          {authToken && (
            <NavLink
              to="favorites"
              className="block py-2 px-4 text-sm hover:bg-green-light"
            >
              Saved recipes
            </NavLink>
          )}
          {authToken ? (
            <Link
              to="/"
              onClick={logout}
              className="block py-2 px-4 text-sm hover:bg-green-light "
            >
              Log out
            </Link>
          ) : (
            <NavLink
              to="log-in"
              className="block py-2 px-4 text-sm hover:bg-green-light"
            >
              Log In
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

function Footer() {
    const { authToken,darkMode} = useContext(AuthContext);
    return (
        <div className={darkMode?"dark":""} >
        <footer className="text-white text-center bg-green-dark w-full dark:bg-green-light dark:text-black">
                <div className="flex justify-between px-10">
                    <div>
                        <h5 className="uppercase font-bold mb-2.5 underline">Company Info</h5>
                        <p><Link to="/about" className={"hover:underline"}>About us</Link></p>
                        <p><Link to="/contact" className={"hover:underline"} >Contact</Link></p>
                    </div>
                    <div>
                        <h5 className="uppercase font-bold mb-2.5 underline">Quick Links</h5>
                        <p><Link to="/discover" className={"hover:underline"}>Discover</Link></p>
                        {authToken&&<p><Link to="/favorites" className={"hover:underline"}>Saved recipes</Link></p>}
                        <p><Link to="/browsing-history" className={"hover:underline"}>Browsing history</Link></p>
                    </div>
                    <div>
                        <h5 className="uppercase font-bold mb-2.5 underline">Follow us</h5>
                        <span className={"flex items-center p-1 cursor-pointer hover:underline"}><AiFillInstagram/><p>Instagram</p></span>
                        <span className={"flex items-center p-1 hover:underline"}><AiFillFacebook/><p>Facebook</p></span>
                    </div>
                </div>
            <div className="text-black text-center p-4 bg-green-light dark:bg-black dark:text-green-light">
                Copyright ©️ Kale Me Maybe, {new Date().getFullYear()}
            </div>
        </footer>
        </div>
    );
}
