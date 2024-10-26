/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./AdminSlot.scss";
import api from "../../../config/axios";
import { BiSearchAlt } from "react-icons/bi";
import { Spin } from "antd";

const AdminSlot = () => {
  const [slot, setSlot] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeBetween, setTimeBetween] = useState ("");


  const fetchSlots = async () => {
    try {
      const response = await api.get("slot/time/between");
      const data = response.data.result;

      if (data) {
        setSlot(data);
        setTimeBetween(data.timeBetween);
      }
    } catch (error) {}
  };
  useEffect(() => {
   

    fetchSlots();
  }, []);


  const updateSlotData = async (e) => {
    e.preventDefault();
    const updateValues = {
      time: timeBetween,
    };
    setLoading(true);
    try {
      const response = await api.post(
        `slot`,
        updateValues
      );
      const data = response.data.result;
      if (data) {
        fetchSlots();
        toggleModal();
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  function formatTime(time) {
    const [hours, minutes] = time.split(':');
    return `${hours}h${minutes}`;
  }

  function formatDuration(time) {
    const [hours, minutes, seconds] = time.split(':').map(Number);

    let result = '';

    if (hours > 0) {
        result += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
        result += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    }

    if (result === '') {
        return `${seconds} second${seconds > 1 ? 's' : ''}`;
    }

    return result.trim();
}

  const toggleModal = async () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (e) => {
    updateSlotData(e)
  };

  return (
    <>
      <div className="admin-slot">
        <div className="admin-slot__header">
          <div className="admin-slot__header-searchBar">
            <BiSearchAlt className="searchBar-icon" />
            {/* <i class="fas fa-search"></i> */}
            <input placeholder="Search here..." type="text" />
          </div>
        </div>
        <div className="admin-slot__container">
          <div className="admin-slot__content">
            <table className="admin-slot__table">
              <thead>
                <tr>
                  <th>
                    Start
                  </th>
                  <th>
                    End
                  </th>
                  <th>
                    Headway
                  </th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                  <tr>
                    <td className="admin-slot__code"> {slot.timeStart && formatTime(slot.timeStart)}</td>
                    <td>
                      <div className="admin-slot__name">{slot.timeEnd && formatTime(slot.timeEnd)}</div>
                    </td>
                    <td className="admin-slot__date">
                      {slot.timeBetween && formatDuration(slot.timeBetween)}
                    </td>
                    <td className="admin-slot__actions">
                      <button
                        className="admin-slot__action-button"
                        onClick={() => toggleModal(slot.id)}
                      >
                        ✎
                      </button>
                    </td>
                  </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="admin-slot-backdrop" onClick={toggleModal}>
            <div
              className="admin-slot-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit}>
                <h2 className="admin-slot-modal__header">Update Slot</h2>
                <div className="admin-slot-modal__form-section">
                  <div className="admin-slot-modal__form-grid">
                    <div
                      className="admin-slot-modal__form-grid
              admin-slot-modal__form-grid--half-width"
                    >
                      <div className="admin-slot-modal__form-group">
                        <label
                          htmlFor="headway"
                          className="admin-slot-modal__label"
                        >
                         Headway:
                        </label>
                        <input
                          type="text"
                          id="headway"
                          className="admin-slot-modal__input"
                          defaultValue={timeBetween}
                          min="0"
                          onChange={(e) => {
                           setTimeBetween(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="admin-slot-modal__button-container">
                  <button
                    type="submit"
                    className="admin-slot-modal__button"
                    disabled={loading}
                  >
                    {loading ? <Spin size="small" /> : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminSlot;