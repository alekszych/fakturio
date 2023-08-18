import React, {FC, useRef} from "react"
import {useRouter} from "next/router"
import {axiosInstance} from "../axios"
import {useErrorHandler} from "../hooks/useErrorHandler"
import {Account} from "../../types"

const AddAccount: FC = () => {
	const router = useRouter()
	const name = useRef<HTMLInputElement>()
	const allegroClientId = useRef<HTMLInputElement>()
	const allegroClientSecret = useRef<HTMLInputElement>()
	const fakturowniaToken = useRef<HTMLInputElement>()
	const fakturowniaName = useRef<HTMLInputElement>()
	const handleRegister = async () => {
		if(allegroClientId.current.value && allegroClientSecret.current.value && fakturowniaToken.current.value){
			const data: Account = {
				name: name.current.value,
				allegroClientId: allegroClientId.current.value,
				allegroClientSecret: allegroClientSecret.current.value,
				fakturowniaName: fakturowniaName.current.value,
				fakturowniaToken: fakturowniaToken.current.value
			}
			const {data: responseData} = await axiosInstance.post("/account", data)
			useErrorHandler({responseData: responseData, success: async () => {
				name.current.value = ""
				allegroClientId.current.value = ""
				allegroClientSecret.current.value = ""
				fakturowniaName.current.value = ""
				fakturowniaToken.current.value = ""
				if (typeof window !== "undefined") {
					await router.push("/Home")
				}
			}})
		} else {
			alert("Wprowadź wszystkie dane")
		}
	}
	return (
		<div className={"flex flex-col w-4/5 h-fit absolute left-5 right-5 top-5 bottom-5 m-auto pb-5 max-w-2xl"}>
			<h1 className={"text-white text-3xl mx-auto text-center mb-5"}>Dodaj nowe konto</h1>

			<label className={"mb-2"}>
				<p className={"text-white mb-1"}> Nazwa </p>
				<input className={"w-full h-8 rounded focus:outline-blue-300 px-2"} ref={name}/>
			</label>

			<label className={"mb-2"}>
				<p className={"text-white mb-1"}> ClientID (Allegro)</p>
				<input className={"w-full h-8 rounded focus:outline-blue-300 px-2"} ref={allegroClientId}/>
			</label>

			<label className={"mb-2"}>
				<p className={"text-white mb-1"}> ClientSecret (Allegro)</p>
				<input className={"w-full h-8 rounded focus:outline-blue-300 px-2"} type={"password"} ref={allegroClientSecret}/>
			</label>

			<label className={"mb-2"}>
				<p className={"text-white mb-1"}> Nazwa użytkownika (Fakturownia)</p>
				<input className={"w-full h-8 rounded focus:outline-blue-300 px-2"} ref={fakturowniaName}/>
			</label>

			<label className={"mb-2"}>
				<p className={"text-white mb-1"}> Token (Fakturownia)</p>
				<input className={"w-full h-8 rounded focus:outline-blue-300 px-2"} ref={fakturowniaToken}/>
			</label>

			<div className={"flex justify-center"}>
				<button className={"bg-white text-black h-fit w-fit py-2 px-20 rounded mt-5 max-w-full mr-10"}
				        onClick={() => router.push("/Home")}>
					Anuluj
				</button>
				<button className={"bg-white text-black h-fit w-fit py-2 px-20 rounded mt-5 max-w-full"}
				        onClick={handleRegister}>
					Dodaj konto
				</button>
			</div>

		</div>
	)
}

export default AddAccount