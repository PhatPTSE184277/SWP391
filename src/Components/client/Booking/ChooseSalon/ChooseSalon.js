/* eslint-disable react-hooks/exhaustive-deps */
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { CiHome } from "react-icons/ci";
import { PiScissors } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "./ChooseSalon.scss";
// import { salonLocations } from "../../../../data/booking";
import api from "../../../../config/axios";

export default function ChooseSalon() {
  const [searchValue, setSearchValue] = useState("");
  const [salonLocations, setSalonLocations] = useState([]);
  // const [searchResults, setSearchResults] = useState(salonLocations);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    const fetchSalonLocations = async () => {
       try {
        const response = await api.get("salon");
        if (response.data /*&& response.data.result*/) {
          setSalonLocations(response.data/*.result*/);
        }
       } catch (error) {
        
       }
    };
    fetchSalonLocations();
  }, []);

  useEffect(() => {
    const storedBranchId = sessionStorage.getItem("selectedBranchId");
    if (storedBranchId) {
      const branchId = parseInt(storedBranchId, 10);
      const branch = salonLocations.find((b) => b.id === branchId);
      if (branch) {
        setSelectedBranch(branch);
      }
    }
  }, [salonLocations]);


  // useEffect(() => {

  //   if (!searchValue.trim()) {
  //     setSearchResults(salonLocations);
  //     return;
  //   }

  //   const fetchSalons = async () => {
  //     try {
  //       const response = await api.get(`users/search`, {
  //         params: {
  //           q: searchValue,
  //           type: "less",
  //         },
  //       });
  //       if (response.data && response.data.result) {
  //         setSearchResults(response.data.result);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching salons:", error);
  //     }
  //   };

  //   fetchSalons();
  // }, [searchValue]);

  const handleClearSearch = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
  };

  const isSelectedBranch = !!sessionStorage.getItem("selectedBranchId");
  const isSelectedStylist = !!sessionStorage.getItem("selectedStylistId");
  const isSelectedServices = !!sessionStorage.getItem("selectedServicesId");

  return (
    <div className="chooseSalon">
      <div className="chooseSalon__tagNavigation">
        <ul className="chooseSalon__tagNavigation--item">
          <li className="chooseSalon__tagNavigation--item-content active">
            <Link to="/booking/step1" aria-label="Select Salon">
              <div className="filled"></div>
              <CiHome />
            </Link>
            <div className="tooltip">Salon</div>
          </li>
          <li className={`chooseSalon__tagNavigation--item-content ${isSelectedBranch ? '' : 'disable'}`}>
            <Link to={isSelectedBranch ? "/booking/step2" : "/booking/step1"} aria-label="Select Service">
              <div className="filled"></div>
              <PiScissors />
            </Link>
            <div className="tooltip">Service</div>
          </li>
          <li className={`chooseSalon__tagNavigation--item-content ${isSelectedServices ? '' : 'disable'}`}>
            <Link to={isSelectedServices ? "/booking/step3" : "/booking/step1"} aria-label="Select Stylist">
              <div className="filled"></div>
              <SlPeople />
            </Link>
            <div className="tooltip">Stylist</div>
          </li>
          <li className={`chooseSalon__tagNavigation--item-content ${isSelectedStylist ? '' : 'disable'}`}>
            <Link to={isSelectedStylist ? "/booking/step4" : "/booking/step1"} aria-label="Select Time">
              <div className="filled"></div>
              <RiCalendarScheduleLine />
            </Link>
            <div className="tooltip">Time</div>
          </li>
          
        </ul>
      </div>

      <div className="chooseSalon__container">
        <div className="chooseSalon__container-header">
          <Link to="/" aria-label="Back to Booking">
            <FaArrowLeft className="chooseSalon-icon" />
          </Link>
          <h1>Choose Salon</h1>
        </div>
        <div className="chooseSalon__container-search">
          <IoSearchOutline className="chooseSalon-icon" />
          <input
            ref={inputRef}
            placeholder="Search for salons by address..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <IoCloseCircle
            className="chooseSalon-closeIcon"
            onClick={handleClearSearch}
            aria-label="Clear search"
          />
        </div>

        <div className="chooseSalon__container-locations">
          F-salon is available in the following:
        </div>
        <div className="chooseSalon__container-lists">
          {salonLocations.map((branch) => (
            <div
              onClick={() => handleBranchSelect(branch)}
              className={`chooseSalon__container-single ${selectedBranch && selectedBranch.id === branch.id ? "selected" : ""}`}
              key={branch.id}
              aria-label={`Select ${branch.address}`}
            >
              {branch.address}
            </div>
          ))}
        </div>
        <Link
          to="/booking/step2"
          className={`chooseSalon__container-btn btn flex ${!!selectedBranch ? "" : "btn-disable"}`}
          onClick={(e) => {
            if (!selectedBranch) {
              e.preventDefault();
            } else {
              sessionStorage.setItem("selectedBranchId", selectedBranch.id);
            }
          }}
        >
          Next Step
          <FaArrowRight className="chooseService-icon" />
        </Link>
      </div>
    </div>
  );
}
