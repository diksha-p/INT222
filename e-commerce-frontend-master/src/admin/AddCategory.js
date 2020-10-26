import React, {useState} from 'react';
import Base from '../core/Base';
import {isAuthenticated} from '../auth/helper/index';
import {Link} from 'react-router-dom';
import {createCategory} from './helper/adminapicall';

const AddCategory = () => {

    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticated();

    const handleChange = event => {
        setError('');
        setName(event.target.value);
    }

    const onSubmit = () => {
        setError('');
        setSuccess(false);

        //backend request
        createCategory(user._id, token, {name})
        .then(data=> {
            if(data.error) {
                setError(data.error);
            } else {
                setError('');
                setSuccess(true);
                setName('');
            }
        })
    }

    const goBack = () => (
        <div className = 'mt3'>
            <Link 
                className = 'btn btn-sm mt3 br-pill dim bg-pink white b' 
                to = '/admin/dashboard'
            >
                Admin Home
            </Link>
        </div>
    );

    const successMessage = () => {
        if(success) {
            return (
                <p className = 'f4 center b green'>Category Created Successfully!</p>
            );
        }
    }

    const warningMessage = () => {
        if(error) {
            return (
                <div className = 'col col-12 tc'><p className = 'f4 red b'>{error}</p></div>
            );
        }
    }

    const createCategoryForm = () => {
        return(
            <form className="measure center ma3">
                <div  className="ba b--transparent ph0 mh0">
                    <div className="ma3">
                        <label className="db fw6 lh-copy f6">Enter Category Name</label>
                        <input 
                            className="pa2 br1 input-reset ba bg2 hover-bg-black hover-white w-100" 
                            type="text"
                            onChange = {handleChange}
                            value = {name}
                            placeholder = 'For ex: Summer'
                            autoFocus
                            required
                        />
                        <button onClick = {onSubmit} className="btn mt2 btn-block bg1 dim pointer f6 br2">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        );
    }

    return(
        <Base 
            title = 'Create a new category' 
            description = 'Add category for new t-shirts'
            className = 'container'
        >
            <div className = 'col col-md-8 offset-md-2 bg3 br2 shadow-3'>
                {successMessage()}
                {warningMessage()}
                {goBack()}
                {createCategoryForm()}
            </div>
        </Base>
    );
}

export default AddCategory;