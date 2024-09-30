import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {RecetaType} from "../types";

const API_URL = 'http://localhost:3000/recetas';

const useCrudAcciones = () => {
    const [recetas, setRecetas] = useState<RecetaType[]>([]);
    const [receta, setReceta] = useState<RecetaType | null>(null);

    useEffect(() => {
        cargarRecetas();
    }, []);

    const getMaxId = () => {
        return recetas.reduce((max, a) => (a.id > max ? a.id : max), 0) + 1;
    };

    const cargarRecetas = async () => {
        const response = await axios.get(API_URL);
        setRecetas(response.data);
    };

    const agregarReceta = async (nombre: string, descripcion: string, tiempo: string, imagen: string, receta?: RecetaType) => {
        if (receta) {
            
            setRecetas(
                recetas.map((a) => (a.id === receta.id ? { ...a, nombre, descripcion } : a))
            );
            setReceta(null);
            alerta('Receta actualizado');
            return;
        }

        await axios.post(API_URL, { nombre, descripcion, imagen: new Date().toISOString(), tiempo: 'tiempo Desconocido' });
        setRecetas([...recetas, { id: getMaxId(), nombre, descripcion, imagen: new Date().toISOString(), tiempo: 'tiempo Desconocido' }]);
        alerta('Receta agregado');
    };

    const editarReceta = (id: number) => {
        const receta = recetas.find((a) => a.id === id);
        if (receta) {
            setReceta(receta);
        }
    };

    const eliminarReceta = async (id: number) => {
        const receta = recetas.find((a) => a.id === id);
        const result = await Swal.fire({
            title: receta?.nombre,
            text: '¿Estás seguro de eliminar este receta?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#f56565',
            cancelButtonColor: '#718096'
        });

        if (!result.isConfirmed) {
            return;
        }
        
        setRecetas(recetas.filter((a) => a.id !== id));
    };

    const alerta = (title: string) => {
        Swal.fire({
            icon: 'success',
            title,
            showConfirmButton: false,
            timer: 1500,
            position: 'top-end',
        });
    }

    return {
        recetas,
        receta,
        agregarReceta,
        editarReceta,
        eliminarReceta
    };
};

export default useCrudAcciones;