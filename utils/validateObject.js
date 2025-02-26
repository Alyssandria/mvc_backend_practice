export const validateObj = (obj) => {
if(typeof obj !== "object" || obj  === null || Array.isArray(obj) || obj.constructor !== Object){
				return null;
			}

		return obj;
}
