import analyticsService from "../services/analytics.ts";


const getAnalytics = async (req, res) => {
    try {
        const user_Id = "97fe3b8b-20d1-4e3d-93ba-d935777e5047"; // user id extracted later from req.user.user_id
        let data = req.query;
        data.startDate = new Date(data.startDate);
        data.userId = user_Id;
        const analytics = await analyticsService.getAnalytics(data);
        res.status(200).json(analytics);
    } catch (error) {
        console.error("[ERROR] getAnalytics controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

const  getCategoryAnalytics = async (req, res) => {
    try {
        const user_Id = "97fe3b8b-20d1-4e3d-93ba-d935777e5047"; // user id extracted later from req.user.user_id
        let data = req.query;
        data.startDate = new Date(data.startDate);
        data.endDate = new Date(data.endDate);
        data.userId = user_Id;
        const categoryAnalytics = await analyticsService.getCategoryAnalytics(data);
        res.status(200).json(categoryAnalytics);
    } catch (error) {
        console.error("[ERROR] getCategoryAnalytics controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

const getVendorAnalyitcs = async (req, res) => {
    try {
        const user_Id = "97fe3b8b-20d1-4e3d-93ba-d935777e5047"; // user id extracted later from req.user.user_id
        let data = req.query;
        data.startDate = new Date(data.startDate);
        data.endDate = new Date(data.endDate);
        data.userId = user_Id;
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