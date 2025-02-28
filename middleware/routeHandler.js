import { dashboard } from "../routes/dashboard.routes.js";
import { noteRoutes } from "../routes/notes.routes.js";
import { CONSTANTS } from "../utils/constants.js";

export const routeHandler = async (req, res) => {
	const {url} = req;

	// TODO: HANDLE PRIVATE ROUTES
	
	if(url.startsWith(CONSTANTS.ROUTES.API_DASHBOARD)){
		await dashboard(req,res);
	}

	if(url.startsWith(CONSTANTS.ROUTES.API_NOTES)){
		await noteRoutes(req, res);
	}
	
};
