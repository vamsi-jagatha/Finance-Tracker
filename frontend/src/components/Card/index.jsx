import CountUp from "react-countup";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Card = ({
  amount,
  icon,
  title,
  bgColorLight,
  bgColorDark,
  iconColor,
}) => {
  const isValidAmount = !isNaN(amount);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`flex items-center  shadow-xl ${
        theme === "dark" ? bgColorLight : bgColorDark
      } border rounded-3xl mb-6 p-4 md:w-1/2 lg:w-1/3`}
    >
      <span className={`mr-2 text-3xl md:text-4xl lg:text-5xl ${iconColor}`}>
        {icon}
      </span>
      <div className="text-xl md:text-xl lg:text-2xl font-bold text-white mt-2">
        <div className={`text-lg md:text-xl lg:text-2xl font-semibold`}>
          {title && <span className="text-white text-lg">{title}</span>}
        </div>
        Rs.
        {isValidAmount && (
          <CountUp
            key={amount} // Ensure CountUp resets on amount change
            start={0}
            end={amount}
            duration={2.5}
            delay={0.5}
            separator=","
            useEasing={true}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
