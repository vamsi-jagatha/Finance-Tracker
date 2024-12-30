import { useContext, useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { ThemeContext } from "./context/ThemeContext";
import { Oval } from "react-loader-spinner";

const ThemedContainer = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`flex justify-center flex-col gap-6 items-center h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {children}
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false);
    }
  }, [isLoaded]);

  if (isLoading) {
    return (
      <ThemedContainer>
        <Oval
          visible={true}
          strokeWidth="4"
          secondaryColor="gray"
          height="35"
          width="35"
          color="blue"
          ariaLabel="oval-loading"
        />
        <span className="sr-only">Loading...</span>
      </ThemedContainer>
    );
  }

  if (!user) {
    return (
      <ThemedContainer>
        <h1 className="text-3xl">Please sign in to continue</h1>
        <SignInButton mode="modal">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Sign In
          </button>
        </SignInButton>
      </ThemedContainer>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
