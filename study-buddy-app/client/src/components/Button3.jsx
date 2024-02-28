const Button = ({
  type = "button",
  onClick,
  align = "",
  width = "w-15",
  height = "h-7",
  padding = "px-4 py-2",
  children,
  ...rest
}) => {
  return (
    <button
      className={`${align} ${width} ${height} ${padding}  mb-1 mr-1 flex justify-center items-center text-sm text-white bg-blue-800 border-2 border-black rounded-lg  hover:bg-blue-300`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;