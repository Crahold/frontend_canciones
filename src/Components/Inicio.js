import React, { Component } from 'react';
import axios from 'axios';

export default class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaCancionesFav: []
        };
        this.getCanciones();
    }

    getCanciones() {
        axios.get("http://localhost:5000/canciones/").then((response) => {
            this.setState({
                listaCancionesFav: response.data
            });
            console.log("Datos recibidos:" + JSON.stringify(response.data));
        });
    }

    render() {
        return (
            <div id='Inicio'>
                <br />
                <h3>¡¡Bienvenido <b>Usuario6480</b> a tus canciones favoritas!!</h3>
                <h6>A continuación podrás gestionar tu lista de canciones preferidas.</h6>

                <br />
                <div className='tablaCanciones'>
                    <h2>Tu Lista</h2>
                    <table>
                        <thead>
                            <tr>
                                <th><center>Nombre de la Canción</center></th>
                                <th><center>Grupo</center></th>
                                <th><center>Año</center></th>
                                <th><center>Género</center></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listaCancionesFav.map((item) => (
                                <tr value={item.id}>
                                    <td>{item.nombre}</td>
                                    <td>{item.grupo}</td>
                                    <td>{item.anio}</td>
                                    <td>{item.genero}</td>
                                    <td>Editar</td>
                                    <td>Eliminar</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br/>
                    <button id="agregarCan">+</button>
                </div>
            </div>
        )
    }
}
