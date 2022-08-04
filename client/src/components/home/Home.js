import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom'
import { logout } from '../../redux/actions/login.action';

export const Home = () => {  
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='m-4'>
        <h1>Home Page</h1>
        {isAuthenticated ? (
          <div className='mt-4'>
            <NavLink to="add">
              <button className='btn btn-primary mx-2'>Add New Sales Record</button>
            </NavLink>

            <NavLink to="all">
              <button className='btn btn-success mx-2'>View Records</button>
            </NavLink>
            
            <button  className='btn btn-danger mx-2' onClick={handleLogout}>logout</button>
          </div>
        ) : (
          <div className='mt-4'>
            <NavLink to="login">
              <button className='btn btn-primary mx-2'>Login</button>
            </NavLink>

            <NavLink to="registration">            
              <button className='btn btn-success mx-2'>Registration</button>
            </NavLink>
          </div>
        )}
        
    </div>
  )
}
