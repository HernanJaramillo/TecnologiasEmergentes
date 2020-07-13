import { Pipe, PipeTransform } from '@angular/core';
import {Producto} from "../modelos/Producto";

@Pipe({
  name: 'pipeProductos'
})
export class PipeProductosPipe implements PipeTransform {

  transform(items: Producto[], args?: string): any {
    console.log(args, items);

    if(!items || !args){
      return items;

    }

    return items.filter(item => item.nombre.toLowerCase().indexOf(args.toLowerCase()) !== -1);
  }
}
