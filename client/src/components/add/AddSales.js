import React, { useState } from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addSalesDataFail, addSalesDataStart, addSalesDataSuccess } from '../../redux/actions/sales.action';

export const AddSales = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.sales);
    // const loading = false;
    const [sale, setSale] = useState({
        productName: "", 
        quantity: "", 
        amount: "" 
    })

    const [error, setError] = useState({
        productName: "", 
        quantity: "", 
        amount: "" 
    })

    const onChange = (e) => {
        setSale({...sale, [e.target.name]: e.target.value})
    }

    const isValid = () => {
        let err = {};

        if(!sale.productName){
            err = { ...err, productName: "please choose a product" }
        }

        if(!sale.quantity){
            err = { ...err, quantity: "please enter quantity" }
        }

        if(!sale.amount){
            err = { ...err, amount: "please enter amount" }
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
                product_name: sale.productName, 
                quantity: sale.quantity, 
                amount: sale.amount 
            }
            dispatch(addSalesDataStart())
            axios.post("/api/sales/add", data)
            .then(res => {
                // console.log(res.data)
                dispatch(addSalesDataSuccess(res.data));
                navigate("/all");
            })
            .catch(err => {
                if(err.response.status === 400){
                    dispatch(addSalesDataFail(err))
                }
            })
        }
    }

  return (
    <div className='m-4'>
        <h1>Add New Sales Record</h1>
        {loading ? <p>Loading...</p> : (
            <form onSubmit={onSubmit}>
                <div className='mb-3'>
                    <label className="form-label">product Name</label>
                    <input className="form-control" type="text" placeholder='Product Name' name="productName" value={sale.productName} onChange={onChange}/>
                    {!!error.productName && <p className='invalid-feedback'>{error.productName}</p>}
                </div>
                <div className='mb-3'>
                    <label className="form-label">quantity</label>
                    <input className="form-control" type="number" placeholder='Quantity' name="quantity" value={sale.quantity} onChange={onChange}/>
                    {!!error.quantity && <p className='invalid-feedback'>{error.quantity}</p>}
                </div>
                <div className='mb-3'>
                    <label className="form-label">amount in rupees</label>
                    <input className="form-control" type="number" placeholder='Amount' name="amount" value={sale.amount} onChange={onChange}/>
                    {!!error.amount && <p className='invalid-feedback'>{error.amount}</p>}
                </div>
                <button className='btn btn-success' type="submit">submit</button>
            </form>
        )}      
        
        <NavLink to="/all" className="d-block">
            <button className='btn btn-primary mt-4'>View Records</button>
        </NavLink>
    </div>
  )
}
