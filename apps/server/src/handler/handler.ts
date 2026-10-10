import type { Request, Response } from "express";
import { prisma } from "@repo/db";
import { errorDivider } from "@repo/utils";
import { logger } from "..";
import { agent } from "../agent/agent";

export const createProject = async (req:Request, res:Response):Promise<void> => {
    try {
        const {userId, input, dateTime} = req.body;
        const agentRes = await agent(input);
        console.log("AGENT-RES", agentRes);
        const newProject = await prisma.project.create({data:{userId}})
        if (!newProject) throw new Error("Failed to create Project");
        res.status(201).json({success:true,  message:"project created"})
    } catch (error) {
        errorDivider(error);
    }
}

export const getProject = async (req:Request, res:Response):Promise<void> => {
    try {
        const {userId} = req.params;
        const projects = await prisma.project.findMany({where:{userId}});
        res.status(200).json({success:true, data:projects});
    } catch (error) {
        errorDivider(error);
    }
}