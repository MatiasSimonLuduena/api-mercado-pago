import express from "express";

const router = express.Router();

import { createOrder, success, webHook } from "../controllers/payments.controllers.js"

router.post("/create-order", createOrder);

router.get("/success", success);

router.get("/failure", success);

router.get("/pending", success);

router.post("/web-hook", webHook);

export default router