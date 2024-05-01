import { useContext, useRef, useState } from "react";
import { Context } from "../../utilis/context";
import axios from "axios";

import { addToFirestore } from "../../utilis/firebaseFunctions";

import { ToastContainer, toast } from "react-toastify";

import { generateCustomId } from "../../utilis/functions";

const Modal = () => {
  const { open, setOpen } = useContext(Context);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [selectedInput, setSelectedInput] = useState("");
  const [locationName, setLocationName] = useState("");
  const [cost, setCost] = useState("");

  const ulElement = useRef();

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
    ulElement.current.style.display = "block";
  }

  // Update the state to close the dropdown after selecting a location
  const handleLocationSelect = (result) => {
    setSelectedInput(result);
    setSearchInput(result.display_name);
    ulElement.current.style.display = "none";
  };

  const onSubmit = async () => {
    if (locationName === "" || selectedInput === "") {
      toast.error("Please fill in required fields");
    } else {
      let locationId = generateCustomId("LCTN", 5);

      const locationData = {
        name: locationName.toLowerCase(),
        address: selectedInput.display_name,
        lon: selectedInput.lon,
        lat: selectedInput.lat,
        cost: cost,
        id: locationId,
      };

      // Add the users name to Firestore
      await addToFirestore("location", locationData);


      setOpen(!open);

      toast.success(
        "Location added!"
      );

      setLocationName("");
      setSearchInput("");
      setCost("");
    }
  };
  return (
    <div
      className={`min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4 bg-modaltransparent h-[100vh] w-[100vw] absolute top-0 z-10 right-0 ease-in-out delay-75 ${
        open ? "grid" : "hidden"
      }`}
    >
      <div
        className="sm:max-w-lg row-start-2 w-full lg:ml-72 min-w-0 rounded-t-3xl bg-white p-[--gutter] shadow-lg ring-1 ring-grey [--gutter:theme(spacing.8)] sm:mb-auto sm:rounded-2xl dark:ring-white/10 forced-colors:outline"
        id="headlessui-dialog-panel-:r8:"
        data-headlessui-state="open"
        data-open=""
      >
        <h2
          className="text-balance text-lg font-semibold text-black sm:text-base dark:text-white"
          id="headlessui-dialog-title-:r9:"
          data-headlessui-state="open"
          data-open=""
        >
          Create New Location
        </h2>
        <p
          id="headlessui-description-:ra:"
          data-headlessui-state="open"
          data-open=""
          data-slot="text"
          className="mt-2 text-pretty text-base text-black sm:text-sm"
        >
          Create a new location by filling in the input boxes and clicking the  <strong>Save</strong>  button
        </p>
        <div className="mt-6 flex flex-col gap-y-4">
          <div
            className="[&amp;>[data-slot=label]+[data-slot=control]]:mt-3 [&amp;>[data-slot=label]+[data-slot=description]]:mt-1 [&amp;>[data-slot=description]+[data-slot=control]]:mt-3 [&amp;>[data-slot=control]+[data-slot=description]]:mt-3 [&amp;>[data-slot=control]+[data-slot=error]]:mt-3 [&amp;>[data-slot=label]]:font-medium flex flex-col gap-y-2"
            data-headlessui-state=""
          >
            <label
              data-slot="label"
              className="select-none text-base text-black data-[disabled]:opacity-50 sm:text-sm "
              id="headlessui-label-:rc:"
              htmlFor="headlessui-control-:rb:"
              data-headlessui-state=""
            >
              Enter Location Name
            </label>
            <span
              data-slot="control"
              className="relative block w-full before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)]  before:shadow dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent"
            >
              <input
                className="relative block w-full h-10 appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base text-black placeholder:text-grey sm:text-sm border border-grey  bg-transparent focus:outline-none"
                data-headlessui-state="autofocus"
                data-autofocus=""
                placeholder="Enter location name"
                name="name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
            </span>
            <div className="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px; display: none;"></div>
          </div>
          <div className="[&amp;>[data-slot=label]+[data-slot=control]]:mt-3 [&amp;>[data-slot=label]+[data-slot=description]]:mt-1 [&amp;>[data-slot=description]+[data-slot=control]]:mt-3 [&amp;>[data-slot=control]+[data-slot=description]]:mt-3 [&amp;>[data-slot=control]+[data-slot=error]]:mt-3 [&amp;>[data-slot=label]]:font-medium flex flex-col gap-y-2">
            <label
              data-slot="label"
              className="select-none text-base text-black data-[disabled]:opacity-50 sm:text-sm "
              id="headlessui-label-:rc:"
              htmlFor="headlessui-control-:rb:"
            >
              Enter Location Address
            </label>
            <>
              <div
                data-slot="control"
                className="relative block w-full before:absolute before:inset-px  before:shadow dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent"
              >
                <input
                  className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base text-black placeholder:text-grey h-10 sm:text-sm  border border-grey  bg-transparent focus:outline-none"
                  placeholder="Enter an address"
                  id="headlessui-control-:rb:"
                  data-headlessui-state="autofocus"
                  name="address"
                  type="text"
                  value={searchInput}
                  onChange={handleInputChange}
                />
              </div>
              {/* search bar */}
              <div className="position: absolute; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px; display: none;">
                {searchResults.length > 0 && (
                  <ul
                    className="absolute z-10 mt-1 max-h-56 w-[28rem] overflow-scroll h-36  rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-option-3"
                    ref={ulElement}
                  >
                    {searchResults.map((result, index) => (
                      <li
                        className="text-gray-900 border-b-[1px] cursor-pointer hover:bg-blue hover:text-white hover:font-medium border-liltransparent relative text-ellipsis overflow-hidden select-none py-2 pl-3 pr-9"
                        id="listbox-option-0"
                        role="option"
                        key={index}
                        onClick={() => handleLocationSelect(result)}
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
          </div>
          <div className="[&amp;>[data-slot=label]+[data-slot=control]]:mt-3 [&amp;>[data-slot=label]+[data-slot=description]]:mt-1 [&amp;>[data-slot=description]+[data-slot=control]]:mt-3 [&amp;>[data-slot=control]+[data-slot=description]]:mt-3 [&amp;>[data-slot=control]+[data-slot=error]]:mt-3 [&amp;>[data-slot=label]]:font-medium flex flex-col gap-y-2">
            <label
              data-slot="label"
              className="select-none text-base text-black data-[disabled]:opacity-50 sm:text-sm"
              htmlFor="headlessui-control-:rb:"
            >
              Clearing Cost
            </label>
            <span
              data-slot="control"
              className="relative block w-full before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:shadow dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent"
            >
              <input
                className="relative block w-full h-10 appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base text-black placeholder:text-grey sm:text-sm border-grey bg-transparent focus:outline-none"
                placeholder="$0.00"
                data-headlessui-state="autofocus"
                name="amount"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </span>
            <div className="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px; display: none;"></div>
          </div>
        </div>
        <div className="mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto">
          <button
            className="cursor-pointer relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[disabled]:opacity-50 [&amp;>[data-slot=icon]]:-mx-0.5 [&amp;>[data-slot=icon]]:my-0.5 [&amp;>[data-slot=icon]]:size-5 [&amp;>[data-slot=icon]]:shrink-0 [&amp;>[data-slot=icon]]:text-[--btn-icon] [&amp;>[data-slot=icon]]:sm:my-1 [&amp;>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] border-transparent text-black data-[active]:bg-black bg-white hover:bg-liltransparent"
            type="button"
            onClick={() => setOpen(!open)}
          >
            Cancel
            <span
              className="absolute  left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
              aria-hidden="true"
            ></span>
          </button>
          <button
            className="bg-blue text-white  cursor-pointer relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[disabled]:opacity-50 [&amp;>[data-slot=icon]]:-mx-0.5 [&amp;>[data-slot=icon]]:my-0.5 [&amp;>[data-slot=icon]]:size-5 [&amp;>[data-slot=icon]]:shrink-0 [&amp;>[data-slot=icon]]:text-[--btn-icon] [&amp;>[data-slot=icon]]:sm:my-1 [&amp;>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] border-transparent bg-[--btn-border] dark:bg-[--btn-bg] before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg] before:shadow  after:absolute after:inset-0 after:-z-10 "
            type="button"
            onClick={onSubmit}
          >
            Save
            <span
              className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Modal;
