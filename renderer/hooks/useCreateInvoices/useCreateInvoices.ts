import {Error, Offer, SimpleAccount} from "../../../global-types"
import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"

export const useCreateInvoices = async (checked: Offer[], account: SimpleAccount) => {
	const {data: responseData}: {data: any | Error} = await axiosInstance.post("/fakturownia/invoice", {data: checked, account: account})
	await useErrorHandler(responseData, async () => {
		alert("Faktury zostały utworzone!")
	})
}