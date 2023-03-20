const express = require("express");
const auth = require("../middleware/user");
const userRouter = express.Router();
const Farmer = require("../models/farmermodel");
const Company = require("../models/companymodel");

userRouter.post("/data", auth, async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.type === "1") {
      // he is a farmer'

      let farmer = Farmer({
        farmer_name: req.body.name,
        farmer_id: req.currentUser.uid,
        farmer_phno: req.body.phno,
        warehouse_address: req.body.address,
        farmer_pincode: req.body.pincode,
      });

      farmer = await farmer.save();

      res.json(farmer);
    } else {
      //  he is a company

      let company = Company({
        company_name: req.body.name,
        company_id: req.currentUser.uid,
        company_phno: req.body.phno,
        company_address: req.body.address,
        company_pincode: req.body.pincode,
      });
      console.log("i am in 2");

      company = await company.save();

      res.json(company);
    }

    console.log(req.currentUser);
  } catch (e) {
    console.log("i am here");
    res.status(500).json({ error: e.message });
  }
});

userRouter.get("/check-authentication", auth, async (req, res) => {
  try {
    const cid = await Company.findOne({ company_id: req.currentUser.uid });
    console.log("1");
    const fid = await Farmer.findOne({ farmer_id: req.currentUser.uid });
    console.log("fid is " + fid);
    console.log("cid is " + cid);
    if (fid != null) res.json(1);
    else if (cid != null) res.json(2);
    else res.json(0);
  } catch (e) {
    console.log("3");
    res.status(500).json({ error: e.message });
  }
});

module.exports = userRouter;
