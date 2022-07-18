const dbo = require("../db/conn");

exports.login = async (req, res)=>{
    const db = dbo.getDb();
    const admin = req.body;
    let admin_ = await db.collection("admin").findOne({username: admin.username});
    if(admin_){
        return res.status(200).send(admin_)
    }else{
        return res.status(404).send(admin_)
    }
}

exports.register = async (req, res)=>{
    const db = dbo.getDb();
    const admin = req.body;
    let response = await db.collection("admin").insertOne(admin);
    if(response.acknowledged){
        return res.status(200).send("success")
    }else{
        return res.status(404).send("failed")
    }
}
