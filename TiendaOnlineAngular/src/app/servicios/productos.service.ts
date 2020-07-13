import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Pedido} from "../modelos/Pedido";
import {Producto} from "../modelos/Producto";
import 'rxjs/Rx';

@Injectable()
export class ProductosService {

  constructor(private http: Http) { }

  obtenerProductos(){
    return this.http.get("https://tiendaonline-6a97f.firebaseio.com/Productos/.json")
      .map((res: Response) => {
      	console.log(res.json());
      	return res.json();
      });
  }
  obtenerProductoPorId(id:number){
    return this.http.get("https://tiendaonline-6a97f.firebaseio.com/Productos/"+ (id) + "/.json")
      .map((res: Response) => res.json());
  }

}
