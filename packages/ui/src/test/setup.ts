import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  // Clean up the DOM after each test
  cleanup();

  // Reset all mocks
  vi.resetAllMocks();

  // Clear any mocked timers
  vi.clearAllTimers();
});
