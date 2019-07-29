import React, { Component } from "react";

import { connect } from 'react-redux';
import { mostrarProducto, editarProducto } from '../actions/productosActions';

class EditarProducto extends Component{
    state = {
        nombre: '',
        precio: '',
        error: false
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        
        this.props.mostrarProducto(id) 
    }
    componentWillReceiveProps(nextProps, nextState){
        const { nombre, precio } = nextProps.producto;
        this.setState({
            nombre,
            precio
        })
    }
    nombreProducto = event =>{
        this.setState({
            nombre: event.target.value
        })        
    }
    precioProducto = event =>{
        this.setState({
            precio: event.target.value
        })
    }
    nuevoProducto = event =>{
        event.preventDefault();
        const { nombre, precio } = this.state;

        if(nombre === '' || precio === ''){
            this.setState({
                error:true
            });
            return;
        }
        this.setState({
            error:false
        })
        //Tomar el id
        const { id } = this.props.match.params;

        //Crear el objeto
        const infoProducto = {
            id,
            nombre, 
            precio
        }
        // console.log(infoProducto);
        
        //Actualizar el producto actual
        this.props.editarProducto(infoProducto);

        //Redireccionar
        this.props.history.push('/');
    }
    render(){
        const {nombre, precio, error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Agregar Nuevo Producto</h2>
                            <form onSubmit={this.nuevoProducto}>
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input defaultValue={nombre} onChange={this.nombreProducto} type="text" className="form-control" placeholder="Titulo" />
                                </div>
                                <div className="form-group">
                                    <label>Precio del Producto</label>
                                    <input defaultValue={precio} onChange={this.precioProducto} type="text" className="form-control" placeholder="Precio" />
                                </div>
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar cambios</button>
                            </form>
                            {error?
                                <div>
                                    Todos los campos son Obligatorios
                                </div>
                                :
                                ''
                            }

                        </div>
                    </div>
                </div>
            </div>
        )   
    }    
}
const mapStateToProps = state => ({
    producto:state.productos.producto
})
export default connect(mapStateToProps, { mostrarProducto, editarProducto })(EditarProducto);