import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"
import {shell} from "electron"
import {UseLoginTypes} from "./useLogin.types"

export const useLogin = async ({account, setToken}: UseLoginTypes) => {
	const {data: loginResponseData} = await axiosInstance.get("/allegro/login", {params: {account: account}})
	useErrorHandler({responseData: loginResponseData, success: async () => {
		await shell.openExternal(loginResponseData.verification_uri_complete)
		shell.beep()
		const {data: tokenResponseData} = await axiosInstance.get("/allegro/token", {
			params: {
				account: account,
				deviceCode: loginResponseData.device_code
			}
		})
		setToken(tokenResponseData.access_token)
	}})
}