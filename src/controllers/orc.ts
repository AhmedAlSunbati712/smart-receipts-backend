import orcService from "../services/orc.ts";

const addJob = async (req, res) => {
    try {
        const data = req.data;
        const jobId = await orcService.addJob(data);
        res.status(200).json({status: "success", jobId});
    } catch (error) {
        console.log("[ERROR] addJob controller: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const getJobStatus = async (req, res) => {
    try {
        const jobId = req.params.id;
        const status = await orcService.getJobStatus(jobId);
        res.status(200).json({status});
    } catch (error) {
        console.log("[ERROR] getJobStatus controller: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const getJobResult = async (req, res) => {
    try {
        const jobId = req.params.id;
        const jobResult = orcService.getJobResult(jobId);
        res.status(200).json(jobResult);
    } catch (error) {
        console.log("[ERROR] getJobResult: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

const orcController = {
    addJob,
    getJobStatus,
    getJobResult,
}

export default orcController;