import express from "express";

const router = express.Router();

import { createOrder, success, webHook, createUser } from "../controllers/payments.controllers.js"

// payments
router.post("/create-order", createUser, createOrder);

router.get("/success", success);

router.get("/failure", success);

router.get("/pending", success);

router.post("/web-hook", webHook);

export default router