import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../app/components/Header";

afterEach(() => {
  cleanup();
  delete document.documentElement.dataset.theme;
});

describe("Theme switcher", () => {
  it("defaults to Theme 1", async () => {
    render(<Header />);

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe("1");
    });
  });

  it("switches to Theme 2", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("radio", { name: "Theme 2" }));

    expect(document.documentElement.dataset.theme).toBe("2");
  });

  it("switches to Theme 3", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("radio", { name: "Theme 3" }));

    expect(document.documentElement.dataset.theme).toBe("3");
  });
});
