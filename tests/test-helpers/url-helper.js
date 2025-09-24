
export class URLHelper {

	static async addURLParameter(URL, Parameter) {
		let testURL = URL;
    testURL = URL + "?testmode&optimizely_disable=true&experiment_disable=true"
		if (Parameter != "") {
			testURL = testURL + "&" + Parameter;
		}
		return testURL;
	}

}
