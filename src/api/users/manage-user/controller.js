const userModel = require("../common/model");

exports.updateProfile = (req, res) => {
    let email = req.params.email;
    console.log(email);
    let reqBody = req.body;
    userModel.updateOne({ email: email }, reqBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })

    /* const Person =await userModel.findOne({ email: email});

    Person.updateOne({}, {reqBody});
     */

}


exports.searchByEmail = (req, res) => {
    let email = req.params.email;
    userModel.aggregate([
        {$match:{email:email}},
        {$project:{password:0}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data[0]})
        }
    })
}


exports.searchByCont_no = (req, res) => {
    let cont_no = req.params.cont_no;
    
    userModel.aggregate([
        {$match:{cont_no:cont_no}},
        {$project:{password:0}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })}
