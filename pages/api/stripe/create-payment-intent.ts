import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface ResModel {
    clientSecret: string | null
}

export default async function handler(
    req: NextApiRequest,
	res: NextApiResponse<ResModel>
) {
    //Check if POST
    if(req.method !== "POST"){
        res.status(400);
        return;
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 99,
        currency: "eur",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    
    res.status(200).json({
        clientSecret: paymentIntent.client_secret,
    });
};
