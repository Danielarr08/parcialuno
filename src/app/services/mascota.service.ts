import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Mascota } from '../models/mascota.model';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private db: Firestore = inject(Firestore);

  constructor() {}

  // Obtener las mascotas desde Firestore
  getMascotas() {
    const mascotasCollection = collection(this.db, 'mascotas');
    return collectionData(mascotasCollection, { idField: 'id' });
  }

  // Agregar una nueva mascota, guardando la imagen en base64
  async agregarMascota(mascota: Mascota, imagen: File) {
    const mascotaId = String(new Date().getTime()); // ID único
    const mascotaDoc = doc(this.db, 'mascotas', mascotaId);

    // Convertir la imagen a base64
    const imagenBase64 = await this.convertirImagenABase64(imagen);

    // Guardar la mascota con la imagen en base64
    return setDoc(mascotaDoc, {
      nombre: mascota.nombre,
      especie: mascota.especie,
      edad: mascota.edad,
      imagenUrl: imagenBase64
    });
  }

  // Modificar los datos de una mascota
  async modificarMascota(mascota: Mascota, imagen?: File) {
    const mascotaDoc = doc(this.db, 'mascotas', mascota.id);

    let mascotaData: any = {
      nombre: mascota.nombre,
      especie: mascota.especie,
      edad: mascota.edad
    };

    // Si se ha proporcionado una nueva imagen, convertirla y agregarla
    if (imagen) {
      mascotaData.imagenUrl = await this.convertirImagenABase64(imagen);
    }

    return updateDoc(mascotaDoc, mascotaData);
  }

  // Eliminar una mascota
  eliminarMascota(mascota: Mascota) {
    const mascotaDoc = doc(this.db, 'mascotas', mascota.id);
    return deleteDoc(mascotaDoc);
  }

  // Convertir la imagen a base64
  private convertirImagenABase64(imagen: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);  // Resultado como base64
      };
      reader.onerror = reject;
      reader.readAsDataURL(imagen); // Convierte la imagen en base64
    });
  }
}
