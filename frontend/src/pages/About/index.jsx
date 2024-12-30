import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const About = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`relative top-16 flex items-center justify-center ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } h-screen`}
    >
      <h1 className="text-4xl">About</h1>
    </div>
  );
};

export default About;
