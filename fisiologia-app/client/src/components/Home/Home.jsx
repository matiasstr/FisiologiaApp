import React from "react";
import Login from "../Login/Login";
import Cards from "../Cards/Cards";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { useEffect } from "react";
import { getImg } from "../../Redux/Actions/Actions";
import { Image } from "cloudinary-react";
import Footer from "../Footer/Footer";

function Home() {
  const dispatch = useDispatch();
  const useImages = useSelector((state) => state.imagenes);

  useEffect(() => {
    dispatch(getImg());
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-between">

        <Cards />
   
      {/* <Login/> */}
      <Footer />
    </div>
  );
}

export default Home;
