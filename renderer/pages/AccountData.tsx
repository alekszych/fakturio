import React, {useContext, useEffect, useState} from "react"
import {AuthContext} from "./_app"
import {useRouter} from "next/router"
import {axiosInstance} from "../axios"
import {useErrorHandler} from "../hooks/useErrorHandler"
import {AccountData, FormField} from "../../types"
import {Form} from "./components/Form"
import useHandleFormSubmit from "../hooks/useHandleFormSubmit/useHandleFormSubmit"

const AccountData = () => {
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
		{clientName: "Nazwa firmy", devName: "name"},
		{clientName: "NIP", devName: "taxNo"},
		{clientName: "Adres", devName: "street"},
		{clientName: "Kod pocztowy", devName: "postCode"},
		{clientName: "Miasto", devName: "city"},
		{clientName: "Państwo", devName: "country"},
		{clientName: "Stawka ryczałtu (2, 3, 5.5, 8.5, 10, 12, 12.5, 14, 15, 17)", devName: "lumpSumTax"},
		{clientName: "Stawka VAT (zw, np, 0, 5, 7, 8, 23)", devName: "vat"},
		{clientName: "Podstawa zwolnienia z vat (Jeśli firma jest z zwolniona z podatku VAT)", devName: "exemptTaxKind", optional: true},
	]

	const handleSetUserData = async (event, accountData) => {
		useHandleFormSubmit({
			event: event,
			data: accountData,
			fields: fields,
			success: async () => {
				if(accountData.taxNo.length !== 10 ||
					!(["2", "3", "5.5", "8.5", "10", "12", "12.5", "14", "15", "17"].includes(accountData.lumpSumTax)) ||
					!(["zw", "np", "0", "5", "7", "8", "23"].includes(accountData.vat))
				){
					alert("Wpisz poprawne wartości do formularza")
					return
				}
				console.log(accountData)
				const data: AccountData = {
					...accountData,
					accountId: account.id,
				}
				const {data: responseData} = await axiosInstance.post("/account/data", data)
				useErrorHandler({responseData: responseData, success: async ()  =>  {
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
		      previousPage={"/Home"}
		/>
	)
}

export default AccountData