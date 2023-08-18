import React, {FC, useContext, useState} from "react"
import {shell} from "electron"
import {AuthContext} from "../../_app"
import {useRouter} from "next/router"
import {axiosInstance} from "../../../axios"
import {useErrorHandler} from "../../../hooks/useErrorHandler"

export const LoginButton: FC = () => {
	const router = useRouter()
	const {setToken, account} = useContext(AuthContext)
	const [buttonClicked, setButtonClicked] = useState(false)
	const login = async () => {
		setButtonClicked(true)
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
			if (typeof window !== "undefined") {
				await router.push("/Offers")
			}
		}})
	}

	return (
		<div className={"flex w-fit h-fit flex-col items-center content-center mx-2.5"}>
			<button className={"bg-white text-black h-fit w-fit py-2 px-20 rounded"}
					        onClick={login}>
				{!buttonClicked	? <p> Zaloguj </p> : <p> Ponów próbę logowania </p>}
			</button>
		</div>
	)
}