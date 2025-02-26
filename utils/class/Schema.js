// SIMPLE DEFINITION VALIDATION
class DefValidator {
	
	// PRIVATE 	
	static #REQUIRED_FIELDS = {
		type: "type"
	}

	// ENUMS???
	static #AVAILABLE_TYPES = {
		'string': "string",
		'number': "number",
		'object': "object",
		'array' : "array",
	}

	static #validateObj(obj ){
		if(typeof obj !== "object" || obj  === null || Array.isArray(obj) || obj.constructor !== Object){
				return null;
			}

		return obj;
	}


	// PUBLIC METHOD

	static validate(data) {
		// VALIDATE THE DEFINITION
		if(!this.#validateObj(data)) {
			console.error(`ERROR: ${data} must be an object "{}"`);
			return null
		};
		
		for(const prop in data){
			// CHECK IF PROP IS OBJECT
			if(!this.#validateObj(data[prop])){
				console.error(`ERROR: property "${prop}" of ${data} must be an object {}`);
				return null;
			}

			// CHECK IF PROP HAS A "TYPE" FIELD
			if(!data[prop].hasOwnProperty(this.#REQUIRED_FIELDS.type)){
				console.error(`ERROR: property "${prop}" is missing required field "${this.#REQUIRED_FIELDS.type}"`)
				return null;
			}

			// CHECK IF TYPE IS CORRECT
			if(!this.#AVAILABLE_TYPES[data[prop].type]){
				console.error(new Error(`ERROR: object with type value of ${data[prop].type} is not a valid type! Type must be of value: [${Object.keys(this.#AVAILABLE_TYPES)}]`));
				return null;
			}
		}

			
		return data;
	}
}




class Schema {
	constructor(definition){
		this.definition = DefValidator.validate(definition)	
	}
}


export default Schema;
