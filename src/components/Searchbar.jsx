import React, { useState } from "react";
import axios from "axios";

function Searchbar() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to search for address suggestions using Geocoder API
  async function searchAddressSuggestions(input) {
    if (!input.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${input}&format=json&limit=5`
      );
      if (response.data && response.data.length > 0) {
        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching address:", error);
      setSearchResults([]);
    }
  }

  // Function to handle search input change
  function handleInputChange(event) {
    setSearchInput(event.target.value);
    searchAddressSuggestions(event.target.value);
  }

  return (
    <>
      <div
        data-slot="control"
        className="relative block w-full before:absolute before:inset-px  before:shadow dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent"
      >
        <input
          className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base text-grey placeholder:text-grey h-10 sm:text-sm  border border-grey  bg-transparent focus:outline-none"
          placeholder="Enter an address"
          name="address"
          type="text"
          value={searchInput}
          onChange={handleInputChange}
        />
      </div>
      <div className="position: absolute; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px; display: none;">
        {searchResults.length > 0 && (
          <ul
            className="absolute z-10 mt-1 max-h-56 w-[28rem] overflow-scroll h-36  rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {searchResults.map((result, index) => (
              <li
                className="text-gray-900 border-b-[1px] cursor-pointer hover:bg-blue hover:text-white hover:font-medium border-liltransparent relative text-ellipsis overflow-hidden select-none py-2 pl-3 pr-9"
                id="listbox-option-0"
                role="option"
                key={index}
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        )}
        {searchResults.length === 0 && searchInput.trim() !== "" && (
          <p className="absolute z-10 mt-1 max-h-56 w-[28rem] overflow-scroll h-10 px-4 flex items-center rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            No results found
          </p>
        )}
      </div>
    </>
  );
}

export default Searchbar;
