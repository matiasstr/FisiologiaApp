import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import img1 from "./anatomiaslide.png";
import {AiOutlinePlayCircle} from 'react-icons/ai'
import { obtenerDetalle } from "../../Redux/Actions/Actions";

function Detail() {
  const dispatch = useDispatch();
  let detalleImg = useSelector((state) => state.detalleDeImg)
  console.log(detalleImg);
  let { id } = useParams();
  console.log(id)

  useEffect(() => {
    dispatch(obtenerDetalle(id))
  },[])

  return (
    <div>
      <div className="flex justify-center">
         <h1>Titulo</h1>
      </div>
      <div className="flex p-14">
        <div className="px-14">
          <img className="w-[350rem] rounded-md" src={img1} alt="img" />
        </div>
        <div className="grid place-items-center h-screen text-center h-auto">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>
        </div>
      </div>
      <div className="flex justify-center pb-14 scale-150">
         <div className="">
            <AiOutlinePlayCircle/>
         </div>
      </div>
    </div>
  );
}

export default Detail;
