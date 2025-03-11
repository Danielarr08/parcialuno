import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mascota } from './models/mascota.model';
import { MascotaService } from './services/mascota.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'veterinaria';
  mascotas: Mascota[] = [];
  mascota = new Mascota();
  isEditing = false;
  imagenSeleccionada!: File | null;

  constructor(private mascotaService: MascotaService) {
    this.getMascotas();
  }

  // Obtener lista de mascotas desde Firestore
  async getMascotas(): Promise<void> {
    const data = await firstValueFrom(this.mascotaService.getMascotas());
    this.mascotas = data.map(doc => ({
      id: doc.id as string,  // ID generado por Firestore (automático)
      nombre: doc['nombre'] as string,
      especie: doc['especie'] as string,
      edad: doc['edad'] as number,
      imagen: doc['imagenUrl'] as string
    }));
  }

  // Manejar selección de archivo de imagen
  onFileSelected(event: any) {
    this.imagenSeleccionada = event.target.files[0];
  }

  // Agregar nueva mascota
  async agregarMascota() {
    if (!this.mascota.nombre || !this.mascota.especie || !this.mascota.edad || !this.imagenSeleccionada) {
      alert('Todos los campos y una imagen son requeridos.');
      return;
    }
    await this.mascotaService.agregarMascota(this.mascota, this.imagenSeleccionada);
    this.getMascotas();
    this.mascota = new Mascota();
    this.imagenSeleccionada = null;
    this.isEditing = false;
  }

  // Seleccionar mascota para edición
  seleccionarMascota(mascotaSeleccionada: Mascota) {
    this.mascota = { ...mascotaSeleccionada };
    this.isEditing = true;
  }

  // Modificar mascota
  async modificarMascota() {
    if (!this.mascota.id) {
      alert('Seleccione una mascota para modificar.');
      return;
    }
    await this.mascotaService.modificarMascota(this.mascota, this.imagenSeleccionada || undefined);
    this.getMascotas();
    this.mascota = new Mascota();
    this.imagenSeleccionada = null;
    this.isEditing = false;
  }

  // Eliminar mascota
  async eliminarMascota(id: string) {
    await this.mascotaService.eliminarMascota({ id, nombre: '', especie: '', edad: 0, imagen: '' });
    this.getMascotas();
  }

  // Limpiar formulario
  limpiarFormulario() {
    this.mascota = new Mascota();
    this.imagenSeleccionada = null;
    this.isEditing = false;
  }
}
