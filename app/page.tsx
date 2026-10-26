"use client";

import Button from "./components/Button";
import calculate from "./lib/calculator";
import { useState, useEffect, useRef } from "react";

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

const keyNames: Record<string, string> = {
  "+": "plus",
  "-": "minus",
  x: "multiply",
  "/": "divide",
  DEL: "delete",
  RESET: "reset",
  "=": "equals",
};

const operators = ["+", "-", "x", "/"];

export default function Home() {
  const [expression, setExpression] = useState("0");
  const [justCalculated, setJustCalculated] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const displayRef = useRef<HTMLDivElement>(null);

  // Keep the newest characters visible
  useEffect(() => {
    const display = displayRef.current;

    if (display) {
      display.scrollLeft = display.scrollWidth;
    }
  }, [expression]);

  function handleInput(value: string) {
    const isOperator = operators.includes(value);

    setAnnouncement("");

    setExpression((prev) => {
      // Recover from an error
      if (prev === "Error") {
        if (isOperator && value !== "-") return "0";
        return value === "." ? "0." : value;
      }

      // After =, numbers start fresh; operators continue
      if (justCalculated && !isOperator) {
        return value === "." ? "0." : value;
      }

      const lastChar = prev.at(-1) ?? "";

      // Handle operators
      if (isOperator) {
        // Allow negative numbers after multiplication or division
        if (value === "-" && (lastChar === "x" || lastChar === "/")) {
          return prev + value;
        }

        // Protect negative numbers like 3x-3
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

        if (currentNumber.includes(".")) return prev;

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
    setAnnouncement("");

    setExpression((prev) => {
      if (prev === "Error") return "0";
      return prev.slice(0, -1) || "0";
    });

    setJustCalculated(false);
  }

  function handleReset() {
    setExpression("0");
    setJustCalculated(false);
    setAnnouncement("");
  }

  function handleEquals() {
    const calculation = expression.replaceAll("x", "*");

    const validExpression = /^-?\d+(?:\.\d+)?(?:[+\-*/]-?\d+(?:\.\d+)?)*$/.test(
      calculation,
    );

    if (!validExpression) {
      setExpression("Error");
      setJustCalculated(false);
      setAnnouncement("Invalid expression");
      return;
    }

    try {
      const result = calculate(calculation);

      if (typeof result !== "number" || !Number.isFinite(result)) {
        setExpression("Error");
        setJustCalculated(false);
        setAnnouncement("Calculation error");
        return;
      }

      const rounded = Number(result.toPrecision(12));
      const formatted = String(rounded);

      setExpression(formatted);
      setJustCalculated(true);
      setAnnouncement(`Result: ${formatted}`);
    } catch {
      setExpression("Error");
      setJustCalculated(false);
      setAnnouncement("Calculation error");
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
      {/* Display */}
      <div className="flex h-32 w-full items-end justify-end rounded-lg bg-app-screen p-6">
        <div
          ref={displayRef}
          className="w-full overflow-x-auto whitespace-nowrap text-right"
        >
          <output className="block min-w-max text-app-text text-preset-1">
            {expression.replaceAll("/", "÷")}
          </output>
        </div>
      </div>

      {/* Screen reader result announcement */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Keypad */}
      <div className="grid w-full grid-cols-4 gap-2 rounded-lg bg-app-keypad px-2 py-3 md:gap-6 md:p-6">
        {keys.map((key) => {
          const isAccent = key === "=";
          const isSecondary = key === "DEL" || key === "RESET";
          const isWide = key === "RESET" || key === "=";

          return (
            <Button
              key={key}
              type="button"
              variant={
                isAccent ? "accent" : isSecondary ? "secondary" : "default"
              }
              className={isWide ? "col-span-2" : ""}
              aria-label={keyNames[key]}
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
