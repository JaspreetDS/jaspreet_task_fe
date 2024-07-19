import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UniversityModal from "../../models/University";
import "./details.css";

const UniversityDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [university, setUniversity] = useState<UniversityModal | null>(null);

  useEffect(() => {
    const universitiesData = localStorage.getItem("universities");
    if (universitiesData) {
      const universities: UniversityModal[] = JSON.parse(universitiesData);
      const foundUniversity = universities.find((uni) => uni.name === name);
      if (foundUniversity) {
        setUniversity(foundUniversity);
      }
    }
  }, [name]);

  return (
    <div className="university-details-container">
      <h1 className="university-details-title">University Details</h1>
      {university ? (
        <div className="university-details-card">
          <h2 className="university-details-name">{university.name}</h2>
          <div className="university-details-info">
            <p>
              <strong>Country:</strong> {university.country}
            </p>
            <p>
              <strong>Domain:</strong>{" "}
              {university.domains && university.domains.length > 0
                ? university.domains[0]
                : "N/A"}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              {university.web_pages && university.web_pages.length > 0 ? (
                <a
                  href={university.web_pages[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="university-details-link"
                >
                  Visit Website
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div>
        </div>
      ) : (
        <div className="university-details-not-found">
          <h2>University not found</h2>
          <p>Please try searching for a different university.</p>
        </div>
      )}
    </div>
  );
};

export default UniversityDetails;
