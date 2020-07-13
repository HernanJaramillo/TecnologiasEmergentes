import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Producto} from "../../modelos/Producto";
import {Pedido} from "../../modelos/Pedido";

@Component({
  selector: 'producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  @Input() producto: Producto;
  @Output() agregarProductoCanasta: EventEmitter<Pedido> = new EventEmitter<Pedido>();

  constructor() { }

  ngOnInit() {
  }

  agregarProducto(cantidad: number){
    if(cantidad <= this.producto.stock){
      this.producto.stock = this.producto.stock - cantidad;
      this.agregarProductoCanasta.emit(new Pedido(this.producto, cantidad));
    } else {
      alert("No hay inventario suficiente para agregar al carrito.");
    }
  }

}
