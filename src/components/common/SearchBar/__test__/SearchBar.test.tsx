import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  test("renders search input", () => {
    const setSearchTerm = jest.fn();
    render(<SearchBar searchTerm="" setSearchTerm={setSearchTerm} />);
    const searchInput = screen.getByPlaceholderText("Search by name...");
    expect(searchInput).toBeInTheDocument();
  });

  test("displays the correct search term", () => {
    const setSearchTerm = jest.fn();
    render(
      <SearchBar searchTerm="Test University" setSearchTerm={setSearchTerm} />
    );
    const searchInput = screen.getByPlaceholderText(
      "Search by name..."
    ) as HTMLInputElement;
    expect(searchInput.value).toBe("Test University");
  });

  test("calls setSearchTerm when input changes", () => {
    const setSearchTerm = jest.fn();
    render(<SearchBar searchTerm="" setSearchTerm={setSearchTerm} />);
    const searchInput = screen.getByPlaceholderText("Search by name...");
    fireEvent.change(searchInput, { target: { value: "New Search" } });
    expect(setSearchTerm).toHaveBeenCalledWith("New Search");
  });

  test("has correct CSS class", () => {
    const setSearchTerm = jest.fn();
    render(<SearchBar searchTerm="" setSearchTerm={setSearchTerm} />);
    const searchInput = screen.getByPlaceholderText("Search by name...");
    expect(searchInput).toHaveClass("search-bar");
  });
});
