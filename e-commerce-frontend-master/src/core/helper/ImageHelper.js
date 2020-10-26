import React from 'react';
import {API} from '../../Backend'

const ImageHelper = ({product}) => {
    const imageUrl = product ? 
                    `${API}/product/photo/${product._id}` 
                    : `https://images.pexels.com/photos/3577561/pexels-photo-3577561.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;
    return(
        <img 
            src = {imageUrl} 
            className = "db" 
            style={{maxHeight : '100%', maxWidth : '100%'}}
            alt = "Jesse Grant"
            title = {product.title}
        />
    );
}

export default ImageHelper;