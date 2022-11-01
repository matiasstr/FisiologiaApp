require("dotenv").config();
const {axios} = require("axios")
const { verify } = require("jsonwebtoken");
const { Planes } = require("../DB/db");
const { Usuarios } = require("../DB/db");
const request = require("request");
const CLIENT =
  "AQQ6HIO71HvXznp7nZpLFfeVfmzyJfc3PRwvA36mCLV8lWq9Vv34gs-1OE4r6SEUBSSZPw_nl4FuMVnt";
const SECRET =
  "EL3kdkr61kGl7sztXRAmgptScwDAT-TRnWnPB8hjM34gj6PLeiYPaO5J8kAXmxS9ofs2Oo6TAezYvTzk";
const PAYPAL_API = "https://api-m.sandbox.paypal.com"; // Live https://api-m.paypal.com
const auth = { user: CLIENT, pass: SECRET };

const generateSubscription = async (req, res) => {
  try {
    let body = req.body;

    let objetoSub = body[0];
    let tokenParseado = JSON.parse(body[1]);
    const dataUser = verify(tokenParseado, "jwtsecretcambiar");

    let userUpdate = await Usuarios.update(
      { isSuscrip: true, suscipData: objetoSub },
      {
        where: {
          id: dataUser.id,
        },
      }
    );

    res.status(200).json({ msg: "Usuario suscripto" });
  } catch (error) {
    res.status(400).json({ msg: "Problema en la suscripcion" });
  }
};

const cancelSubscription = async(req,res)=>{

  try {
    let {key} = req.body;

    const dataUser = verify(key, "jwtsecretcambiar");


    console.log(dataUser.id)

    let usuarioCancel =await Usuarios.findOne({
      where: {
        id: dataUser.id
      }
    })

    console.log(usuarioCancel.dataValues.suscipData.subscriptionID)
    
    let subId = usuarioCancel.dataValues.suscipData.subscriptionID

    // let cancel = await axios.post(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subId}/cancel`, {
    //   "reason": "Not satisfied with the service"
    // }, {
    //   headers: {
    //     //aca van los headers del postman, a chequear como lo hago
    //   }
    // })




  } catch (error) {
    console.log(error)
  }

};


module.exports = {
  generateSubscription,
  cancelSubscription
};