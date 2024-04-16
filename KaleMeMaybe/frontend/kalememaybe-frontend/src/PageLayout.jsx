import React from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import'./styles.css';
import { FaHome, FaHourglassStart,FaStar,FaCompass } from "react-icons/fa";
import {AiFillFacebook, AiFillInstagram} from "react-icons/ai";
import {BsFillMoonStarsFill} from "react-icons/bs";


export default function PageLayout() {
  return (
    <React.Fragment>
      <Header />
        <main className="main-background">
          <div className="container mx-auto w-3/5">
            <Outlet />
          </div>
        </main>
      <Footer />
    </React.Fragment>
  );
}

function Header() {
  return (
    <header className={"flex items-stretch justify-between bg-lime-50"}>
        <div className="flex items-center justify-evenly w-2/5 md:flex-row">
        <NavLink to="." className={"nav nav-link"}>
            <span className={"flex items-center gap-2"}>
                    <FaHome /> Home
             </span>
        </NavLink>
      <NavLink to="discover" className={"nav nav-link"}>
          <span className={"flex items-center gap-2"}>
                      <FaCompass/>
        Discover
             </span>
      </NavLink>
        </div>

        <div className={"flex flex-col items-center justify-center"}>
        <img src="/logo.png" className="h-20 w-20" alt="Logo"/>
        </div>

        <div className="flex items-center justify-evenly w-2/5">
            <NavLink to="browsing-history" className={"nav nav-link"}>
            <span className={"flex items-center gap-2"}>
                <FaHourglassStart/>
            Browsing History
            </span>
            </NavLink>
        <NavLink to="favorites" className={"nav nav-link"}>
             <span className={"flex items-center gap-2"}>
                       <FaStar/> Saved recipes
             </span>
        </NavLink>
        <div className={"flex items-center justify-between gap-5"}>
        <NavLink to="log-in" className={"text-green-dark hover:text-lime-800"}>
            Log In
        </NavLink>
        <NavLink to="sign-up" className={"text-white bg-green-dark hover:bg-lime-800 font-medium rounded-lg text-sm px-5 py-3 text-center"}>
            Sign Up &rarr;
        </NavLink>
            <BsFillMoonStarsFill className={"cursor-pointer"}/>
        </div>
        {/*<NavLink to="Profile">*/}
        {/*    Profile*/}
        {/*</NavLink>*/}
        </div>
    </header>
  );
}

function Footer() {
    return (
        <footer className="text-white text-center bg-green-dark w-full">
                <div className="flex justify-between px-10 py-5">
                    <div className="mb-6">
                        <h5 className="uppercase font-bold mb-2.5 underline">Company Info</h5>
                        <p><Link to="/about" className={"hover:underline"}>About us</Link></p>
                        <p><Link to="/contact" className={"hover:underline"} >Contact</Link></p>
                        <p className={"hover:underline"}>Private Policy</p>
                    </div>
                    <div className="mb-6">
                        <h5 className="uppercase font-bold mb-2.5 underline">Quick Links</h5>
                        <p><Link to="/discover" className={"hover:underline"}>Discover</Link></p>
                        <p><Link to="/favorites" className={"hover:underline"}>Saved recipes</Link></p>
                    </div>
                    <div className="mb-6">
                        <h5 className="uppercase font-bold mb-2.5 underline">Follow us</h5>
                        <span className={"flex items-center p-1 cursor-pointer hover:underline"}><AiFillInstagram/><p>Instagram</p></span>
                        <span className={"flex items-center p-1 hover:underline"}><AiFillFacebook/><p>Facebook</p></span>
                    </div>
                </div>
            <div className="text-black text-center p-4 bg-green-light">
                Copyright ©️ Kale Me Maybe, {new Date().getFullYear()}
            </div>
        </footer>
    );
}
