import Commerce from "./lib/commerce";
import { useEffect, useState } from "react";
import ProductsList from "./COMPONENTS/ProductsList";
import Spinner from "./COMPONENTS/Spinner";
import "tachyons";
import { Link, Route, Routes } from "react-router-dom";
import ProductDetail from "./COMPONENTS/ProductDetails/ProductDetail";
import SearchBar from "./COMPONENTS/SearchBar/SearchBar";
import Cart from "./COMPONENTS/Cart/Cart";
import Categories from "./COMPONENTS/Categories/Categories";

import { signInWithGoogle, auth, logout } from "./Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./COMPONENTS/Header/Header";
import PlaceOrder from "./COMPONENTS/PlaceOrder/PlaceOrder";

function App() {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userIsActive, setUserIsActive] = useState(false);
  const [pageIsloading, setPageIsloading] = useState(true);
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    fetchProducts();
    ReteriveCart();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (user) {
      setUserIsActive(true);
    }
    if (!user) {
      setUserIsActive(false);
    }
  }, [loading, user]);
  const fetchProducts = () => {
    Commerce.products
      .list()
      .then((product) => {
        setProducts(product.data);
        setPageIsloading(false);
        localStorage.setItem("products", JSON.stringify(product.data));
      })
      .catch((error) => {
        console.log("There was and error fetching the products", error.message);
      });
  };

  const ReteriveCart = () => {
    Commerce.cart.retrieve().then((cart) => setCartItems(cart.line_items));
  };

  const addToCart = (product) => {
    Commerce.cart
      .add(product.id, 1)
      .then((response) => setCartItems([...cartItems, response]));
  };

  const updateCart = () => {
    Commerce.cart
      .update("item_7RyWOwmK5nEa2V", { quantity: 5 })
      .then((response) => console.log(response));
  };

  const getCartItems = () => {
    Commerce.cart.contents().then((items) => console.log(items));
  };

  const removeFromCart = () => {
    Commerce.cart
      .remove("item_7RyWOwmK5nEa2V")
      .then((response) => console.log(response));
  };

  const emptyCart = () => {
    Commerce.cart.empty().then((response) => console.log(response));
  };

  const ReteriveCardId = () => {
    Commerce.cart.id().then((cartId) => console.log(cartId));
  };

  const deleteCart = () => {
    Commerce.cart.delete().then((response) => console.log(response));
  };

  const categoryFilterHandler = (category) => {
    const filteredCategories = products.filter((product) => {
      return product.categories[0]?.name === category;
    });
    setSearchFilter([]);
    setCategoryFilter(filteredCategories);
  };

  const searchFilterHandler = (category) => {
    const getProducts = JSON.parse(localStorage.getItem("products"));
    const filteredCategories = getProducts.filter((product) => {
      return product.name.toLowerCase().includes(category.toLowerCase());
    });
    setSearchFilter(filteredCategories);
  };
  const productsSelector = () => {
    if (searchFilter.length > 0) {
      return searchFilter;
    }
    if (categoryFilter.length > 0) {
      return categoryFilter;
    }
    return products;
  };

  const HeaderHandler = () => {
    return (
      <Header
        searchFilterHandler={searchFilterHandler}
        user={user}
        userIsActive={userIsActive}
        cartItems={cartItems}
      />
    );
  };

  return (
    <div className="App ">
      <Routes>
        <Route
          path="/"
          element={
            <>
              {HeaderHandler()}
              <Categories
                className="categories"
                products={products}
                categoryFilterHandler={categoryFilterHandler}
              />
              {pageIsloading ? (
                <Spinner />
              ) : (
                <ProductsList products={productsSelector()} />
              )}
            </>
          }
        />
        <Route
          path="/:id"
          element={
            <>
              {HeaderHandler()}
              <div className="flex">
                <Categories
                  className="categories"
                  products={products}
                  categoryFilterHandler={categoryFilterHandler}
                />
                <ProductDetail addToCart={addToCart} />
              </div>
            </>
          }
        />

        <Route
          path="/placeOrder"
          element={
            <>
              {HeaderHandler()}
              <PlaceOrder cartItems={cartItems} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
