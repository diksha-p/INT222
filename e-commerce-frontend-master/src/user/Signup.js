import React, {useState} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import { signup } from '../auth/helper/index';

const Signup = () => {
    const [values, setValues] = useState({
        name : '',
        email : '',
        password : '',
        error : '',
        success : false
    });

    const {name, email, password, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error : false, [name] : event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error : false});
        signup({name, email, password})
        .then(data => {
            if(data.error) {
                setValues({...values, error : data.error, success : false});
            } else {
                setValues({
                    ...values,
                    name : '',
                    email : '',
                    password : '',
                    error : '',
                    success : true
                })
            }
        })
        .catch(error =>console.log(error));
    }

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                        className = 'alert alert-success'
                        style = {{display : success ? '' : 'none'}}
                    >
                        New account was created successfully. Please <Link to = '/signin'>Login Here</Link>
                    </div>
                </div>
            </div>
        );
    }

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                        className = 'alert alert-danger'
                        style = {{display : error ? '' : 'none'}}
                    >
                        {error}
                    </div>
                </div>
            </div>

        );
    }

    const signUpForm = () => {
        return(
            <div className="container">
                <div className="pa4 black-80 br2 shadow-3 bg3 col-12 col-md-6 offset-md-3">
                    <form className="measure center">
                        <div  className="ba b--transparent ph0 mh0">
                        <div className="mt3">
                                <label className="db fw6 lh-copy f6">Name</label>
                                <input 
                                    onChange = {handleChange('name')}
                                    value = {name}
                                    className="pa2 input-reset ba bg2 hover-bg-black hover-white w-100" type="text"
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6">Email</label>
                                <input
                                    onChange = {handleChange('email')}
                                    value = {email}
                                    className="pa2 input-reset ba bg2 hover-bg-black hover-white w-100" type="email"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6">Password</label>
                                <input 
                                    onChange = {handleChange('password')}
                                    value = {password}
                                    className="b pa2 input-reset ba bg2 hover-bg-black hover-white w-100" type="password"
                                />
                            </div>
                        </div>
                        <div>
                            <button onClick = {onSubmit} className="btn btn-block bg1 grow pointer f6 br2">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return(
        <Base title = 'Signup Page' description = 'User Signup'>
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
        </Base>
    );
}

export default Signup;