import { Component, OnInit } from '@angular/core';
import {Producto} from "../../modelos/Producto";
import {ProductosService} from "../../servicios/productos.service";
import {Response} from "@angular/http";
import {CarritoComprasService} from "../../servicios/carrito-compras.service";

@Component({
  selector: 'catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  productos: Array<Producto>;
  productosVisibles: Array<Producto>;

  constructor(private productosService: ProductosService, private carritoCompras:CarritoComprasService) { }

  ngOnInit() {
    this.productosService.obtenerProductos().subscribe(
      (data: Response) => {
        this.productos = JSON.parse(JSON.stringify(data));
        this.productosVisibles = this.productos;
      }
    );
  }

  actualizarProductos(event, valor){
    this.productosVisibles = this.productos.filter(p => p.nombre.toLowerCase().indexOf(valor.toLowerCase()) !== -1);
  }

  onAgregarProducto(pedido){
    this.carritoCompras.agregarPedido(pedido);
  }
}
