import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Tarea {
  posicion: number;
  nombre: string;
  descripicion: string;
}

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista implements OnInit {
  public displayedColumns: string[] = ['posicion', 'nombre', 'descripcion'];

  public nuevaTarea: string = '';

  public tareas: Tarea[] = [];

  public isShown: boolean = true;

  ngOnInit(): void {
    this.cargarTareas();
  }

  private cargarTareas(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const tareasGuardadas = localStorage.getItem('tareas');
      this.tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    }
  }

  public mostrar(): void {
    this.isShown = !this.isShown;
  }

  public agregarTarea(): void {
    if (this.nuevaTarea.trim() !== '') {
      const nuevaTarea: Tarea = {
        posicion: this.tareas.length + 1,
        nombre: this.nuevaTarea,
        descripicion: '',
      };
      this.tareas.push(nuevaTarea);
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
      }
      this.nuevaTarea = '';
    }
  }
}
