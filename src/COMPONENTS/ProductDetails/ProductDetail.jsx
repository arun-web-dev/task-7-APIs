import React, { useEffect } from "react";
import "./ProductDetails.scss";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ProductDetail(props) {
  const location = useLocation();
  const { state } = location;
  const { addToCart } = props;

  return (
    <div className="product-detail shadow-1">
      <div className="product-detail-image">
        <img src={state.image.url} alt={state.name} />
      </div>
      <div className="product-detail-right pa3">
        <h2 className="f1 mv3">{state.name}</h2>
        <div className="flex mv2 items-center">
          <p className="f3">Special Price: </p>
          <p className="ml2 f2 b"> {state.price.formatted_with_symbol}</p>
        </div>
        <p className="f4 mt2">Product Description :</p>
        <li className="f3 mt2">{state.description.slice(3).slice(0, -4)}</li>
        <li className="mt2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut corrupti
          dolores, ipsa corporis ab hic asperiores quam officia !
        </li>
        <li className="mt2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut corrupti
          dolores, ipsa corporis ab hic asperiores quam officia !
        </li>
        <li className="mt2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut corrupti
          dolores, ipsa corporis ab hic asperiores quam officia !
        </li>

        <button
          className="product-detail-right-btn mt3 pv2 ph4"
          onClick={() => {
            addToCart(state);
          }}
        >
          Add To Cart
        </button>
      </div>

      <Link to={"/"}>
        <button className="back-to-home">
          <span className="mr2">
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
          Back to Main Page
        </button>
      </Link>
    </div>
  );
}
