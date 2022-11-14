const { Router } = require("express");
const route = Router();
const {postImage, getImage, getImageByRef, getImageById, createDefaulImg} = require("../servicies/images.js");
const authMiddleware = require ('../middlewares/session');
const authRolMiddleware = require ('../middlewares/rolAdmin');
require("dotenv").config();

// route.get("/", authMiddleware, getImage)
route.get("/", getImage)
route.get("/getRef", getImageByRef)
// route.post("/post",  authMiddleware, authRolMiddleware, postImage);
route.post("/post", postImage);
route.get("/getId/:id", getImageById);


route.get("/precarga", createDefaulImg);
// route.put("/cambiar", putModificarAdmin)
// route.put("/eliminar", putElminar)

// route.post("/login", postLogin);
// route.put("/IProfile", putProfile)

module.exports = route;



