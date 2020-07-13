import { Injectable } from '@angular/core';
import {Pedido} from "../modelos/Pedido";
import {ProductosService} from "./productos.service";
import {Response} from "@angular/http";


@Injectable()
export class CarritoComprasService {


  pedidos: Array<Pedido>;

  constructor(private productosService: ProductosService) {
    this.pedidos = [];
  }

  agregarPedido(pedido:Pedido){
    this.pedidos.push(pedido);
  }

  pagarPedido(){
      this.pedidos = [];
  
  }


}
