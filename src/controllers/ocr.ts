import ocrService from "../services/ocr.ts";

const addJob = async (req, res) => {
    try {
        const data = req.body;
        const jobId = await ocrService.addJob(data);
        res.status(200).json({status: "success", jobId});
    } catch (error) {
        console.log("[ERROR] addJob controller: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const getJobStatus = async (req, res) => {
    try {
        const jobId = req.params.id;
        const status = await ocrService.getJobStatus(jobId);
        res.status(200).json({status});
    } catch (error) {
        console.log("[ERROR] getJobStatus controller: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const getJobResult = async (req, res) => {
    try {
        const jobId = req.params.id;
        const jobResult = await ocrService.getJobResult(jobId);
        res.status(200).json(jobResult);
    } catch (error) {
        console.log("[ERROR] getJobResult: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const ocrController = {
    addJob,
    getJobStatus,
    getJobResult,
}

export default ocrController;