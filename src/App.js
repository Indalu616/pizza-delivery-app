import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import SignIn from "./components/SignIn/SignIn";
import Fou04 from "./components/404page/Fou04";
import AddPizza from "./components/AddPizza/AddPizza";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/sign" element={<SignIn />}></Route>
        <Route path="/addpro" element={<AddPizza />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Fou04 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
