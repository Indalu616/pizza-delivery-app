import React, { useContext, useEffect, useState } from "react";
import "./Menu.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { cartContext } from "../CartContextProvider/CartContex";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FireBaseConfig/firebase";
import loading from "../../images/loading.gif";
function Menu() {
  //   !getData from firestore
  const [pizzaLists, setPizzaLists] = useState();
  const [pizzas, setPizass] = useState([]);
  const pizzaCollectionRef = collection(db, "ProductLists");
  const getPizzaList = async () => {
    // !read the data from fireabse store
    try {
      const data = await getDocs(pizzaCollectionRef);
      const filterdData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return filterdData;
    } catch (error) {
      console.error(error);
    }
  };
  let itemsPerPage = 8;
  let [currentPage, setCurrentPage] = useState(1);
  const { dispatch } = useContext(cartContext);

  // !pagination Logic
  // !calculate IndexRange
  function calculateIndex() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(startIndex, endIndex);
    console.log(pizzas);
    return { startIndex, endIndex };
  }
  // !nextPage functionality
  function nextPage() {
    if (currentPage < Math.ceil(pizzaLists?.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }
  // !prevPge functionality
  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  // !slice pizza functionality
  const { startIndex, endIndex } = calculateIndex();
  async function SlicePizza(startIndex, endIndex) {
    const fetchedData = await getPizzaList();
    setPizzaLists(fetchedData);
    setPizass(fetchedData.slice(startIndex, endIndex));
  }
  useEffect(() => {
    SlicePizza(startIndex, endIndex);
  }, [currentPage]);

  // !filtering functionality
  // !filter by category
  function filterPizza(category) {
    if (category === "all") {
      SlicePizza(startIndex, endIndex);
    } else {
      // SlicePizza(startIndex, endIndex);
      setPizass(pizzas.filter((pizza) => pizza.category == category));
    }
  }
  // !filter by size
  function filterPizzaBySize(size) {
    if (size === "any") {
      SlicePizza(startIndex, endIndex);
    } else {
      // SlicePizza(startIndex, endIndex);
      setPizass(pizzas.filter((pizza) => pizza.size == size));
    }
  }

  return (
    <>
      <Navbar />
      <div className="menu">
        <div className="check-box">
          <div className="group">
            <label htmlFor="category">Filter By category:</label>
            <select id="category" onChange={(e) => filterPizza(e.target.value)}>
              <option value="all">All</option>
              <option value="beef">Beef</option>
              <option value="cheese">Cheese</option>
              <option value="chicken">Chicken</option>
              <option value="special">Special</option>
              <option value="pepperoni">Pepperoni</option>
            </select>
          </div>
          <div className="group">
            <label htmlFor="size">Filter By size:</label>
            <select
              id="size"
              onChange={(e) => filterPizzaBySize(e.target.value)}
            >
              <option value="any">Any</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
        <h3>
          We have <span id="we-have-pizza">{pizzas?.length}</span> pizzas{" "}
        </h3>
        {!pizzas.length && (
          <div className="loader">
            <div className="loading">
              <img src={loading} alt="loading"></img>
            </div>
          </div>
        )}
        <div className="pizza-menu-container">
          {pizzas?.map((pizza, index) => {
            return (
              <div className="pizza" key={index}>
                <img src={pizza.url} alt="pizza-image"></img>
                <div className="desc">
                  <h3>{pizza.name}</h3>
                  <p>
                    Beef pepperoni, Italian sausage, Green peppers, mushrooms &
                    onions
                  </p>
                </div>
                <div className="buy">
                  <h3
                    onClick={() =>
                      dispatch({ type: "addToCart", pizza: pizza })
                    }
                    id="add"
                  >
                    <i class="fa-solid fa-cart-shopping"></i> +
                  </h3>
                  {Array(Number(pizza.rating))
                    .fill("⭐", 0)
                    .map((item) => {
                      return <p>{item}</p>;
                    })}
                  <h3>${pizza.price}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pagination">
          <span className="page" onClick={prevPage}>
            Previous
          </span>
          <span>
            Page {currentPage} of {Math.ceil(pizzaLists?.length / itemsPerPage)}
          </span>
          <span className="page" onClick={nextPage}>
            Next
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Menu;
