// dependencias
import React from 'react';
import { render } from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// componentes
import IniciarSesion from './src/componentes/IniciarSesion.jsx';
import App from './src/componentes/App.jsx';

render(
    <BrowserRouter>
        <Switch>
            <Route exact path = '/' component = {IniciarSesion} />
            <Route path = '/catalogo' component = {App} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
)
