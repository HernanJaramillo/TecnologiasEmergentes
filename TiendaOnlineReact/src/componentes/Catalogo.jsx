import React from 'react';
import * as request from 'superagent';
import Menu from './Menu.jsx';
import ItemProducto from './ItemProducto.jsx';
import Utilidades from '../../Utilidades';

class Catalogo extends React.Component {
    constructor() {
        super();
        this.state = {
            mostrarErrorCorreo: 'ocultar-elemento',
            mostrarErrorContrasena: 'ocultar-elemento',
            mostrarErrorForm: 'ocultar-elemento',
            msnErrorForm: 'Error desconocido',
            mensaje: 'mensaje desde el catalogo',
            productos: [],
            productosConsulta: [],
            codigoBusqueda: '',
            productosPedidos: []
        }
        this.getProductos();
    }
    render() {
        var indents = [];
        var productos = this.state.productosConsulta;
        for (var i = 0; i < productos.length; i++) {
            let producto = productos[i];
            indents.push(
                <div className="item-producto" key={i}>
                    <ItemProducto agregarPedido={this.agregarPedido.bind(this)} producto={producto} productosPedidos={this.state.productosPedidos} />
                </div>
            );
        }
        return (
            <div className="imagen-fondo-principal container-catalogo-productos">
                <Menu cantidadPedidos={Utilidades.productosPedidos.length} />
                <div className="panel-catalogo-productos panel panel-default">
                    <div className="panel-heading">
                        <span className="panel-title">Catálogo de productos</span>
                        <div className="formulario-buscar navbar-right">
                            <label htmlFor="buscador">¿Qué estás buscando?</label>
                            <input type="text" value={this.state.codigoBusqueda} onChange={this.busquedaProductos.bind(this)} />
                        </div>
                    </div>
                    <div className="panel-body">
                        {indents}
                    </div>
                </div>
            </div>
        );
    }
    /* ----------Agregamos Pedido--------*/
    agregarPedido(producto) {
        console.log('Utilidades: ', Utilidades.productosPedidos.length);
        console.log('Pedido agregado: ', producto);
        let indexPedido = -1;
        for (var index = 0; index < Utilidades.productosPedidos.length; index++) {
            var element = Utilidades.productosPedidos[index];
            if (element.id === producto.id) {
                indexPedido = index;
                break;
            }
        }
        if (indexPedido != -1) {
            Utilidades.productosPedidos[indexPedido].cantidadAComprar += producto.cantidadAComprar;
        } else {
            Utilidades.productosPedidos.push(producto);
        }
        this.setState({
            productosPedidos: Utilidades.productosPedidosAux
        });
    }
    
    /*-------Buscamos producto---------*/
    busquedaProductos(event) {
        let codigo = event.target.value;
        this.setState({ codigoBusqueda: event.target.value });
        let productos = this.state.productos;
        let productosConsulta = [];
        for (var index = 0; index < productos.length; index++) {
            var element = productos[index];
            if (element.nombre.includes(codigo)) {
                productosConsulta.push(element);
            }
        }
        this.setState({ productosConsulta: productosConsulta });
    }
    
    /*-----Obtenemos producto desde la base de datos firebase------*/
    getProductos() {
        request
            .get('https://tiendaonline-6a97f.firebaseio.com/Productos.json')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                console.log('productos existentes: ', res.body);
                let productosRecuperados = res.body;
                request
                    .get('https://tiendaonline-6a97f.firebaseio.com/pedidos.json')
                    .set('Content-Type', 'application/json')
                    .end((errPedido, resPedido) => {
                        console.log('pedidos existentes: ', resPedido.body);
                        let pedidosRecuperados = resPedido.body;
                        for (var index = 0; index < productosRecuperados.length; index++) {
                            var element = productosRecuperados[index];
                            for (var indexUtil = 0; indexUtil < Utilidades.productosPedidos.length; indexUtil++) {
                                var elementUtil = Utilidades.productosPedidos[indexUtil];
                                if (element.id == elementUtil.id) {
                                    productosRecuperados[index].stock -= elementUtil.cantidadAComprar;
                                }
                            }
                            for (let key in pedidosRecuperados) {
                                var pedido = pedidosRecuperados[key];
                                if (element.id == pedido.id) {
                                    productosRecuperados[index].stock -= pedido.cantidadAComprar;
                                }
                            }
                        }
                        this.setState({
                            productos: productosRecuperados,
                            productosConsulta: productosRecuperados
                        });
                    });
            });
    }
}

export default Catalogo;
