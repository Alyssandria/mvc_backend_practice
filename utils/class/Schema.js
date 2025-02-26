import { validateObj } from "../validateObject.js";

// SIMPLE DEFINITION VALIDATION
class DefValidator {
	
	// PRIVATE 	
	static #FIELDS = {
		type: "type",
		required: "required",
	}

	// ENUMS???
	static #AVAILABLE_TYPES = {
		'string': "string",
		'number': "number",
		'object': "object",
		'array' : "array",
	}
	// PUBLIC METHOD

	static validate(data) {
		// VALIDATE THE DEFINITION
		if(!validateObj(data)) {
			console.error(`Invalid Type error: ${data} must be an object "{}"`);
			return null
		};
		
		for(const prop in data){
			// CHECK IF PROP IS OBJECT
			if(!validateObj(data[prop])){
				console.error(`Invalid Type error: property "${prop}" of ${data} must be an object {}`);
				return null;
			}

			// CHECK IF PROP HAS A "TYPE" FIELD
			if(!data[prop].hasOwnProperty(this.#FIELDS.type)){
				console.error(`ERROR: property "${prop}" is missing required field "${this.#FIELDS.type}"`)
				return null;
			}

			// CHECK IF TYPE IS CORRECT
			if(!this.#AVAILABLE_TYPES[data[prop].type]){
				console.error(new Error(`ERROR: object with type value of ${data[prop].type} is not a valid type! Type must be of value: [${Object.keys(this.#AVAILABLE_TYPES)}]`));
				return null;
			}

			if(data[prop].hasOwnProperty(this.#FIELDS.required) && typeof data[prop].required !== "boolean"){
				console.error(new Error(`Invalid Type error: type of required field must be of type "boolean"`));
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

	getRequiredFields(){
		if(!this.definition) return null
		const requiredArr = [];
		const def = this.definition
		for(const property in def){
			if(def[property].hasOwnProperty("required") && def[property].required){
				requiredArr.push(property);
			}
		}

		return requiredArr;
	}

	validate(data){
		if(!this.definition) return null
		if(!validateObj(data)) {
			console.error(new Error("Invalid type error: Data must be a valid object '{}'"))
			return null;
		}

		// CHECK MISSING REQUIRED FIELDS
		const required = this.getRequiredFields();
		const presentRequiredFields = [];
		required.forEach(el => {
			if(data[el]){
				presentRequiredFields.push(el);
			}
		})

		if(required.length !== presentRequiredFields.length){
			return {
				ok: false,
				message: "Schema Validation Error: Required fields missing",
				error: {
					missingFields: required.filter(el => !presentRequiredFields.includes(el))
				}
			}
		}	

		// CHECK FOR UNDEFINED SCHEMA FIELDS
		const unknownFields = Object.keys(data).filter(el => !Object.keys(this.definition).includes(el))
		if(unknownFields.length){
			return{
				ok: false,
				message: "Schema Validation Error: Undefined Fields",
				error: {
					undefinedFields: unknownFields
				}
			}		
		}
		
		// CHECK INVALID TYPES
		const invalidTypes = [];

		for(const prop in data){
			const currentType = this.definition[prop].type;
			if((currentType === "array" && !Array.isArray(data[prop])) || (currentType === "object" && !validateObj(data[prop]))){
				invalidTypes.push(prop)
			}
			if(typeof data[prop] !== this.definition[prop].type){
				invalidTypes.includes(prop) || invalidTypes.push(prop);
			}
		}

		// IF THERE ARE INVALID TYPES
		if(invalidTypes.length){
		return {
			ok: false, 
			message: "Schema Validation Error: Invalid Type Detected",
			error: {
					invalidTypes: invalidTypes 
				}
			}
		}


		// IF VALID
		return {
			ok: true, 
			message: "Data is valid",
			error: null
		}
		
	}

}


export default Schema;
