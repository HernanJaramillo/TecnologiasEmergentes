import React from 'react';
import * as request from 'superagent';
import { Link, Redirect } from 'react-router-dom';
import Menu from './Menu.jsx';
import Utilidades from '../../Utilidades';

class Pedido extends React.Component {
    constructor() {
        super();
        this.state = {
            mostrarErrorCorreo: 'ocultar-elemento',
            totalPedido: 0,
            pedidocancelado: false
        }
    }
    componentWillMount() {
        let totalPedidos = 0;
        for (var index = 0; index < Utilidades.productosPedidos.length; index++) {
            var element = Utilidades.productosPedidos[index];
            totalPedidos += (element.cantidadAComprar * element.precio);
        }
        this.setState({
            totalPedido: totalPedidos
        });
    }
    render() {
        const { pedidocancelado } = this.state;
        if (pedidocancelado) {
            return (
                <Redirect to="/catalogo" />
            )
        }
        console.log(Utilidades.productosPedidos);
        var indents = [];
        for (var index = 0; index < Utilidades.productosPedidos.length; index++) {
            var element = Utilidades.productosPedidos[index];
            indents.push(<li className="media" key={index}>
                <a className="pull-left" href="javascript:;">
                    <img className="media-object imagen-pedidos" src={Utilidades.server + "src/img/" + element.imagen} />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">{element.nombre}</h4>
                    <label>Unidades:</label>{element.cantidadAComprar}<br />
                    <label>Precio:</label>${element.precio}<br />
                    <label>Subtotal:</label>${element.cantidadAComprar * element.precio}<br />
                </div>
            </li>);
        }
        return (
            <div className="imagen-fondo-principal">
                <Menu cantidadPedidos={Utilidades.productosPedidos.length} />
                <div className="panel-pedido-producto panel panel-default">
                    <div className="panel-heading">
                        <span className="panel-title">Carrito de Compras</span>
                    </div>
                    <div className="panel-body">
                        <div className="container-info">
                            <div className="lista-pedidos">
                                <ul className="media-list">
                                    {indents}
                                </ul>
                            </div>
                            <div className="total-pedido">
                                <h2>Total: ${this.state.totalPedido}</h2>
                                <a href="javascript:;" onClick={this.cancelarPedidos.bind(this)} className="boton-volver btn btn-default">Cancelar</a>
                                <a href="javascript:;" onClick={this.pagarPedidos.bind(this)} className="boton-volver btn btn-default">Pagar</a>
                            </div>
                        </div>
                        <Link to="/catalogo" className="boton-volver btn btn-default">Atras</Link>
                    </div>
                </div>
            </div>
        );
    }
    cancelarPedidos() {
        Utilidades.productosPedidos = {};
        this.setState({
            pedidocancelado: true
        });
    }
    pagarPedidos() {
        for (var index = 0; index < Utilidades.productosPedidos.length; index++) {
            var element = Utilidades.productosPedidos[index];
            request
                /* ----Enviamos el pedido a la base de datos firebase generando un nuevo registro----*/
                .post('https://tiendaonline-6a97f.firebaseio.com/pedidos.json')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(element))
                .end((err, res) => {
                    console.log(res.body);
                })
        }
        this.cancelarPedidos();
    }
}

export default Pedido;
