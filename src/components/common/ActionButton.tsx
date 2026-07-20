type ActionButtonProps = {
  title: string;
  variant: "success" | "danger" | "primary";
  onClick?: () => void;
};

const buttonVariants = {
  success:
    "bg-green-600 hover:bg-green-700",

  danger:
    "bg-red-600 hover:bg-red-700",

  primary:
    "bg-blue-600 hover:bg-blue-700",
};

function ActionButton({
  title,
  variant,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-lg
        px-6
        py-3
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:scale-105
        ${buttonVariants[variant]}
      `}
    >
      {title}
    </button>
  );
}

export default ActionButton;