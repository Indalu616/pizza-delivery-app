import React, { useRef, useState } from "react";
import "./Slider.css";
import pizza_1 from "../../images/pizza-beef-1.jpeg";
import Carousel from "react-elastic-carousel";
import { storage } from "../../FireBaseConfig/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Slider() {
  const [images, setImages] = useState();
  const imgRef = useRef();
  // !file upload
  const uploadFile = async () => {
    if (!images) return;
    const fileFolderRef = ref(storage, `ProductImages/${images.name}`);
    try {
      const uploadedImg = await uploadBytes(fileFolderRef, images);
      console.log(uploadedImg.url);
    } catch (error) {
      console.error(error);
    }
  };
  // !download the image and get url
  async function getUrl() {
    try {
      const url = await getDownloadURL(
        ref(storage, "ProductImages/pizza-1.png")
      );
      console.log(url);
    } catch (error) {
      console.error(error);
    }
  }
  getUrl();
  // getDownloadURL(ref(storage, 'images/stars.jpg'))
  //   .then((url) => {
  //     // `url` is the download URL for 'images/stars.jpg'
  //     // This can be downloaded directly:
  //     const xhr = new XMLHttpRequest();
  //     xhr.responseType = 'blob';
  //     xhr.onload = (event) => {
  //       const blob = xhr.response;
  //     };
  //     xhr.open('GET', url);
  //     xhr.send();

  //     // Or inserted into an <img> element
  //     const img = document.getElementById('myimg');
  //     img.setAttribute('src', url);
  //   })
  //   .catch((error) => {
  //     // Handle any errors
  //   });

  // !---------------///------------------
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 1, pagination: false },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ];
  return (
    <div className="slider-component">
      <div className="App"></div>
      <input
        type="file"
        ref={imgRef}
        onChange={(e) => setImages(e.target.files[0])}
      ></input>
      <button onClick={uploadFile}>Upload</button>
      <div className="slider-container">
        <Carousel breakPoints={breakPoints} enableAutoPlay>
          <div className="slider">
            <img src={pizza_1} alt="Pizza"></img>
            <div className="desc">
              <p>This is the best pizza.Order Now!</p>
            </div>
          </div>

          <div className="slider">
            <img src={pizza_1} alt="Pizza"></img>
            <div className="desc">
              <p>This is the best pizza.Order Now!</p>
            </div>
          </div>

          <div className="slider">
            <img src={pizza_1} alt="Pizza"></img>
            <div className="desc">
              <p>This is the best pizza.Order Now!</p>
            </div>
          </div>
          <div className="slider">
            <img src={pizza_1} alt="Pizza"></img>
            <div className="desc">
              <p>This is the best pizza.Order Now!</p>
            </div>
          </div>
          <div className="slider">
            <img src={pizza_1} alt="Pizza"></img>
            <div className="desc">
              <p>This is the best pizza.Order Now!</p>
            </div>
          </div>
          <div className="slider">
            <img src={pizza_1} alt="Pizza"></img>
            <div className="desc">
              <p>This is the best pizza.Order Now!</p>
            </div>
          </div>
          <div className="slider">
            <img src={pizza_1} alt="Pizza"></img>
            <div className="desc">
              <p>This is the best pizza.Order Now!</p>
            </div>
          </div>
          <div className="slider">
            <img src={pizza_1} alt="Pizza"></img>
            <div className="desc">
              <p>This is the best pizza.Order Now!</p>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Slider;
