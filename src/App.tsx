import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UniversityListing from "./components/UniversityListing/UniversityListing";
import UniversityDetails from "./components/UniversityDetails/UniversityDetails";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<UniversityListing />} />
          <Route path="/university/:name" element={<UniversityDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
