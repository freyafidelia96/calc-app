"use client";
import Button from "./components/Button";
import { evaluate } from "mathjs";
import { useState } from "react";

const keys = [
  "7",
  "8",
  "9",
  "DEL",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "-",
  ".",
  "0",
  "/",
  "x",
  "RESET",
  "=",
];

const operators = ["+", "-", "x", "/"];

export default function Home() {
  const [expression, setExpression] = useState("0");
  const [justCalculated, setJustCalculated] = useState(false);

  function handleInput(value: string) {
    const isOperator = operators.includes(value);

    setExpression((prev) => {
      // Recover from an error
      if (prev === "Error") {
        if (isOperator && value !== "-") return "0";
        return value === "." ? "0." : value;
      }

      // After =, numbers start fresh; operators continue
      if (justCalculated) {
        if (!isOperator) {
          return value === "." ? "0." : value;
        }
      }

      const lastChar = prev.at(-1) ?? "";

      // Handle operators
      if (isOperator) {
        // Allow negative numbers after multiplication or division
        if (value === "-" && (lastChar === "x" || lastChar === "/")) {
          return prev + value;
        }

        // Prevent replacing the minus sign in expressions like 3x-
        if (
          lastChar === "-" &&
          prev.length >= 2 &&
          ["x", "/"].includes(prev.at(-2)!)
        ) {
          return prev;
        }

        // Replace consecutive operators
        if (operators.includes(lastChar)) {
          return prev.slice(0, -1) + value;
        }

        if (lastChar === ".") return prev;

        return prev + value;
      }

      // Handle decimal points
      if (value === ".") {
        const currentNumber = prev.split(/[+\-x/]/).pop() ?? "";

        // Prevent multiple decimal points in one number
        if (currentNumber.includes(".")) return prev;

        // Automatically insert zero after an operator
        if (operators.includes(lastChar)) {
          return prev + "0.";
        }

        return prev === "0" ? "0." : prev + ".";
      }

      // Replace initial zero
      if (prev === "0") return value;

      return prev + value;
    });

    setJustCalculated(false);
  }

  function handleDelete() {
    setExpression((prev) => {
      if (prev === "Error") return "0";
      return prev.slice(0, -1) || "0";
    });

    setJustCalculated(false);
  }

  function handleReset() {
    setExpression("0");
    setJustCalculated(false);
  }

  function handleEquals() {
    const calculation = expression.replaceAll("x", "*");

    // Allow only supported arithmetic expressions
    const validExpression = /^-?\d+(?:\.\d+)?(?:[+\-*/]-?\d+(?:\.\d+)?)*$/.test(
      calculation,
    );

    if (!validExpression) {
      setExpression("Error");
      setJustCalculated(false);
      return;
    }

    try {
      const result = evaluate(calculation);

      if (typeof result !== "number" || !Number.isFinite(result)) {
        setExpression("Error");
        setJustCalculated(false);
        return;
      }

      // Remove common floating-point artifacts
      const rounded = Number(result.toPrecision(12));

      setExpression(String(rounded));
      setJustCalculated(true);
    } catch {
      setExpression("Error");
      setJustCalculated(false);
    }
  }

  function handleButtonClick(value: string) {
    switch (value) {
      case "=":
        handleEquals();
        break;
      case "DEL":
        handleDelete();
        break;
      case "RESET":
        handleReset();
        break;
      default:
        handleInput(value);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="h-32 w-full bg-app-screen rounded-lg p-6 flex items-end justify-end overflow-hidden">
        <span className="text-app-text text-preset-1 max-w-full overflow-x-auto whitespace-nowrap">
          {expression.replaceAll("/", "÷")}
        </span>
      </div>
      <div className="h-120 w-full bg-app-keypad rounded-lg md:p-6 px-2 py-3 grid grid-cols-4 md:gap-6 gap-2">
        {keys.map((key) => {
          const isAccent = key === "=";
          const isSecondary = key === "DEL" || key === "RESET";
          const isWide = key === "RESET" || key === "=";
          return (
            <Button
              key={key}
              variant={
                isAccent ? "accent" : isSecondary ? "secondary" : "default"
              }
              className={isWide ? "col-span-2" : ""}
              onClick={() => handleButtonClick(key)}
            >
              {key}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
