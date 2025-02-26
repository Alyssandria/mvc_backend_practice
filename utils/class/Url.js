// HELPER URL CLASS

class Url {

	// RETURNS AN ARRAY OF SEGMENTS
	static getSegments(url){
		if(typeof url !== "string"){
			console.error(`Invalid url: Must be of type string`);
			return;
		}

		return url === "/" ? [url] : url.split("/").filter(el => el !== "");

	}


	// RETURNS SEGMENT LENGTH
	static getSegmentLength(url){
		const segments = this.getSegments(url);

		if(!Array.isArray(segments)){
			console.error(`Invalid url: Must be of type string`);
			return;
		}


		return segments.length;
	}
	
	// RETURNS A SEGMENT STRING
	static getSegmentPosition(url, position){
		if(typeof url !== "string"){
			console.error(`Invalid url: Must be of type string`);
			return;
		}

		if(isNaN(position)){
			console.error(`Error: Invalid ${position} must be of type number`);
			return;
		}
		
		if(position > this.getSegmentLength(url)){
			console.error("Error: position value is out of range!");
			return;
		}

		return `/${this.getSegments(url)[position]}`;
	}
}

export default Url;
