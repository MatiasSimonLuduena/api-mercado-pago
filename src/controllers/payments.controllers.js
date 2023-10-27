import mercadopago from 'mercadopago';
import PayUser from '../models/payments.model.js';

export const createOrder = async (req, res) => {
    const token = process.env.TOKEN;
    const username = res.locals.responseData.username;

    try {
        mercadopago.configure({ access_token: token });

        const result = await mercadopago.preferences.create({
            items: [
                {
                    title: "Remera oversize",
                    unit_price: 5500,
                    currency_id: 'ARS',
                    quantity: 1
                }
            ],
            back_urls: {
                success: "http://localhost:5000/success",
                failure: "http://localhost:5000/failure",
                pending: "http://localhost:5000/pending"
            },
            notification_url: `https://dd31-200-114-221-25.ngrok.io/web-hook?username=${username}`
        })

        // guardar en db
        const user = await PayUser.findOneAndUpdate(
            { username },
            {
                $set: {
                    items: result.response.items,
                    payer: result.response.payer
                }
            },
            { new: true }
        );

        res.status(200).json({ user, url: result.response.init_point });
    } catch (error) {
        console.log(error);
    }
}

export const success = (req, res) => {
    res.send("ok");
}

export const webHook = async (req, res) => {
    const payment = req.query

    try {
        if (payment.type === "payment") {
            const user = await PayUser.findOneAndUpdate(
                { username: payment.username },
                {
                    $set: {
                        transactionId: payment['data.id'],
                        success: true
                    }
                }
            )
            return res.status(200).json({ user });
        }
        res.sendStatus(204)
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message)
    }
}

// users
export const createUser = async (req, res, next) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ error: "El username es incorrecto" })   
        }

        const existingUser = await PayUser.findOne({ username });

        if (existingUser) {
            const responseData = { existe: true, username }
            res.locals.responseData = responseData;
        } else {
            const newUser = new PayUser({ username });

            await newUser.save();

            const responseData = { existe: false, username }
            res.locals.responseData = responseData;
        }
        
        next()
    } catch (error) {
        return res.status(500).json({ error: "Error de servidor" })
    }
}