import React from "react";
import "./PlaceOrder.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import spinner from "../../assests/spinner.png";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function PlaceOrder(props) {
  const { cartItems } = props;

  const cartLists = cartItems.map((item) => {
    return (
      <div className="place-order-container-content-container" key={item?.id}>
        <div className="place-order-container-content-container-left">
          <div className="place-order-image-container">
            <div className="place-order-image-container-left">
              <div>
                <img src={item.image.url} alt={item?.name} />
              </div>
              <div className="mt3">
                <button className="quantity-decrease">-</button>
                <span className="quantity-display mh2">1</span>
                <button className="quantity-increase">+</button>
              </div>
            </div>
            <div className="place-order-image-container-right flex justify-between ml3">
              <div>
                <h2 className="f3 ma0">{item?.name}</h2>
                <p className="mt1">Made in India</p>
                <p className="f4">
                  Rs.{item?.price?.raw}
                  <span className="strike dib ml2 f5">
                    Rs.{item?.price?.raw + 20}
                  </span>
                </p>
              </div>
              <div>
                <button className="remove-btn f5">REMOVE</button>
              </div>
            </div>
          </div>
        </div>
        <div className="place-order-container-content-container-right">
          <div>
            <h2 className="f4">
              Delivery By Today 12pm | Free:{" "}
              <span className="strike">Rs.40</span>
            </h2>
            <p className="mt2">7 Days ReplaceMent Policy</p>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="place-order-container mw9">
      <div className="left-content">
        <div className="place-order-container-content-left pa3 shadow-4">
          <div className="flex justify-between items-center pv3">
            <div>
              <h2>Mycart ({cartItems.length})</h2>
            </div>
            <div className="flex">
              <p>
                <span className="dib mr2">
                  <FontAwesomeIcon icon={faMapLocationDot} />
                </span>
                Deliver to: Cumbum
              </p>
            </div>
          </div>
          <div className="cart-lists-view">{cartLists}</div>
        </div>
      </div>
      <div className="place-order-container-content-right pa3 shadow-4 ml2">
        <div className="flex flex-column justify-between">
          <label className="f3 b">PRICE DETAILS</label>
          <div className="flex justify-between mt3">
            <p>Price(1 item)</p>
            <p>Rs.500</p>
          </div>
          <div className="flex justify-between mt3">
            <p>Discount</p>
            <p className="price-details">Rs.50</p>
          </div>
          <div className="flex justify-between mt3">
            <p>Coupouns For you</p>
            <p className="price-details">Rs.50</p>
          </div>
          <div className="flex justify-between mt3">
            <p>Delivery Charges</p>
            <p className="price-details">FREE</p>
          </div>
          <div className="flex justify-between mt3">
            <h2>Total amount</h2>
            <h2>400</h2>
          </div>
          <div className="mt2 price-details">You will save Rs.100</div>
        </div>
        <div>
          <button className="place-order-btn">PLACE ORDER</button>
        </div>
      </div>
    </div>
  );
}
