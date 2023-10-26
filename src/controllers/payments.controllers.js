import mercadopago from 'mercadopago';

export const createOrder = async (req, res) => {
    const token = "TEST-1928547186515504-102523-fa748456dacb64eb7e0fe3fe12d16597-1524016003";
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
            notification_url: "https://1695-200-114-221-25.ngrok.io/web-hook"
        })

        res.send(result.body)
    } catch (error) {
        console.log(error);
    }
}

export const success = (req, res) => {
    res.send("ok");
}

export const webHook = async (req, res) => {
    const payment = req.query
    // podemos guardar los query en db type=payment (pago) id=x (id de transaccion)

    try {
        if (payment.type === "payment") {
            const data = await mercadopago.payment.findById(payment['data.id']);
            console.log(data);
        }
        res.sendStatus(204)   
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}