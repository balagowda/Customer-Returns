import React, { useContext } from "react";
import { LoginContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const DeliveryHome = () => {
  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate();
  // console.log(account);

  return (
    <div className="delivery-home">
      <div className="delivered-products">
        <h2 className="delivery-heading">Deliveries</h2>
        {account ? (
          account.item ? (
            account.item.map((data, index) => (
              <div className="product" key={index}>
                <div className="product-image">
                  <img
                    src={data.product.image}
                    alt="laptop"
                    className="product-image"
                  />
                </div>
                <div className="product-info">
                  <p className="product-id p-info">
                    <b>Product Id:</b> &nbsp;&nbsp;{data.product.productId}
                  </p>
                  <p className="product-name p-info">
                    <b>Shipping Address:</b> &nbsp;&nbsp;
                    {data.delivery.shipping}
                  </p>
                  <p className="product-status p-info">
                    {" "}
                    <b>Status:</b> &nbsp;
                    <span className={`${data.delivery.status}`}>
                      <span className="point"></span> {data.delivery.status}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
              <p className="classic">No deliveries yet</p>
          )
        ) : (
          <div className="circle" style={{ cursor: "progress" }}>
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )}
        <button
          className="delivery-btn"
          onClick={() => navigate("/delivery/deliver")}
        >
          Add Delivery
        </button>
      </div>
    </div>
  );
};

export default DeliveryHome;
