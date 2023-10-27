import mongoose from "mongoose";



// item
const itemSchema = new mongoose.Schema({
    id: String,
    category_id: String,
    currency_id: { type: String, default: "ARS" },
    description: String,
    title: String,
    quantity: Number,
    unit_price: Number
});

// payer
const identificationSchema = new mongoose.Schema({
    number: String,
    type: String
});

const addressSchema = new mongoose.Schema({
    zip_code: String,
    street_name: String,
    street_number: Number
});

const phoneSchema = new mongoose.Schema({
    area_code: String,
    number: String
});

const payerSchema = new mongoose.Schema({
    phone: phoneSchema,
    address: addressSchema,
    email: String,
    identification: identificationSchema,
    name: String,
    surname: String,
    date_created: Date,
    last_purchase: Date
});

// global
const payUserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    transactionId: { type: String, default: "" },
    success: { type: Boolean, default: false },
    items: [itemSchema],
    payer: payerSchema
}, { 
    versionKey: false, timestamps: true 
});

const PayUser = mongoose.model('pay-user', payUserSchema);

export default PayUser;