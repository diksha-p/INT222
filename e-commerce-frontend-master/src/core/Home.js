import React, {useState, useEffect} from 'react';
import Base from './Base';
import Card from './Card';
import '../styles.css';
import {getProducts} from './helper/coreapicalls';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const preloadProducts = () => {
        getProducts().then(data => {
            if(data.error) {
                setError(data.error);
            } else{
                setProducts(data);
            }
        })
    }

    const errorMessage = () => {
        return error && (
            <h1 className = 'red'>Currently out of servide...</h1>
        );
    }

    useEffect(() => {
        preloadProducts();
    }, []);

    return(
        <Base title="Home Page" description="Welcome to the Tshirt Store">
            <div className = 'container'>
                {errorMessage()}
                <div className="row">
                    {products.map((product, index) => {
                        return(
                            <div key = {index} className="col-md-4 mb2">
                                <Card product = {product}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Base>
    );
}

export default Home;