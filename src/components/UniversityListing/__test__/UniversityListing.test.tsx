import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import UniversityListing from "../UniversityListing";

jest.mock("../UniversityController", () => ({
  fetchUniversities: jest.fn(),
}));

describe("ListingPage Component", () => {
  it("renders without crashing", () => {
    render(<UniversityListing />);
  });

  test("should delete a university when delete button is clicked", async () => {
    // Mock data for universities
    const universities = [
      { name: "University 1", country: "Country 1" },
      { name: "University 2", country: "Country 2" },
    ];

    const localStorageMock = jest.spyOn(
      window.localStorage.__proto__,
      "setItem"
    );
    screen.logTestingPlaygroundURL();
  });

  it("testing correct title of university list", () => {
    render(<UniversityListing />);
    const title = screen.getByRole("heading", {
      name: /universities/i,
    });
    expect(title).toBeInTheDocument();
  });
});

it("testing testbox to be in document ", () => {
  render(<UniversityListing />);
  const title = screen.getByRole("textbox");
  expect(title).toBeInTheDocument();
});

it("testing dropdown  to be in document ", () => {
  render(<UniversityListing />);
  const title = screen.getByRole("combobox");
  expect(title).toBeInTheDocument();
});
