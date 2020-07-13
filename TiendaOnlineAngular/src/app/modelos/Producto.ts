export class Producto{
  constructor(private _id: number, private _nombre:string, private _precio:number, private _stock: number, private _imagen:string){}

  get id(): number {
    return this._id;
  }

  get nombre(): string {
    return this._nombre;
  }

  get precio(): number {
    return this._precio;
  }

  get stock(): number {
    return this._stock;
  }

  get imagen(): string {
    return this._imagen;
  }

  set stock(value: number) {
    this._stock = value;
  }
}
