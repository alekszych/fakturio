import React, {FC, useContext, useEffect, useState} from "react"
import {AuthContext} from "./_app"
import {useRouter} from "next/router"
import {axiosInstance} from "../axios"
import {useErrorHandler} from "../hooks/useErrorHandler"
import {AccountData, FormField} from "../../global-types"
import useHandleFormSubmit from "../hooks/useHandleFormSubmit/useHandleFormSubmit"
import {Form} from "../components/Global/Form"

const AccountData: FC = () => {
	const {account} = useContext(AuthContext)
	const router = useRouter()
	const [prevAccountData, setPrevAccountData] = useState<AccountData>()

	useEffect(() => {
		(async function() {
			const {data: responseData} = await axiosInstance.get("/account/data", {params: {account: account}})
			useErrorHandler({responseData: responseData, success: async () => setPrevAccountData(responseData[0])})
		})()
	}, [])

	const fields: FormField[] = [
		{clientName: "Nazwa firmy", devName: "name", size: "large"},
		{clientName: "NIP", devName: "taxNo"},
		{clientName: "Adres", devName: "street"},
		{clientName: "Kod pocztowy", devName: "postCode"},
		{clientName: "Miasto", devName: "city"},
		{clientName: "Państwo", devName: "country"},
		{clientName: "Stawka ryczałtu", devName: "lumpSumTax", options: ["2", "3", "5.5", "8.5", "10", "12", "12.5", "14", "15", "17"]},
		{clientName: "Stawka VAT", devName: "vat", options: ["zw", "np", "0", "5", "7", "8", "23"]},
		{clientName: "Podstawa zwolnienia z vat - wpisz jeśłi firma jest z zwolniona z podatku VAT", devName: "exemptTaxKind", optional: true, size: "large"},
	]

	const handleSetUserData = async (event, accountData) => {
		useHandleFormSubmit({
			event: event,
			data: accountData,
			fields: fields,
			success: async () => {
				const data: AccountData = {
					...accountData,
					accountId: account.id,
				}
				const {data: responseData} = await axiosInstance.post("/account/data", data)
				useErrorHandler({
					responseData: responseData, 
					success: async ()  =>  {
						alert("Dane konta zostały zmienione")
						await router.push("/Offers")
					}})
			}
		})
	}

	return (
		<Form title={"Dane twojej firmy"}
		      fields={fields}
		      defaultValues={prevAccountData}
		      onSubmit={handleSetUserData}
		/>
	)
}

export default AccountData