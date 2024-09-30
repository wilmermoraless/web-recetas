export interface RecetaType {
    id: number;
    nombre: string;
    descripcion: string;
    tiempo: string;
    imagen: string;
}

export interface TablaProps {
    recetas: RecetaType[];
    onEliminarReceta: (id: number) => void;
    onEditarReceta: (id: number) => void;
}