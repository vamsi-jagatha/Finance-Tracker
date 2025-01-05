import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Dropdown = ({ handleSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState({});
  const [selectedField, setSelectedField] = useState("date");
  const { theme } = useContext(ThemeContext);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFieldClick = (field) => {
    const isAscOrder = !sortOrder[field];
    setSortOrder({ [field]: isAscOrder });
    setSelectedField(field);
    setIsOpen(false);
    handleSort(field, isAscOrder);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold  shadow-sm border border-gray-600/50 hover:bg-gray-700/40 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        Sort By
        <ChevronDown size={18} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md border border-gray-600/50 ${
            theme === "dark" ? "bg-black" : "bg-white"
          }   shadow-lg`}
          role="menu"
          aria-orientation="vertical"
        >
          <div>
            {["Date", "Amount", "Title"].map((field) => {
              const fieldKey = field.toLowerCase();
              const isSelected = selectedField === fieldKey;
              const isAscOrder = sortOrder[fieldKey];

              return (
                <div
                  key={fieldKey}
                  className={`flex justify-between items-center px-4 py-2 text-sm cursor-pointer  rounded-md
                   ${
                     isSelected
                       ? `${
                           theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"
                         }`
                       : `${theme === "dark" ? "text-white" : "text-gray-900"}`
                   }`}
                  role="menuitem"
                  onClick={() => handleFieldClick(fieldKey)}
                >
                  {field}
                  <ArrowUpDown
                    strokeWidth={1.5}
                    className={
                      isSelected
                        ? isAscOrder
                          ? "text-green-500"
                          : "text-red-500"
                        : "text-gray-400"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
