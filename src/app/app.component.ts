import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'veterinaria';

  // Propiedades
  mascota = {
    id: 0,
    nombre: '',
    especie: '',
    edad: 0,
    imagen: ''
  };


  // Arreglo de mascotas
  mascotas = [
    { id: 1, nombre: 'Firulais', especie: 'Perro', edad: 3, imagen: 'assets/firulais.jpg' },
    { id: 2, nombre: 'Michi', especie: 'Gato', edad: 2, imagen: 'assets/michi.jpg' },
    { id: 3, nombre: 'Nemo', especie: 'Pez', edad: 1, imagen: 'assets/nemo.jpg' },
    { id: 4, nombre: 'Paco', especie: 'Loro', edad: 5, imagen: 'assets/paco.jpg' },
    { id: 5, nombre: 'Bugs', especie: 'Conejo', edad: 4, imagen: 'assets/bugs.jpg' },
  ];

  // Método que determina si hay mascotas en el arreglo
  hayMascotas() {
    return this.mascotas.length > 0;
  }

  // Función que agrega mascotas al arreglo
  agregarMascota() {
    if (this.mascota.id == 0) {
      alert('El Id de la mascota debe ser diferente a CERO :D ');
      return;
    }
    for (let i = 0; i < this.mascotas.length; i++) {
      if (this.mascota.id == this.mascotas[i].id) {
        alert('Ya existe una mascota con ese ID :( ');
        return;
      }
    }
    this.mascotas.push({
      id: this.mascota.id,
      nombre: this.mascota.nombre,
      especie: this.mascota.especie,
      edad: this.mascota.edad,
      imagen: this.mascota.imagen
    });
    this.mascota.id = 0;
    this.mascota.nombre = '';
    this.mascota.especie = '';
    this.mascota.edad = 0;
    this.mascota.imagen = '';
  }

  // Método para seleccionar una mascota existente
  seleccionarMascota(mascotaSeleccionada: { id: number; nombre: string; especie: string; edad: number; imagen: string; }) {
    this.mascota.id = mascotaSeleccionada.id;
    this.mascota.nombre = mascotaSeleccionada.nombre;
    this.mascota.especie = mascotaSeleccionada.especie;
    this.mascota.edad = mascotaSeleccionada.edad;
    this.mascota.imagen = mascotaSeleccionada.imagen;
  }

  // Función para modificar una mascota (La mascota seleccionada)
  modificarMascota() {
    for (let i = 0; i < this.mascotas.length; i++) {
      if (this.mascota.id == this.mascotas[i].id) {
        this.mascotas[i].nombre = this.mascota.nombre;
        this.mascotas[i].especie = this.mascota.especie;
        this.mascotas[i].edad = this.mascota.edad;
        this.mascotas[i].imagen = this.mascota.imagen;

        this.mascota.id = 0;
        this.mascota.nombre = '';
        this.mascota.especie = '';
        this.mascota.edad = 0;
        this.mascota.imagen = '';
        return;
      }
    }
    alert('No Existe el ID');
  }

  // Función para eliminar una mascota
  eliminarMascota(id: number) {
    for (let i = 0; i < this.mascotas.length; i++) {
      if (id == this.mascotas[i].id) {
        this.mascotas.splice(i, 1);
        return;
      }
    }
  }

  // Método que maneja la selección de la imagen desde el explorador de archivos
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.mascota.imagen = URL.createObjectURL(file); // Asigna la URL temporal de la imagen seleccionada
    }
  }
}


