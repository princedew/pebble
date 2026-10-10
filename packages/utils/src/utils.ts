import pino from "pino";
const logger = pino();

export function errorDivider(error:unknown) {
    if (error instanceof Error) {
        logger.error(`ERROR: ${error.message}`);   
        throw new Error(error.message);
    }else{
        logger.error(`ERROR: ${error}`);   
    }
}