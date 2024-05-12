import { Request, Response } from "express";
import * as services from "../services";

const getMediaByPath = async (req: Request, res: Response) => {
    try {
        const { filepath }: any = req.params;

        const response: any = await services.getMediaByPath({ filepath });
        if (response?.error) res.send(response);

        res.sendFile(response?.data);
    } catch (error: any) {
        console.error(error);
        res.status(500).send({
            statusCode: 500,
            data: null,
            message: error.message,
        })
    }
}


export {
    getMediaByPath,
}