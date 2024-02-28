const Button = ({
  type = "button",
  onClick,
  align = "",
  width = "w-64",
  padding = "px-4 py-2",
  children,
  ...rest
}) => {
  return (
    <button
      className={`${align} ${width}  ${padding} mb-1 mr-1 text-lg font-medium text-black bg-slate-200 border-2 border-black rounded-lg  hover:bg-slate-400`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;