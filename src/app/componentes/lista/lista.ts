import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista',
  imports: [MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista {
  public isShown: boolean = true;
  public mostrar(): void {
    this.isShown = !this.isShown;
  }
}
