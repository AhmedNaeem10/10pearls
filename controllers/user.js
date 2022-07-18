const dbo = require("../db/conn");

exports.login = async (req, res)=>{
    const db = dbo.getDb();
    const user = req.body;
    let user_ = await db.collection("customer").findOne({username: user.username});
    if(user_){
        return res.status(200).send(user_)
    }else{
        return res.status(404).send(user_)
    }
}

exports.register = async (req, res)=>{
    const db = dbo.getDb();
    const user = req.body;
    let response = await db.collection("customer").insertOne(user);
    if(response.acknowledged){
        return res.status(200).send("success")
    }else{
        return res.status(404).send("failed")
    }
}
