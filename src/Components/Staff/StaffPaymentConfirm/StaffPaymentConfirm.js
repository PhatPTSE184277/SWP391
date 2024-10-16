/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import "./StaffPaymentConfirm.scss";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../config/axios";

const StaffPaymentConfirm = () => {
  const formatPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const orderNumber = "25641";
  const totalAmount = "10000000";
  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate("/staff/booking-service");
  };

  const location = useLocation();
  const [transactionId, setTransactionId] = useState("");

  function parseVNPString(vnpString) {
    const params = new URLSearchParams(vnpString);
    const result = {
      vnp_BankCode: params.get("vnp_BankCode"),
      vnp_CardType: params.get("vnp_CardType"),
      vnp_ResponseCode: params.get("vnp_ResponseCode"),
      vnp_TxnRef: params.get("vnp_TxnRef"),
    };
    return result;
  }

  const vnpString = location.search;

  const result = parseVNPString(vnpString);
  console.log(result);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
//         const response =
//           await api.get(`payment/response?vnp_BankCode=${result.vnp_BankCode}&vnp_CardType=${result.vnp_CardType}&vnp_ResponseCode=${result.vnp_ResponseCode}&vnp_TxnRef=${result.vnp_TxnRef}
// `);
        const response = await api.get("payment");
        const data = response.data;
        if (data) {
          setTransactionId(data.match(/Transaction ID:\s*(\d+)/)[1]);
        }
      } catch (error) {}
    };

    fetchPayment();
  }, []);

  useEffect(() => {
    const checkout = async () => {
      try {
        const response = await api.put(`checkout?transactionId=${transactionId}`)
        const data = response.data.result;
        if (data) {
          
        }
      } catch (error) {
        
      }
      
    }
    checkout();
  }, [transactionId])

  return (
    <div className="payment-confirmation__body">
      <div className="payment-confirmation">
        <div className="payment-confirmation__icon-container">
          <CheckCircle className="check-icon" color="green" size={64} />
        </div>
        <h1 className="payment-confirmation__title">PAYMENT SUCCESSFUL</h1>
        <div className="payment-confirmation__details">
          <p>
            Order ID: #{orderNumber} - Total amount: {formatPrice(totalAmount)}{" "}
            VND
          </p>
          <p>Payment method: VNPay</p>
        </div>
        <button
          className="payment-confirmation__dashboard-button"
          onClick={handleOnclick}
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default StaffPaymentConfirm;
