import React, {useState, useEffect} from 'react';
import Base from '../core/Base';
import {isAuthenticated} from '../auth/helper/index';
import {Link }from 'react-router-dom';
import {getProducts, deleteProduct} from './helper/adminapicall';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const {user, token} = isAuthenticated();

    const preload = () => {
        getProducts().then(data => {
            if(data.error) {
                return console.log(data.error);
            } else {
                setProducts(data);
            }
        })
        .catch(err => console.log(err));
    }

    useEffect(()=> {
        preload();
    }, []);

    const goBack = () => (
        <div>
            <Link 
                className = 'btn btn-sm ma3 br-pill dim bg-pink white b' 
                to = '/admin/dashboard'
            >
                Admin Home
            </Link>
        </div>
    );

    const deleteThisProduct = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if(data.error) {
                return console.log(data.error)
            } else{
                preload();
            }
        })
        .catch(err => console.log(err));
    }

    return(
        <Base 
            title = 'Welcome to product management'
            description = 'Manage your products here...'
            className = 'container'
        >
            <div className="row bg3 mb3 shadow-3 br2">
                {goBack()}
                <div className="col-12">
                <h2 className="text-center my-3">Total {products.length} products</h2>
                {products.map((product, index) => {
                    return(
                        <div className="row text-center mb-2" key = {index}>
                            <div className="col-4">
                            <p className="f4">{product.name}</p>
                            </div>
                            <div className="col-4">
                            <Link
                                className="btn btn-outline-success br2"
                                to={`/admin/product/update/${product._id}`}
                            >
                                <span className="">Update</span>
                            </Link>
                            </div>
                            <div className="col-4">
                            <button 
                                onClick={() => {deleteThisProduct(product._id)}} 
                                className="btn btn-outline-danger br2"
                            >
                                Delete
                            </button>
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>
        </Base>
    );
}

export default ManageProducts;