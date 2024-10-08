import React, { useState } from 'react';
import './ManagerBooking.scss';
import { Link } from 'react-router-dom';

const ManagerBooking = () => {
  const initialBookings = [
    {
      salonId: '#5331',
      img: 'https://enlink.themenate.net/assets/images/avatars/thumb-2.jpg',
      customer: 'Erin Gonzales',
      bookingDate: '8/5/2019',
      amount: '$137.00',
      status: 'approved',
    },
    
    {
      salonId: '#5333',
      img: 'https://enlink.themenate.net/assets/images/avatars/thumb-6.jpg',
      customer: 'Alice Johnson',
      bookingDate: '10/5/2019',
      amount: '$89.50',
      status: 'rejected',
    },
    {
      salonId: '#5332',
        img: 'https://enlink.themenate.net/assets/images/avatars/thumb-4.jpg',
        customer: 'John Smith',
        bookingDate: '9/5/2019',
        amount: '$250.00',
        status: 'pending',
      },
  ];

  const [bookings, setBookings] = useState(initialBookings);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
 
  

  const sortBy = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }
    setSortConfig({ key, direction });

    let sortedBookings;
    if (direction === null) {
      sortedBookings = [...initialBookings];
    } else {
      sortedBookings = [...bookings].sort((a, b) => {
        if (key === 'amount') {
          return direction === 'ascending' 
            ? parseFloat(a[key].replace('$', '')) - parseFloat(b[key].replace('$', ''))
            : parseFloat(b[key].replace('$', '')) - parseFloat(a[key].replace('$', ''));
        }
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    setBookings(sortedBookings);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') return ' ▲';
      if (sortConfig.direction === 'descending') return ' ▼';
    }
    return '';
  };

  return (
    <div className="manager-booking">
      <div className="manager-booking__container">
        <div className="manager-booking__breadcrumb">
          <Link to="#" className="manager-booking__breadcrumb-link">Dashboard</Link> &gt;
          <Link to="#" className="manager-booking__breadcrumb-link">Apps</Link> &gt;
          <Link to="#" className="manager-booking__breadcrumb-link">E-commerce</Link> &gt;
          <span className="manager-booking__breadcrumb-current">Booking</span>
        </div>
        <div className="manager-booking__content">
          <table className="manager-booking__table">
            <thead>
              <tr>
                <th onClick={() => sortBy('salonId')}>ID{getSortIndicator('salonId')}</th>
                <th onClick={() => sortBy('customer')}>Customer{getSortIndicator('customer')}</th>
                <th onClick={() => sortBy('bookingDate')}>Date{getSortIndicator('bookingDate')}</th>
                <th onClick={() => sortBy('amount')}>Amount{getSortIndicator('amount')}</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.salonId}>
                  <td className="manager-booking__id">{booking.salonId}</td>
                  <td>
                    <div className="manager-booking__customer">
                      <img src={booking.img} alt={booking.customer} className="manager-booking__customer-image" />
                      <span className="manager-booking__customer-name">{booking.customer}</span>
                    </div>
                  </td>
                  <td className="manager-booking__date">{booking.bookingDate}</td>
                  <td className="manager-booking__amount">{booking.amount}</td>
                  <td>
                    <span className={`manager-booking__status manager-booking__status--${booking.status}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="manager-booking__actions">
                    <button className="manager-booking__action-button">✎</button>
                    <button className="manager-booking__action-button">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerBooking;