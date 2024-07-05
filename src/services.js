import axios from 'axios'
import usePPTRService from "./components/usePPTRService.js";

const service = axios.create({
	// withCredentials: true,
})
const responseTipValidator = function (rawResponse) {
	let response = rawResponse.data
	return new Promise((resolve, reject) => {
		if (response && response.code === 0) {
			resolve(response)
		} else {
			ElNotification({
				title: response.msg,
				type: 'error',
			})
			reject(response)
		}
	})
}
const {newPage}= usePPTRService()
export const PPTRService = Object.freeze({
	//getEnvSpecList
	async tester(){
		await newPage()
	}
})
