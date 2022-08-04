import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registrationFail, registrationStart, registrationSuccess } from '../../redux/actions/registration.action';

export const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.registration);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    })

    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    })

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const isValid = () => {
        let err = {};

        if(!user.name){
            err = {...err, name: "please enter your name"}
        }
     
        if(!user.email){
            err = {...err, email: "please enter your email"}
        }

        if (user.email && !/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/.test(user.email)){
            err = {...err, email: "please enter a valid email"}
        }

        if(!user.password){
            err = {...err, password: "please enter your password"}
        }

        if(user.password && user.password.length < 6){
            err = {...err, password: "password must be 6 characters long"}
        }

        if(!user.passwordConfirmation){
            err = {...err, passwordConfirmation: "please confirm your password"}
        }

        if(user.password && user.passwordConfirmation && user.passwordConfirmation != user.password){
            err = {...err, passwordConfirmation: "password and confirm password does not match"}
        }

        if(Object.keys(err).length > 0){
            setError(err);
            return false;
        } else {
            setError({});
            return true;
        }  
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log("Registration", user)
        if(isValid()){
            let data = {
                name: user.name,
                email: user.email,
                password: user.password,
                password_confirmation: user.passwordConfirmation,
            }
            dispatch(registrationStart())
            axios.post(process.env.REACT_APP_BACKEND_DOMAIN + "/api/user/register", data)
            .then(res => {
                dispatch(registrationSuccess(res.data))
                if(res.status === 201){
                    navigate("/login");
                }
            })
            .catch(err => {
                dispatch(registrationFail(err))
                console.log(">>> err.response: ",err.response.data.message)
                if(err.response.status === 400 && err.response.data.message === "Email already exists"){
                    setError({ email: "this email is already registered"});
                }
            })
        }
    }


  return (
    <div className='m-4'>
        <h1>Registration</h1>
        {loading ? <p>Loading...</p> : (
            <form onSubmit={onSubmit}>
                <div className='mb-3'>
                    <label className="form-label">Your Name</label>
                    <input className="form-control" type="text" placeholder='Your Name' name="name" value={user.name} onChange={onChange}/>
                    {!!error.name && <div className='invalid-feedback'>{error.name}</div>}
                </div>
                <div className='mb-3'>
                    <label className="form-label">Email</label>
                    <input className="form-control" type="text" placeholder='Email' name="email" value={user.email} onChange={onChange}/>
                    {!!error.email && <p className='invalid-feedback'>{error.email}</p>}
                </div>
                <div className='mb-3'>
                    <label className="form-label">Password</label>
                    <input className="form-control" type="password" placeholder='Password' name="password" value={user.password} onChange={onChange}/>
                    {!!error.password && <p className='invalid-feedback'>{error.password}</p>}
                </div>
                <div className='mb-3'>
                    <label className="form-label">Confirm Password</label>
                    <input className="form-control" type="text" placeholder='Confirm Password' name="passwordConfirmation" value={user.passwordConfirmation} onChange={onChange}/>
                    {!!error.passwordConfirmation && <p className='invalid-feedback'>{error.passwordConfirmation}</p>}
                </div>
                <button type="submit" className='btn btn-success'>submit</button>
            </form>
        )}
        
    </div>
  )
}