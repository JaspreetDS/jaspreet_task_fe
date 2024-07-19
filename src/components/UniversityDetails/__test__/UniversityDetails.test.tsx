import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UniversityDetails from "../UniversityDetails";
const mockUniversity = {
  name: "Test University",
  country: "Test Country",
  domains: ["test.edu"],
  web_pages: ["https://test.edu"],
};

describe("UniversityDetails", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders university details when university is found", () => {
    localStorage.setItem("universities", JSON.stringify([mockUniversity]));

    render(
      <MemoryRouter initialEntries={["/university/Test University"]}>
        <Routes>
          <Route path="/university/:name" element={<UniversityDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("University Details")).toBeInTheDocument();
    expect(screen.getByText("Test University")).toBeInTheDocument();
    expect(screen.getByText("Test Country")).toBeInTheDocument();
    expect(screen.getByText("test.edu")).toBeInTheDocument();
    expect(screen.getByText("Visit Website")).toBeInTheDocument();
  });

  test('renders "University not found" when university is not found', () => {
    render(
      <MemoryRouter initialEntries={["/university/Nonexistent University"]}>
        <Routes>
          <Route path="/university/:name" element={<UniversityDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("University not found")).toBeInTheDocument();
    expect(
      screen.getByText("Please try searching for a different university.")
    ).toBeInTheDocument();
  });

  test('displays "N/A" for missing domain and website', () => {
    const universityWithMissingData = {
      ...mockUniversity,
      domains: [],
      web_pages: [],
    };
    localStorage.setItem(
      "universities",
      JSON.stringify([universityWithMissingData])
    );

    render(
      <MemoryRouter initialEntries={["/university/Test University"]}>
        <Routes>
          <Route path="/university/:name" element={<UniversityDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getAllByText("N/A")).toHaveLength(2);
  });
});
