import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Button } from 'reactstrap';

export default class Inicio extends Component {
    state = {
        Abierto: false
    }

    constructor(props) {
        super(props);
        this.state = {
            listaCancionesFav: [],
            nombre: '',
            grupo: '',
            anio: 0,
            genero: ''
        };
        this.getCanciones();
    }

    hacerCambios = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    insertarCancion = () => {
        const singcancion = {
            infocancion: {
                nombre: this.state.nombre,
                grupo: this.state.grupo,
                anio: parseInt(this.state.anio),
                genero: this.state.genero
            }
        }
        console.log(JSON.stringify(singcancion))

        axios.post('http://localhost:5000/canciones/', singcancion)
            .then((response) => this.props.history.push("/"))
            .catch((error) => console.log(error));
    }

    abrirModalIngresar = () => {
        this.setState({ Abierto: !this.state.Abierto })
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
        const modalStyles = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
        return (
            <>
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
                    <button onClick={this.abrirModalIngresar} id="agregarCan">+</button>
                </div>
            </div>

            <Modal isOpen={this.state.Abierto} style={modalStyles}>
                <ModalHeader>
                    <h2><center>¡Ingresa la nueva canción!</center></h2>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for='nombre'>Nombre: </Label>
                        <Input type='text' name='nombre' id='nombre' onChange={(e) => this.hacerCambios(e)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='grupo'>Grupo: </Label>
                        <Input type='text' name='grupo' id='grupo' onChange={(e) => this.hacerCambios(e)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='anio'>Año: </Label>
                        <Input type='text' name='anio' id='anio' onChange={(e) => this.hacerCambios(e)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='genero'>Genero: </Label>
                        <Input type='text' name='genero' id='genero' onChange={(e) => this.hacerCambios(e)} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color='success' onClick={this.insertarCancion}>Agregar Canción</Button>
                    <Button color='primary' onClick={() => { this.abrirModalIngresar (); window.location.reload()}}>Cerrar</Button>
                </ModalFooter>
            </Modal>
            </>
        )
    }
}
