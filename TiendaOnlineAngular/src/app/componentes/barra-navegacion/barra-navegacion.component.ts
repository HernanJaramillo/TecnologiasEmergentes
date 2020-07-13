import { Component, OnInit } from '@angular/core';
import {CarritoComprasService} from "../../servicios/carrito-compras.service";

@Component({
  selector: 'barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

  constructor(private carritoService: CarritoComprasService) { }

  ngOnInit() {
  }

  pedidosPendientes() : number{
    return this.carritoService.pedidos.length;
  }
}
