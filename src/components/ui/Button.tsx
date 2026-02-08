// Button.tsx
type ButtonVariant = "primary" | "secondary" | "outline";

export const Button = ({
  variant = "primary",
  children,
  ...props
}: {
  variant?: ButtonVariant;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white",
    secondary:
      "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white",
    outline:
      "bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2A2E37]",
  };

  return (
    <button
      className={`${variants[variant]} px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60`}
      {...props}
    >
      {children}
    </button>
  );
};
