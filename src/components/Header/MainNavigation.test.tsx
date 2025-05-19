import React from "react";
import { render, screen } from "@testing-library/react";
import MainNavigation from "./MainNavigation";
import { Provider } from "react-redux";
import store from "../../store";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("MainNavigation", () => {
  it("renders the Dashboard text", () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <MainNavigation />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    const dashboardHeading = screen.getByRole("heading", { name: "Dashboard" });
    expect(dashboardHeading).toBeInTheDocument();
  });

  it("renders the Posts and Dashboard NavLinks", () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <MainNavigation />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    const postsLinks = screen.getAllByRole("link", { name: "Posts" });
    const dashboardLinks = screen.getAllByRole("link", { name: "Dashboard" });

    const postsLink = postsLinks.find(
      (link) => link.getAttribute("href") === "/"
    );
    const dashboardLink = dashboardLinks.find(
      (link) => link.getAttribute("href") === "/dashboard"
    );

    expect(postsLink).toBeInTheDocument();
    expect(dashboardLink).toBeInTheDocument();
  });
});
