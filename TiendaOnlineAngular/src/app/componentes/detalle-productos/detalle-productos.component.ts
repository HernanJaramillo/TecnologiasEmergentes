import { Component, OnInit } from '@angular/core';
import {Producto} from "../../modelos/Producto";
import {ProductosService} from "../../servicios/productos.service";
import {ActivatedRoute} from "@angular/router";
import {Response} from "@angular/http";

@Component({
  selector: 'detalle-productos',
  templateUrl: './detalle-productos.component.html',
  styleUrls: ['./detalle-productos.component.css']
})
export class ProductoDetallesComponent implements OnInit {

  producto: Producto;

  constructor(private productosService: ProductosService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params =>{
        var idProducto = params['id'];

        this.productosService.obtenerProductoPorId(parseInt(idProducto)).subscribe(
          (data: Response) =>{
            console.log(Response)
            this.producto = JSON.parse(JSON.stringify(data));
          }


        )
      }
    )
  }

}
