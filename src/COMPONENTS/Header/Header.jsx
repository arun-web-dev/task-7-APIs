import React from "react";
import { Link } from "react-router-dom";
import { logout, signInWithGoogle } from "../../Firebase/Firebase";
import Cart from "../Cart/Cart";
import SearchBar from "../SearchBar/SearchBar";

export default function Header(props) {
  const { searchFilterHandler, userIsActive, user, cartItems } = props;
  return (
    <div className="flex header items-center">
      <Link to="/" className="logo-container ">
        <h2 className="logo  tc f2 pv1 tracked  pointer dim center">
          Easy Shopping
        </h2>
      </Link>
      <div className="searchbar">
        <SearchBar searchFilterHandler={searchFilterHandler} />
      </div>
      <div className="shopping-cart ml3 pointer">
        <Cart cartItems={cartItems} />
      </div>
      {userIsActive ? (
        <div className="user-details">
          Logged in as: <b> {user?.displayName} </b>
          <button className="ml2" onClick={logout}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="dib">
          <button className="sign-in-btn" onClick={signInWithGoogle}>
            Sign in with your google account
          </button>
        </div>
      )}
    </div>
  );
}
