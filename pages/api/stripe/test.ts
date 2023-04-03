import { NextApiRequest, NextApiResponse } from "next";

interface ResModel {
    clientSecret: string
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

    res.status(200).json({
        clientSecret: "test",
    });
};
