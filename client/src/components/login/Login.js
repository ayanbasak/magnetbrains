import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginFail, loginStart, loginSuccess } from '../../redux/actions/login.action';

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);
    const [user, setUser] = useState({
        email:'',
        password: ''
    })

    const [error, setError] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const isValid = () => {
        let err = {};

        if(!user.email){
            err = {...err, email: "please enter your email"}
        }

        if(!user.password){
            err = {...err, password: "please enter your password"}
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
        // console.log("Login", user)

        if(isValid()){
            let data = {
                email: user.email,
                password: user.password,
            }
            dispatch(loginStart())
            axios.post(process.env.REACT_APP_BACKEND_DOMAIN + "/api/user/login", data)
            .then(res => {
                // console.log(res.data)
                dispatch(loginSuccess(res.data));
                navigate("/");
            })
            .catch(err => {
                if(err.response.status === 400){
                    err = { email: "please provide valid email and password", password: "please provide valid email and password" }
                    setError(err);
                    dispatch(loginFail(err))
                }
            })
        }
    }
  return (
    <div className='m-4'>
        <h1>Login</h1>
        {loading ? <p>Loading...</p> : (
            <form onSubmit={onSubmit}>
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
                <button className='btn btn-success' type="submit">submit</button>
            </form>
        )}       
    </div>
  )
}
