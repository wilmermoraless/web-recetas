import { FC } from 'react';
import Receta from './Receta.tsx';
import {TablaProps} from "../../types/index.ts";


const Tabla: FC<TablaProps> = ({
  recetas,
  onEliminarReceta,
  onEditarReceta,
}) => {
  return (
    <ul className="mt-4">
      {recetas.map((receta) => (
        <Receta
          key={receta.id}
          receta={receta}
        
          onEliminar={() => onEliminarReceta(receta.id)}
          onEditar={() => onEditarReceta(receta.id)}
        />
      ))}
    </ul>
  );
};

export default Tabla;