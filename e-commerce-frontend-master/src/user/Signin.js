import React, {useState} from 'react';
import Base from '../core/Base';
import {Redirect} from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../auth/helper/index';

const Signin = () => {
    const [values, setValues] = useState({
        email : '',
        password : '',
        error : '',
        loading : false,
        didRedirect : false
    });

    const {email, password, error, loading, didRedirect} = values;

    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error : false, [name] : event.target.value});
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({
            ...values, 
            error : false,
            loading : true
        });
        signin({email, password})
        .then(data => {
            if(data.error) {
                setValues({
                    ...values, 
                    error : data.error,
                    loading : false
                }); 
            } else {
                authenticate(data, ()=> {
                    setValues({
                        ...values,
                        email : '',
                        password : '',
                        error : '',
                        didRedirect : true
                    })
                })
            }
        })
        .catch(err => console.log('signin request failded'));
    }

    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
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

    const signInForm = () => {
        return(
            <div className="container">
                <div className="pa4 black-80 br2 shadow-3 bg3 col-12 col-md-6 offset-md-3">
                    <form className="measure center">
                        <div  className="ba b--transparent ph0 mh0">
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg2 hover-bg-black hover-white w-100" 
                                    onChange = {handleChange('email')}
                                    value = {email}
                                    type="email"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg2 hover-bg-black hover-white w-100" 
                                    onChange = {handleChange('password')}
                                    value = {password}
                                    type="password"
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

    const performReDirect = () => {
        if(didRedirect) {
            if(user && user.role === 1) {
                return <Redirect to = '/admin/dashboard'/>
            } else{
                return <Redirect to = '/user/dashboard'/>

            }
        }

        if(isAuthenticated()) {
            return <Redirect to = '/' />
        }
    }

    return(
        <Base title = 'Signin Page' description = 'User Signin'>
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performReDirect()}
        </Base>
    );
}

export default Signin;