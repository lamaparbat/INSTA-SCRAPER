import { Request, Response } from "express";
import * as services from "../services";
import { IResponse } from "../../../shared/types";

const getTags = async (req: Request, res: Response) => {
    try {
        const { instaId }: any = req.query;

        const response: IResponse = await services.getTaggedPosts({ instaId });

        res.send(response);
    } catch (error: any) {
        console.error(error);
        res.status(500).send({
            statusCode: 500,
            data: null,
            message: error.message,
        })
    }
}

const getProfile = async (req: Request, res: Response) => {
    try {
        const { instaId } = req.query;

        const response = { data: [], error: null };

        res.send(response);
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
    getTags,
    getProfile,
}