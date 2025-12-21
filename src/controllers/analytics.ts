import analyticsService from "../services/analytics.ts";


const getSpendingOverTime = async (req, res) => {
    try {
        
        const userId = "97fe3b8b-20d1-4e3d-93ba-d935777e5047";
        const spendingOverTime = await analyticsService.getSpendingOverTime(userId);
        res.status(200).json(spendingOverTime);
    } catch (error) {
        console.error("[ERROR] getSpendingOverTime controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

const getSpendingByCategory = async (req, res) => {
    try {
        const userId = "97fe3b8b-20d1-4e3d-93ba-d935777e5047";
        const spendingByCategory = await analyticsService.getSpendingByCategory(userId);
        res.status(200).json(spendingByCategory);

    } catch (error) {
        console.error("[ERROR] getSpendingByCategory: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

const getSpendingByVendor= async (req, res) => {
    try {
        const userId = "97fe3b8b-20d1-4e3d-93ba-d935777e5047";
        const spendingByVendor = await analyticsService.getSpendingByVendor(userId);
        res.status(200).json(spendingByVendor);

    } catch (error) {
        console.error("[ERROR] getSpendingByCategory: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}


const analyticsController = {
    getSpendingOverTime,
    getSpendingByCategory,
    getSpendingByVendor
    
}

export default analyticsController;