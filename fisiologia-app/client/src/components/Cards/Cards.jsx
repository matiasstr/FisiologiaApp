import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import Paginacion from "./Paginacion";
function Cards() {
  let allInfo = useSelector((state) => state.contenido);
  const [pagina, setPagina] = useState(1);
  const porPagina = 9;
  const ultPag = pagina * porPagina;
  const priPag = ultPag - porPagina;
  let informacion = allInfo?.slice(priPag, ultPag);
  const maximo = allInfo?.length / porPagina;
  console.log(allInfo);
  return (
    // <div>

    // </div>
    <div className="flex flex-col items-center dark:bg-slate-700">
      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
      <div className="flex flex-wrap items-start content-start justify-evenly">
        {informacion.map((e) => {
          return (
            <Card key={e.key} nombre={e.nombre} descripcion={e.descripcion} />
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
