import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getSalesDataFail, getSalesDataStart, getSalesDataSuccess } from '../../redux/actions/sales.action';

export const Sales = () => {
    const dispatch = useDispatch();
    const { loading, sales } = useSelector((state) => state.sales);
    const options = [ "all", "top 5", "today" ]

    useEffect(()=> {
        fetchSalesData("all");
    }, [])
    
    const fetchSalesData = (type) => {
        let uri = "";
        if(type === "top 5"){
            uri = "/api/sales/top-products";
        }else if(type === "today"){
            uri = "/api/sales/today-sold";
        }else{
            uri = "/api/sales/all";
        }

        dispatch(getSalesDataStart())
        axios.get(uri)
            .then(res => {
                dispatch(getSalesDataSuccess(res.data.data));
            })
            .catch(err => {
                if(err.response.status === 400){
                    dispatch(getSalesDataFail(err))
                }
            })
    }
    
    const totalRevenue = useMemo(() => {
        let total = 0;
        sales.forEach(sale => {
            total += sale.amount
        });
        return total;
    }, [sales]);
   
  return (
    <div className='p-4'>
        <h1>Sales Record</h1>

        <NavLink to="/add">
            <button className='btn btn-success'>Add New Sales Record</button>
        </NavLink>

        <select onChange={(e)=> fetchSalesData(e.target.value)} className="form-select select-input float-end">
            {options.map((option, i)=>(
                <option key={i} value={option}>{option}</option>
            ))}
        </select>
             
        {!loading && (
            <table className="table table-striped table-hover border border-dark m-2 mt-4">
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Day</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, i)=>(
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{sale.productName}</td>
                            <td>{sale.quantity}</td>
                            <td>{sale.amount} ₹</td>
                            <td>{sale.createdTime}</td>
                        </tr>
                    ))} 
                    
                    {sales.length === 0 && (
                        <tr>
                            <td colSpan={5}>No Record Found</td>
                        </tr>
                    )} 
                </tbody>
            </table>           
        )}
        {!loading && sales.length > 0 && (
            <strong className='text-bold float-end mr-2'>Total Revinue: {totalRevenue} ₹</strong>
        )}
    
        
        <NavLink to="/" className="d-block mt-4">
            <button className='btn btn-primary'>Back to Home</button>
        </NavLink>
    </div>
  )
}


