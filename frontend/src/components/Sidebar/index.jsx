import { useState } from "react";
import { sidebarLinks } from "../../data";
import { AlignLeft, AlignRight } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(1);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <aside
        className={`fixed top-16 left-0 h-[90vh] w-64 bg-white dark:bg-gray-800 dark:text-white transition-transform transform z-50 mt-2 p-3 rounded-r-3xl ${
          isOpen ? "translate-x-0" : "-translate-x-3/4"
        } md:flex flex-col items-center gap-20 hidden`}
      >
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ml-auto"
        >
          {isOpen ? (
            <AlignRight className="text-blue-500 font-bold" title="close" />
          ) : (
            <AlignLeft className="text-blue-500 font-bold" title="open" />
          )}
          <span className="sr-only">Show navigation</span>
        </button>

        {/* Sidebar Links */}
        <ul className="flex-1 w-full  ">
          {sidebarLinks.map((link) => (
            <li
              key={link.id}
              className={`flex justify-between items-center h-18 py-2 `}
              onClick={() => {
                setActiveLink(link.id);
              }}
            >
              {/* Compact Sidebar */}
              {!isOpen && (
                <a
                  href={link.link}
                  title={link.name}
                  className={`transition hover:bg-gray-300/20 flex ml-auto h-10 w-10 px-2 py-2 justify-center items-center rounded-lg  ${
                    activeLink === link.id ? "bg-gray-300/10" : ""
                  }`}
                >
                  <span className=" text-lg ">{link.icon}</span>
                </a>
              )}
              {/* Expanded Sidebar */}
              {isOpen && (
                <a
                  href={link.link}
                  className={`flex items-center gap-4 transition hover:bg-gray-300/20 w-52 py-3 px-2 rounded-lg  ${
                    activeLink === link.id ? "bg-gray-300/10" : ""
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
