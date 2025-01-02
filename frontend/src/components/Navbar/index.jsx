import { Link, useLocation } from "react-router-dom";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { BsPiggyBank } from "react-icons/bs";
import { navLinks } from "../../data";
import { AlignJustify, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="flex items-center justify-between bg-gray-800 w-full h-[10vh] text-white p-4 fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <BsPiggyBank className="text-3xl text-blue-400" />
        <span className="font-semibold text-lg">Finance Tracker</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex mx-auto justify-between items-center">
        <ul className="flex gap-9">
          {navLinks.links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`${
                  location.pathname === link.path
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "hover:text-blue-400"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-7">
        {/* Theme Toggle */}
        <button
          className="text-2xl"
          onClick={() => toggleTheme()}
          title={
            theme === "light" ? "Switch to light mode" : "Switch to dark mode"
          }
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <IoMdMoon /> : <MdSunny />}
        </button>

        {/* Authentication */}
        <div>
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

        {/* Mobile Navigation */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            className="text-2xl"
          >
            {isOpen ? <X /> : <AlignJustify />}
          </button>

          <div className="relative">
            {/* Overlay Background */}
            {isOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-10 "
                onClick={() => setIsOpen(false)}
              ></div>
            )}

            {/* Side Menu */}
            <div
              className={`absolute -top-12 -right-4 bg-gray-800 rounded-lg transform h-screen w-96 p-6 transition-transform duration-300 z-20 ${
                isOpen ? "-translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BsPiggyBank className="text-3xl text-blue-400" />
                  <span className="font-semibold text-lg">Finance Tracker</span>
                </div>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle navigation"
                  className="text-2xl"
                >
                  {isOpen ? <X /> : <AlignJustify />}
                </button>
              </div>
              {/* Navigation Links */}
              <ul className="gap-4 text-lg w-40 h-60 p-4 flex flex-col justify-center text-white">
                {navLinks.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`${
                        location.pathname === link.path
                          ? "text-blue-400 border-b-2 border-blue-400"
                          : "hover:text-blue-400"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
