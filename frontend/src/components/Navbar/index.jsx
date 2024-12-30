import { Link, useLocation } from "react-router-dom";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { BsPiggyBank } from "react-icons/bs";
import { navLinks } from "../../data";

// Navbar component
const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="flex items-center justify-between bg-gray-600 w-full h-[10vh]  text-white p-4 fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <BsPiggyBank className="text-3xl" />
        <span className="font-semibold text-lg">Finance Tracker</span>
      </div>

      <div className=" mx-auto flex justify-between items-center">
        <ul className="  hidden md:flex gap-9">
          {navLinks.links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`${
                  location.pathname === link.path
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-7">
        <button
          className="text-2xl"
          onClick={() => {
            toggleTheme();
          }}
          title={theme === "light" ? " light mode" : " dark mode"}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <IoMdMoon /> : <MdSunny />}
        </button>
        <div className="">
          <SignedOut>
            <SignInButton
              mode="modal"
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 text-sm mr-4"
            >
              Login
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
