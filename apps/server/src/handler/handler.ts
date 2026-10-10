import type { Request, Response } from "express";
import { prisma } from "@repo/db";
import { logger } from "..";

export const createProject = async (req:Request, res:Response):Promise<void> => {
    try {
        const {userId, input, dateTime} = req.body;
        const newProject = await prisma.project.create({data:{userId}})
        if (!newProject) {
            throw new Error("Failed to create Project");
        }
        res.status(201).json({success:true, message:"project "})
    } catch (error) {
     logger.error(`ERROR: ${error.message}`);   
    }
}

export const getProject = async (req:Request, res:Response):Promise<void> => {
    try {
        const {userId} = req.params;
        const projects = await prisma.project.findMany({where:{userId}});
        res.status(200).json({success:true, data:projects});
    } catch (error) {
         logger.error(`ERROR: ${error.message}`);   
    }
}