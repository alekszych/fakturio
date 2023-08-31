import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"
import {shell} from "electron"
import {NextRouter} from "next/router"
import {useSaveItem} from "../useSaveItem"
import {useGetItem} from "../useGetItem"

export const useLogin = async (router: NextRouter) => {
	const account = useGetItem("account")
	const {data: loginResponseData} = await axiosInstance.get("/allegro/login", {params: {account: account}})
	await useErrorHandler(loginResponseData, async () => {
		await shell.openExternal(loginResponseData.verification_uri_complete)
		shell.beep()
		const {data: tokenResponseData} = await axiosInstance.get("/allegro/token", {
			params: {
				account: account,
				deviceCode: loginResponseData.device_code
			}
		})
		await useErrorHandler(tokenResponseData, async () => {
			useSaveItem("token", tokenResponseData.access_token)
			const {data: accountDataResponseData} = await axiosInstance.get("/account/data", {
				params: {account: account}
			})
			await useErrorHandler(accountDataResponseData, async () => {
				if (accountDataResponseData && accountDataResponseData.length === 0) {
					await router.push("/AccountData")
				} else {
					await router.push("/Offers")
				}
			}
			)
		}
		)
	})
}