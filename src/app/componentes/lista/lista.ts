import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

export interface Tarea {
  posicion: number;
  nombre: string;
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
    MatCheckboxModule,
  ],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista implements OnInit {
  public displayedColumns: string[] = ['select', 'posicion', 'nombre'];
  public nuevaTarea: string = '';
  private tareas: Tarea[] = [];
  public dataSource = new MatTableDataSource<Tarea>(this.tareas);
  public selection = new SelectionModel<Tarea>(true, []);

  ngOnInit(): void {
    this.cargarTareas();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: Tarea): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.posicion + 1
    }`;
  }

  public eliminarTareasSeleccionadas(): void {
    this.tareas = this.tareas.filter(
      (tarea) => !this.selection.isSelected(tarea)
    );
    this.dataSource.data = this.tareas;
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
    this.selection.clear;
  }

  private cargarTareas(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const tareasGuardadas = localStorage.getItem('tareas');
      this.tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
      this.dataSource.data = this.tareas;
    }
  }

  public agregarTarea(): void {
    if (this.nuevaTarea.trim() !== '') {
      const nuevaTarea: Tarea = {
        posicion: this.tareas.length + 1,
        nombre: this.nuevaTarea,
      };
      this.tareas.push(nuevaTarea);
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
      }
      this.nuevaTarea = '';
      this.cargarTareas();
    }
  }
}
