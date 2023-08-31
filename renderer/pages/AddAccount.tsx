import React, {FC} from "react"
import {useRouter} from "next/router"
import {axiosInstance} from "../axios"
import {useErrorHandler} from "../hooks/useErrorHandler"
import {FormField} from "../../global-types"
import useHandleFormSubmit from "../hooks/useHandleFormSubmit/useHandleFormSubmit"
import {Form} from "../components/Global/Form"

const AddAccount: FC = () => {
	const router = useRouter()

	const fields: FormField[] = [
		{clientName: "Nazwa", devName: "name"},
		{clientName: "ClientID - Allegro", devName: "allegroClientId"},
		{clientName: "ClientSecret - Allegro", devName: "allegroClientSecret", size: "large"},
		{clientName: "Nazwa użytkownika - Fakturownia", devName: "fakturowniaName"},
		{clientName: "Token API - Fakturownia", devName: "fakturowniaToken"},
	]

	const handleAddAccount = (event, formData) => {
		useHandleFormSubmit(event, formData, fields, async () => {
			const {data: responseData} = await axiosInstance.post("/account", formData)
			await useErrorHandler(responseData, async () => {
				if (typeof window !== "undefined") {
					await router.push("/Home")
				}
			})
		})
	}

	return (
		<Form
			title={"Dodaj konto"}
			fields={fields}
			onSubmit={handleAddAccount}
		/>
	)
}

export default AddAccount