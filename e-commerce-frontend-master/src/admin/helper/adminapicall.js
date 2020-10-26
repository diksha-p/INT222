import {API} from '../../Backend';

//category calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method : 'POST',
        headers : { 
            Accept : 'application/json',
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export const getCategories = () => {
    return fetch(`${API}/categories`)
    .then(response => response.json())
    .catch(err => console.log(err));
}

//product calls
//create a category
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method : 'POST',
        headers : { 
            Accept : 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : product
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}

//get all products
export const getProducts = () => {
    return fetch(`${API}/products`)
    .then(response => response.json())
    .catch(err => console.log(err));
}

//delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method : 'DELETE',
        headers : {
            Accept : 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}

//get a product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`)
    .then(response => response.json())
    .catch(err => console.log(err));
}

//update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method : 'PUT',
        headers : { 
            Accept : 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : product
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}