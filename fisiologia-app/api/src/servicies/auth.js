const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../helpers/handlePassword");
const { Usuarios } = require("../DB/db");
const { tokenSign,verifyToken} = require("../helpers/handleJwt");
const { verify } = require("jsonwebtoken");

//Registro de nuevo usuario
const regController = async (req, res) => {
  try {
    req = matchedData(req);
    //encripta password
    const password = await encrypt(req.password);
    const body = { ...req, password };
    //Crea nuevo usuario
    const dataUser = await Usuarios.create(body);
    let data = {
      token: await tokenSign(dataUser.dataValues),
      user: dataUser.dataValues,
    };
    let user= await verifyToken(data.token);
    console.log("Algo!!!!",user)
    res.status(200).send(data.token);
  } catch (error) {
    res.status(404).send("ERROR_DE_REGISTRO");
    console.log(error);
  }
};

//Logueo y verificacion de actividad de usuario
const loginController = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await Usuarios.findOne({
      where: {
        email: req.email,
      },
    });
    //Verifica si existe el email en la BD de usuarios
    if (!user) {
      res.status(404).send("EMAIL_INEXISTENTE");
      return;
    }
    //Verifica la coincidencia del password con el email
    const hashPassword = user.dataValues.password;
    const check = await compare(req.password, hashPassword);
    if (!check) {
      res.status(402).send("PASSWORD_INVALIDO");
      return;
    };
    //Enmascara el Password para que no se vea por pantalla
    user.set("password", undefined, { strict: false });
    return res.send("USUARIO_LOGUEADO");
  } catch (error) {
    console.log(error);
    res.send("ERROR_DE_LOGUEO");
  }
};

module.exports = { regController, loginController };
