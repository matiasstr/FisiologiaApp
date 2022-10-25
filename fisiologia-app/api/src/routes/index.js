const { Router } = require("express");
const express = require('express')
const router = Router();
const usuarios = require("./usuarios");
const images = require("./images");


router.use(express.json({limit : '50mb'}))
router.use(express.urlencoded({limit: '50mb', extended: true}))

router.use("/usuarios", usuarios);
router.use("/images", images);

module.exports = router;