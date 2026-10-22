"use client";
import { useState, useEffect } from "react";

const themes = [1, 2, 3] as const;
type Theme = (typeof themes)[number];

export default function Header() {
  const [theme, setTheme] = useState<Theme>(1);

  useEffect(() => {
    document.documentElement.dataset.theme = String(theme);
  }, [theme]);

  return (
    <header className="flex flex-col justify-between py-4 text-app-text">
      <div className="flex items-end justify-end gap-3 px-2.5">
        {themes.map((option) => (
          <span
            className="text-preset-6 cursor-pointer"
            key={option}
            onClick={() => setTheme(option)}
          >
            {option}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center gap-1">
        <h1 className="text-preset-3">calc</h1>
        <div className="flex gap-4 items-center">
          <span className="text-preset-6">THEME</span>
          <div className="grid grid-cols-3 gap-1 rounded-full bg-app-keypad p-1">
            {themes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTheme(option)}
                aria-label={`Switch to theme ${option}`}
                aria-pressed={theme === option}
                className="flex size-4 cursor-pointer items-center justify-center"
              >
                <span
                  className={`size-4 rounded-full ${
                    theme === option
                      ? "bg-app-accent hover:bg-app-accent-hover"
                      : ""
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
