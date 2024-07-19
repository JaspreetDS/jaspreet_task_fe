import React, { useState, useEffect } from "react";
import UniversityModal from "../../models/University";
import UniversityController from "./UniversityController";
import SearchBar from "../common/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import SortingDropdown from "../common/SortDropDown/SortDropDown";
import "./listing.css";

const UniversityListing: React.FC = () => {
  const [universities, setUniversities] = useState<UniversityModal[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUniversities, setFilteredUniversities] = useState<
    UniversityModal[]
  >([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UniversityController.fetchUniversities();
        setUniversities(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = universities.filter((university) =>
      university.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredUniversities(sorted);
  }, [searchTerm, universities, sortOrder]);

  const handleSort = (value: string) => {
    setSortOrder(value);
  };

  const handleDelete = (name: string) => {
    const updatedUniversities = universities.filter((uni) => uni.name !== name);
    setUniversities(updatedUniversities);
    localStorage.setItem("universities", JSON.stringify(updatedUniversities));
  };

  return (
    <>
      <div className="university-container">
        <h1 className="university-title">Universities</h1>
        <div className="filter-container">
          <div className="filter-item">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="filter-item">
            <SortingDropdown onChange={handleSort} />
          </div>
        </div>
      </div>
      <div className="university-list">
        {filteredUniversities.map((university) => (
          <div key={university.name} className="university-card">
            <h2>{university.name}</h2>
            <p>Country: {university.country}</p>
            <div className="university-card-buttons">
              <Link
                to={`/university/${university.name}`}
                className="university-card-button view-button"
              >
                View
              </Link>
              <button
                className="university-card-button delete-button"
                onClick={() => handleDelete(university.name)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UniversityListing;
