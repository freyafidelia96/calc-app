import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "default" | "secondary" | "accent";

interface CalculatorButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  default:
    "bg-app-key hover:bg-app-key-hover text-app-key-text shadow-[inset_0_-4px_0_0_var(--color-key-shadow)]",
  secondary:
    "bg-app-secondary hover:bg-app-secondary-hover text-app-special-text shadow-[inset_0_-4px_0_0_var(--color-secondary-shadow)]",
  accent:
    "bg-app-accent hover:bg-app-accent-hover text-app-accent-text shadow-[inset_0_-4px_0_0_var(--color-accent-shadow)]",
};

export default function Button({
  variant = "default",
  className = "",
  children,
  ...props
}: CalculatorButtonProps) {
  return (
    <button
      type="button"
      className={`${variants[variant]} ${className} flex h-16 items-center justify-center
        rounded-lg cursor-pointer
        text-preset-4`}
      {...props}
    >
      {children}
    </button>
  );
}
