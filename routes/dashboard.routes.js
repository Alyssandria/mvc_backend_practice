import DashboardController from "../controllers/dashboardController.js";

// DASHBOARD 
export const dashboard = async (req, res) => {
	const token = req.headers['authorization'].split("Bearer ")[1];
	return DashboardController.getUserDetails(res, token);
}
