import axios from "axios";

async function apiFunction(methed, url, data, successCallback, errorCallback) {
	try {

		let dataFromServer = {}
		
		let option = {
			methed: methed,
			url: "http://192.168.252.31:8080/" + url,
			data: data,
		}

		option.methed = option.methed.toLocaleLowerCase()

		// console.log('====================================');
		// console.log("methed = ", option.methed);
		// console.log("url = ", option.url);
		// console.log("data = ", option.data);
		// console.log('====================================');


		if (option.methed == "put") {
			// console.log("put  ===   put  ===   put");
			dataFromServer = await axios.put(option.url, option.data)
		} else if (option.methed == "post") {
			// console.log("post  ===  post  ===  post");
			dataFromServer = await axios.post(option.url, option.data)
		} else {
			// console.log("else  ===  else  ===  else");
			dataFromServer = await axios(option);
		}

		let value = dataFromServer.data

		if (successCallback) {
			successCallback(value)
			return
		}
		return value

		// return successCallback ?  : value;
	} catch (error) {
		return errorCallback ? errorCallback(error) : console.log("err = ", JSON.stringify(error));
	}
}

export default apiFunction;
