import React from "react";
import "./sorting.css";

interface SortingDropdownProps {
  onChange: (value: string) => void;
}

const SortingDropdown: React.FC<SortingDropdownProps> = ({ onChange }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <select onChange={handleSortChange} className="sorting-dropdown">
      <option value="">Select Sorting Option</option>
      <option value="asc">A to Z</option>
      <option value="desc">Z to A</option>
    </select>
  );
};

export default SortingDropdown;
