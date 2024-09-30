import React, { FC, useState, useEffect } from 'react';

import { RecetaType } from '../../types';

interface FormularioProps {
  onAddArticle: (nombre: string, descripcion: string, timpo:string, imagen:string, receta?: RecetaType) => Promise<void>;
  receta?: RecetaType | null;
}

const Formulario: FC<FormularioProps> = ({ onAddArticle, receta }) => {
  const [nombre, setReceta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [imagen, setImagen] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre.trim() && descripcion.trim() && tiempo.trim() && imagen.trim()) {
      await onAddArticle(nombre.trim(), descripcion.trim(), tiempo.trim(), imagen.trim(), receta || undefined); 
      setReceta('');
      setDescripcion('');
      setTiempo('');
      setImagen('');
    }
  };

  useEffect(() => {
    if (receta) {
      setReceta(receta.nombre);
      setDescripcion(receta.descripcion);
      setTiempo(receta.tiempo);
      setImagen(receta.imagen);
    }
  }, [receta]);


  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', border: '1px solid #ccc', borderRadius: '9px', backgroundColor: '#fff' }}>
      <div className="flex items-start justify-center mb-6 text-2x1 font-bold">
      <h1>Crear nuevo artículo</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label className='font-bold'>Título</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setReceta(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label className='font-bold'>descripcion</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label className='font-bold'>tiempo</label>
          <input
            type="text"
            value={tiempo}
            onChange={(e) => setTiempo(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label className='font-bold'>imagen</label>
          <input
            type="date"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '20px 50px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '9px' }}>{receta ? 'Actualizar' : 'Guardar'}</button>
        
      </form>
    </div>
  );
};

export default Formulario;