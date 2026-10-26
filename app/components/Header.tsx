"use client";

import { useState, useEffect, useId } from "react";

const themes = [1, 2, 3] as const;
type Theme = (typeof themes)[number];

export default function Header() {
  const [theme, setTheme] = useState<Theme>(1);
  const themeLabelId = useId();

  useEffect(() => {
    document.documentElement.dataset.theme = String(theme);
  }, [theme]);

  return (
    <header className="flex items-center justify-between py-4 text-app-text">
      <h1 className="text-preset-3">calc</h1>

      <div className="flex items-end gap-4">
        <span id={themeLabelId} className="text-preset-6 mb-1">
          THEME
        </span>

        <div className="flex flex-col gap-1">
          {/* Visual labels */}
          <div aria-hidden="true" className="grid grid-cols-3 text-center">
            {themes.map((option) => (
              <span key={option} className="text-preset-6">
                {option}
              </span>
            ))}
          </div>

          {/* Accessible theme switcher */}
          <div
            role="radiogroup"
            aria-labelledby={themeLabelId}
            className="grid grid-cols-3 gap-1 rounded-full bg-app-keypad p-1"
          >
            {themes.map((option) => (
              <label
                key={option}
                className="grid size-6 cursor-pointer place-items-center"
              >
                <input
                  type="radio"
                  name="calculator-theme"
                  value={option}
                  checked={theme === option}
                  onChange={() => setTheme(option)}
                  aria-label={`Theme ${option}`}
                  className="peer sr-only"
                />

                <span
                  aria-hidden="true"
                  className={`
                    size-4 rounded-full
                    peer-checked:bg-app-accent
                    peer-checked:hover:bg-app-accent-hover
                    peer-focus-visible:outline-2
                    peer-focus-visible:outline-offset-2
                    peer-focus-visible:outline-app-text
                  `}
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
