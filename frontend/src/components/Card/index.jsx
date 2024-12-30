const Card = ({ amount, icon, title, bgColor, iconColor }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center min-w-fit min-h-40 shadow-xl ${bgColor} p-4 md:p-6 lg:p-8 border rounded-3xl mb-6`}
    >
      <p
        className={`flex items-center text-lg md:text-xl lg:text-2xl font-semibold text-center`}
      >
        <span className={`mr-2 text-4xl md:text-5xl lg:text-6xl ${iconColor}`}>
          {icon}
        </span>
        {title && <span className="text-white">{title}</span>}
      </p>
      <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2">
        Rs.{amount}
      </p>
    </div>
  );
};

export default Card;
