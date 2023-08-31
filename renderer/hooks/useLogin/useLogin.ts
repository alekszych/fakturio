import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"
import {shell} from "electron"
import {UseLoginTypes} from "./useLogin.types"

export const useLogin = async ({account, setToken, router}: UseLoginTypes) => {
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
		useErrorHandler({responseData: tokenResponseData, success: async () => {
			setToken(tokenResponseData.access_token)
			const {data: accountDataResponseData} = await axiosInstance.get("/account/data", {
				params: {account: account}
			})
			useErrorHandler({responseData: accountDataResponseData, success: async () => {
				if(accountDataResponseData && accountDataResponseData.length === 0){
					await router.push("/AccountData")
				} else {
					await router.push("/Offers")
				}
			}})
		}})
	}})
}