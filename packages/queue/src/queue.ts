import { Queue, Worker, Job } from 'bullmq';
import {Redis} from 'ioredis';

export const QUEUE_NAME = {
    "PROMPT_TO_AGENT":"PROMPT_TO_AGENT",
} 

export const JOB_NAME = {}

export const connection = new Redis("redis://127.0.0.1:6379", {maxRetriesPerRequest: null});

export const createQueue = (name: string) => {
  return new Queue(name, { connection });
};

export const createWorker = (
    name: string,
    processor: (job: Job) => Promise<void>,
) => {
    return new Worker(name, processor, {connection});
};

export const agentQueue = createQueue(QUEUE_NAME.PROMPT_TO_AGENT);

export type { Job } from 'bullmq';