import React, {FC} from "react"
import {useRouter} from "next/router"
import {axiosInstance} from "../axios"
import {useErrorHandler} from "../hooks/useErrorHandler"
import {FormField} from "../../types"
import useHandleFormSubmit from "../hooks/useHandleFormSubmit/useHandleFormSubmit"
import {Form} from "./components/Form"

const AddAccount: FC = () => {
	const router = useRouter()

	const fields: FormField[] = [
		{clientName: "Nazwa", devName: "name"},
		{clientName: "ClientID - Allegro", devName: "allegroClientId"},
		{clientName: "ClientSecret - Allegro", devName: "allegroClientSecret"},
		{clientName: "Nazwa użytkownika - Fakturownia", devName: "fakturowniaName"},
		{clientName: "Token API - Fakturownia", devName: "fakturowniaToken"},
	]

	const handleAddAccount = (event, formData) => {
		useHandleFormSubmit({
			event: event,
			data: formData,
			fields: fields,
			success: async () => {
				const {data: responseData} = await axiosInstance.post("/account", formData)
				useErrorHandler({
					responseData: responseData, success: async () => {
						if (typeof window !== "undefined") {
							await router.push("/Home")
						}
					}
				})
			}
		})
	}

	return (
		<Form
			title={"Dodaj konto"}
			fields={fields}
			onSubmit={handleAddAccount}
			previousPage={"/Home"}
		/>
	)
}

export default AddAccount