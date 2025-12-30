import analyticsService from "../services/analytics.ts";


const getAnalytics = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        let data = req.query;
        data.startDate = new Date(data.startDate);
        data.userId = user_id;
        const analytics = await analyticsService.getAnalytics(data);
        res.status(200).json(analytics);
    } catch (error) {
        console.error("[ERROR] getAnalytics controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

const  getCategoryAnalytics = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        let data = req.query;
        data.startDate = new Date(data.startDate);
        data.endDate = new Date(data.endDate);
        data.userId = user_id;
        const categoryAnalytics = await analyticsService.getCategoryAnalytics(data);
        res.status(200).json(categoryAnalytics);
    } catch (error) {
        console.error("[ERROR] getCategoryAnalytics controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

const getVendorAnalyitcs = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        let data = req.query;
        data.startDate = new Date(data.startDate);
        data.endDate = new Date(data.endDate);
        data.userId = user_id;
        const vendorAnalytics = await analyticsService.getVendorAnalytics(data);
        res.status(200).json(vendorAnalytics);
    } catch (error) {
        console.error("[ERROR] getVendorAnalytics controller: ", error);
        res.status(500).json({message: "Internal server error"});

    }
}

const analyticsController = {
    getAnalytics,
    getCategoryAnalytics,
    getVendorAnalyitcs,
    
}

export default analyticsController;