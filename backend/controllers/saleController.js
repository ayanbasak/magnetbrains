import SaleModel from '../models/Sale.js'
import DateUtil from '../util/dateUtil.js';

class SaleController {
    static productUpload = async (req, res) => {
      const { product_name, quantity, amount } = req.body
        // console.log(">>> user: ",req.user)

       if(product_name && quantity && amount){
        const data = new SaleModel({
            productName: product_name,
            quantity: quantity,
            amount: amount,
            createdTime: DateUtil.getCurrentTime(),
            createdByUserId: req.user._id,
            createdByUsername: req.user.name
          })
          await data.save();
          res
          .status(201)
          .send({ status: "success", message: "Data Uploaded Successfully" })
       }else{
        res
        .status(400)
        .send({ status: "failed", message: "All fields are required" })
       }
    }

    static getAllProducts = async (req, res) => {
        const products = await SaleModel.find();  
        res
        .status(200)
        .send({ status: "success", message: "All Products Data Get successfully", data: products })
    }  

    static getTopProducts = async (req, res) => {
        const products = await SaleModel.find().sort({quantity: -1}).limit(5);  
        res
        .status(200)
        .send({ status: "success", message: "list of top 5 sold products", data: products })
    }

    static todaySold = async (req, res) => {
        const sales = await SaleModel.find({ createdTime: DateUtil.getCurrentTime() }); 
        let totalRevenue = 0.0;
        sales.forEach(sale => {
            totalRevenue += sale.amount;
        });

        res
        .status(200)
        .send({ status: "success", message: "sales data of today", data: sales, totalRevenue })
    }
  }
  
  export default SaleController