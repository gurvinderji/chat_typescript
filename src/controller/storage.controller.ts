import { Request, Response } from "express";
import { CatchError, TryError } from "../util/error";
import { downloadObject, isFileExist, uploadObject } from "../util/s3";

export const downloadFile = async (req: Request, res: Response)=>{
    try {
        const path = req.body?.path 
        if(!path)
            throw TryError("Failed to generate download url because path is missing", 400)

        const isExist = await isFileExist(path)

        if(!isExist)
            throw TryError("File doesn`t exist exists", 404)

        const url = await downloadObject(path)
        res.json({url})
    }
    catch(err)
    {
        CatchError(err, res, "Failed to generate download url")
    }
}

export const uploadFile = async (req: Request, res: Response)=>{
    try {
        const path = req.body?.path
        const type = req.body?.type
        
        if(!path || !type)
            throw TryError("Invalid request path or type is required", 400)

        const url = await uploadObject(path, type)
        res.json({url})
    }
    catch(err)
    {
        CatchError(err, res, "Failed to generate upload url")
    }
}