import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Button } from 'reactstrap';

export default class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaCancionesFav: [],
            cancionEliminar: [],
            cancionEditar: [],
            nombre: '',
            grupo: '',
            anio: 0,
            genero: '',
            Abierto: false,
            AbiertoEliminar: false,
            AbiertoEditar: false
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

        axios.post('http://localhost:5000/canciones/', singcancion)
            .then((response) => this.props.history.push("/"))
            .catch((error) => console.log(error));
    }

    eliminarCancion = (id) => {
        axios.delete("http://localhost:5000/canciones/" + id).then((response) => {
            console.log(JSON.stringify(response.data));
        });
    }

    editarCancion = (id) => {
        const editarcancion = {
            infocancion: {
                nombre: this.state.nombre,
                grupo: this.state.grupo,
                anio: parseInt(this.state.anio),
                genero: this.state.genero
            }
        }

        axios.patch('http://localhost:5000/canciones/' + id, editarcancion)
            .then((response) => this.props.history.push("/"))
            .catch((error) => console.log(error));
    }

    abrirModalIngresar = () => {
        this.setState({ Abierto: !this.state.Abierto })
    }

    abrirModalEliminar = (id) => {
        this.setState({ AbiertoEliminar: !this.state.AbiertoEliminar })
        axios.get("http://localhost:5000/canciones/" + id).then((response) => {
            this.setState({
                cancionEliminar: response.data
            });
        });
    }

    abrirModalEditar = (id) => {
        this.setState({ AbiertoEditar: !this.state.AbiertoEditar })
        axios.get("http://localhost:5000/canciones/" + id).then((response) => {
            this.setState({
                cancionEditar: response.data,
                nombre: response.data[0].nombre,
                grupo: response.data[0].grupo,
                anio: parseInt(response.data[0].anio),
                genero: response.data[0].genero
            });
        });
    }

    cerrarModal = () => {
        this.setState({
            Abierto: false,
            AbiertoEditar: false,
            AbiertoEliminar: false,
            nombre: "",
            grupo: "",
            anio: 0,
            genero: ""
        })
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
                <div id='Inicio' className='Fondo'>
                    <br />
                    <h3 className='Encabezado3'>Bienvenido <b>Manuel Mazón</b> a tus canciones favoritas</h3>
                    <h6 className='Encabezado6'>A continuación podrás gestionar tu lista de canciones preferidas.</h6>

                    <br />
                    <div >
                        <br />
                        <br />
                        <table className="table, tablaCanciones">
                            <thead className="fondoEncabezadoTabla">
                                <tr>
                                    <th className="borderTh1" scope="col">Nombre de la Canción</th>
                                    <th scope="col">Grupo</th>
                                    <th scope="col">Año</th>
                                    <th scope="col">Género</th>
                                    <th scope="col">
                                    </th>
                                    <th className="borderTh2" scope="col">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listaCancionesFav.map((item) => (
                                    <tr value={item.id}>
                                        <td>{item.nombre}</td>
                                        <td>{item.grupo}</td>
                                        <td>{item.anio}</td>
                                        <td>{item.genero}</td>
                                        <td><a onClick={() => this.abrirModalEditar(item._id)}><FontAwesomeIcon icon={faPencil} /></a></td>
                                        <td><a onClick={() => this.abrirModalEliminar(item._id)}><FontAwesomeIcon icon={faTrash} /></a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        <button className="agregarCan" onClick={() => this.abrirModalIngresar()}>+</button>
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
                            <Input type='text' name='anio' id='anio' onChange={(e) => this.hacerCambios(e)} placeholder="0" />
                        </FormGroup>
                        <FormGroup>
                            <Label for='genero'>Genero: </Label>
                            <Input type='text' name='genero' id='genero' onChange={(e) => this.hacerCambios(e)} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='success' onClick={() => { this.insertarCancion(); this.cerrarModal(); window.location.reload(); }}>Agregar Canción</Button>
                        <Button color='primary' onClick={() => this.cerrarModal() }>Cerrar</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.AbiertoEditar} style={modalStyles}>
                    <ModalHeader>
                        <h2><center>Edita los datos de la canción</center></h2>
                    </ModalHeader>
                    {this.state.cancionEditar.map((item) => (
                        <>
                            <ModalBody>
                                <form name="editar" id="editar">
                                <FormGroup>
                                    <Label for='nombre'>Nombre: </Label>
                                    <Input type='text' name='nombre' id='nombre' onChange={(e) => this.hacerCambios(e)} placeholder={item.nombre} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='grupo'>Grupo: </Label>
                                    <Input type='text' name='grupo' id='grupo' onChange={(e) => this.hacerCambios(e)} placeholder={item.grupo} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='anio'>Año: </Label>
                                    <Input type='text' name='anio' id='anio' onChange={(e) => this.hacerCambios(e)} placeholder={item.anio} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='genero'>Genero: </Label>
                                    <Input type='text' name='genero' id='genero' onChange={(e) => this.hacerCambios(e)} placeholder={item.genero} />
                                </FormGroup>
                                </form>

                            </ModalBody>
                            <ModalFooter>
                                <Button color='success' onClick={() => { this.editarCancion(item._id); this.cerrarModal(); window.location.reload(); }}>Editar Canción</Button>
                                <Button color='primary' onClick={() => this.cerrarModal()}>Cerrar</Button>
                            </ModalFooter>
                        </>
                    ))}
                </Modal>

                <Modal isOpen={this.state.AbiertoEliminar} style={modalStyles}>
                    <ModalHeader>
                        <h2><center>¿Estás seguro de querer eliminar esta canción?</center></h2>
                    </ModalHeader>
                    {this.state.cancionEliminar.map((item) => (
                        <>
                            <ModalBody>
                                <h4><center>{item.nombre}</center></h4>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='danger' onClick={() => { this.eliminarCancion(item._id); this.cerrarModal(); window.location.reload(); }}>Eliminar Canción</Button>
                                <Button color='primary' onClick={() => this.cerrarModal()}>Cerrar</Button>
                            </ModalFooter>
                        </>
                    ))}
                </Modal>
            </>
        )
    }
}
