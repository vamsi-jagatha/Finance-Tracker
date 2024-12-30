import { RxArrowTopRight } from "react-icons/rx";
import { financeTrackerTasks } from "../../data";
import { SignInButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Home = () => {
  const { user } = useUser();
  const { theme } = useContext(ThemeContext);

  return (
    <main
      className={`flex items-center flex-col md:flex-row ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } justify-around min-h-[100vh]`}
    >
      {/* Left Section */}
      <section className="w-full md:min-w-[60vw] h-full md:h-[80vh] p-8 md:p-14 order-2 md:order-1">
        <header>
          <h1 className="font-ragnear font-medium text-6xl md:text-7xl lg:text-8xl md:leading-snug">
            Take Control of Your <span className="text-blue-500">Finances</span>{" "}
            Today
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Track expenses, set budgets, and achieve your financial goals with
            ease.
          </p>
        </header>
        <div className="mt-5 md:mt-14">
          <SignInButton mode="modal">
            <Link to={user ? "/dashboard" : "/"}>
              <button className="flex justify-around items-center font-ragnear md:text-2xl border-2 bg-yellow-500 hover:bg-yellow-600 uppercase border-black px-3 py-1 md:px-6 md:py-2 rounded-full">
                {user ? "Go to Dashboard" : "Get Started"}
                <span className="md:text-xl ml-3">
                  <RxArrowTopRight />
                </span>
              </button>
            </Link>
          </SignInButton>
        </div>
        <div className="relative flex overflow-x-hidden mt-12">
          <div className="py-12 animate-marquee whitespace-nowrap">
            {financeTrackerTasks.tasks.map((task, index) => (
              <span
                className={`mr-16 rounded-lg border-2 px-10 py-2 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 text-lg font-mono uppercase ${
                  theme === "dark"
                    ? "text-white border-gray-100"
                    : "text-black border-gray-700"
                }`}
                key={index}
              >
                {task.name} {task.icon}
              </span>
            ))}
          </div>
          <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
            {financeTrackerTasks.tasks.map((task, index) => (
              <span
                className={`mr-16 rounded-lg border-2 px-10 py-2 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 text-lg font-mono uppercase ${
                  theme === "dark"
                    ? "text-white border-gray-100"
                    : "text-black border-gray-700"
                }`}
                key={index}
              >
                {task.name} {task.icon}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* Right Section */}
      <aside className="flex justify-center items-center w-full md:min-w-[38vw] h-80 md:h-[80vh] bg-transparent order-1 md:order-2">
        <img
          src=""
          alt="Finance Tracker"
          className="h-[45vh] mt-10 md:mt-0 md:h-[80vh]"
        />
      </aside>
    </main>
  );
};

export default Home;
