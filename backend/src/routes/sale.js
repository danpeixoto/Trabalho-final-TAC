const express = require("express");
const Sale = require("../database/models/Sale");
const router = express.Router();


router.get("/",async(req,res)=>{
  try {
    const sale = await Sale.create({user_id:1,total_items:100,sale_date:Date.now(),total_value:10000})
    res.json(sale);
  } catch (error) {
    res.send("Server error...")
  }
});


module.exports = router;