import { ocrQueue } from "../queues/ocr_queue.ts";

type JobData = {
    imageUrl: string;
}

const addJob = async (data: JobData) => {
    try {
        const jobId = await ocrQueue.add('ocr-job', {...data});
        console.log(`[+] Running job with id: ${jobId} on data: ${data}`);
        return jobId;
    } catch(error) {
        console.error(error);
        throw error;
    }
}

const getJobStatus = async (jobId: string) => {
    try {
        const status = await ocrQueue.getJobState(jobId);
        return status;
    } catch(error) {
        console.error(error);
        throw error;
    }
}

const getJobResult = async (jobId: string) => {
    try {
        const job = await ocrQueue.getJob(jobId);
        const result = job?.returnvalue;
        return result;
    } catch(error) {
        console.error(error);
        throw error;
    }
}

const ocrService = {
    addJob,
    getJobStatus,
    getJobResult,
}

export default ocrService;