import "./ManagerService.scss";
import { React } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { HiTrash } from "react-icons/hi2";
import { FaUserEdit } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import services from "../../../data/service";
import { useNavigate } from "react-router-dom";
export default function ManagerService() {
  const navigate = useNavigate();
  const createService = () => {
    navigate("/manager/service/create");
  };

  return (
    <div class="ManagerService">
      <div className="ManagerService__header">
        <div class="ManagerService__header-searchBar">
          <BiSearchAlt className="searchBar-icon" />
          {/* <i class="fas fa-search"></i> */}
          <input placeholder="Search here..." type="text" />
        </div>
        <div class="ManagerService__header-filter">
          <select>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
          <button onClick={createService}> + New Service</button>
        </div>
      </div>
      <div className="service">
        {(services || []).map((service) => (
          <div key={service.id} class="service__card">
            <img alt="Service Img" src={service.image} />
            <div class="service__card-info">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              {/* <div class="service__outcome">
                <div class="service__outcome-rating">
                  <p>Rating</p>
                  <p>
                    <FaStar />
                    {service.rating}
                  </p>
                </div>
                <div class="service__outcome-order">
                  <p>{service.totalOrder}</p>
                  <p>Total Order</p>
                </div>
                <div class="service__outcome-interest">
                  <p>
                    {service.interest}
                    <br />
                    Interest
                  </p>
                </div>
              </div> */}
              <div class="service-actions">
                <button class="delete btn">
                  <HiTrash />
                </button>
                <button class="update btn">
                  <FaUserEdit />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div class="ManagerService__pagination">
        <p>Showing 1-6 from {services.length} data</p>
        <div class="ManagerService__pagination-pages">
          <span>
            <FaAngleLeft className="pagination-icon" />
          </span>
          <span class="active">1</span>
          <span>2</span>
          <span>3</span>
          <span>
            <FaChevronRight className="pagination-icon" />
          </span>
        </div>
      </div>
    </div>
  );
}