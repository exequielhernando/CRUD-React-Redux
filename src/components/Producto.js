import React, {Component} from 'react';

import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { borrarProducto } from '../actions/productosActions';

class Producto extends Component{

    eliminarProducto = () => {
        const { id } = this.props.info;
        this.props.borrarProducto(id);
    }
    
    render(){
        const {id, nombre, precio } = this.props.info;
        return(
            <li>
                <div>
                    <p>{nombre}</p>
                    <span>{precio}</span>
                </div>
                <div>
                    <Link to={ `productos/editar/${id}`} >Editar</Link>
                    <button onClick={this.eliminarProducto} type="button">Borrar</button>
                </div>
            </li>
        )
    }
}
export default connect(null, { borrarProducto })(Producto)