import {Error, Offer} from "../../../global-types"
import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"
import {useGetItem} from "../useGetItem"

export const useCreateInvoices = async (checked: Offer[]) => {
	const account = useGetItem("account")
	const {data: responseData}: {data: any | Error} = await axiosInstance.post("/fakturownia/invoice", {data: checked, account: account})
	await useErrorHandler(responseData, async () => {
		alert("Faktury zostały utworzone!")
	})
}