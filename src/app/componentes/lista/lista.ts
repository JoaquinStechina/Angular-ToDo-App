import { Component } from '@angular/core';

@Component({
  selector: 'app-lista',
  imports: [],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista {
  public isShown: boolean = true;
  public mostrar(): void {
    this.isShown = !this.isShown;
  }
}
