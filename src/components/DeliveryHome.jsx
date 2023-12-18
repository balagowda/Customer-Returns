import React, { useContext } from "react";
import { LoginContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const DeliveryHome = () => {
  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate();

  return (
    <div className="delivery-home">
      <div className="delivered-products">
        <h2 className="delivery-heading">Deliveries</h2>
        {account ? (
          <>
            <div className="product">
              <div className="product-image">
                <img src="/laptop.jpg" alt="laptop" className="product-image" />
              </div>
              <div className="product-info">
                <p className="product-id">Product is is id</p>
                <p className="product-name">Address</p>
                <p className="product-status">Product status: status</p>
              </div>
            </div>
            <button className="delivery-btn" onClick={()=>navigate('/delivery/deliver')} >Add Delivery</button>
          </>
        ) : (
          <div className="circle" style={{ cursor: "progress" }}>
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryHome;
