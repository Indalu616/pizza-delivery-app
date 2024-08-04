import React, { useEffect, useRef, useState } from "react";
import "./AddPiza.css";
import PrivateNav from "../PrivateNavbar/PrivateNav";
import Footer from "../Footer/Footer";
import { db } from "../../FireBaseConfig/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { storage } from "../../FireBaseConfig/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

function AddPizza() {
  const imgageRef = useRef();
  const catRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const sizeRef = useRef();
  const ratRef = useRef();
  const imgRef = useRef();
  const inputEl = [catRef, nameRef, priceRef, sizeRef, ratRef];
  const [category, setCategory] = useState();
  const [name, setName] = useState();
  const [price, setprice] = useState();
  const [rating, setRating] = useState();
  const [size, setSize] = useState();
  const [image, setImage] = useState();
  const [pizzaList, setPizzaList] = useState([]);
  // !download the image and get url
  async function getUrl(name) {
    try {
      const url = await getDownloadURL(ref(storage, `ProductImages/${name}`));
      return url;
    } catch (error) {
      console.error(error);
    }
  }

  //   !upload data
  //   !define the reference of the product collection from firestore
  const pizzaCollectionRef = collection(db, "ProductLists");
  const uploadData = async () => {
    inputEl.forEach((el) => {
      el.current.value = "";
    });
    if (!image) return;
    console.log(image.name)
    const fileFolderRef = ref(storage, `ProductImages/${image.name}`);

    try {
      const uploadedImg = await uploadBytes(fileFolderRef, image);
      const url = await getUrl(image.name);
      console.log(uploadedImg);
      if (url) {
        const data = await addDoc(pizzaCollectionRef, {
          category: category.toLowerCase(),
          name: name,
          price: price,
          quantity: 1,
          rating: rating,
          size: size.toLowerCase(),
          url: url,
        });
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   !getData from firestore
  const getPizzaList = async () => {
    // !read the data from fireabse store
    try {
      const data = await getDocs(pizzaCollectionRef);
      const filterdData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPizzaList(filterdData);
      imgageRef.current.src = filterdData[0].url;
      console.log(filterdData);
      setTimeout(() => {
        console.log(pizzaList);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getPizzaList();
  }, []);

  return (
    <>
      <PrivateNav />
      <div className="admin-page">
        <h1>Add Products</h1>
        <div className="admin-page-container">
          <div className="input-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              placeholder="Pizza Category"
              onChange={(e) => setCategory(e.target.value)}
              ref={catRef}
            ></input>
          </div>

          <div className="input-group">
            <label htmlFor="name">Pizza Name</label>
            <input
              type="text"
              id="name"
              placeholder="Pizza name"
              onChange={(e) => setName(e.target.value)}
              ref={nameRef}
            ></input>
          </div>

          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              placeholder="Pizza price"
              onChange={(e) => setprice(e.target.value)}
              ref={priceRef}
            ></input>
          </div>

          <div className="input-group">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              placeholder="not decimal(1-5)"
              onChange={(e) => setRating(e.target.value)}
              ref={ratRef}
              max="5"
              min="1"
            ></input>
          </div>

          <div className="input-group">
            <label htmlFor="size">Size</label>
            <input
              type="text"
              id="size"
              placeholder="small,medium or large"
              onChange={(e) => setSize(e.target.value)}
              ref={sizeRef}
            ></input>
          </div>

          <div className="input-group">
            <label htmlFor="image">Pizza Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              ref={imgRef}
            ></input>
          </div>
          <button id="upload-btn" onClick={uploadData}>
            Upload
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddPizza;
