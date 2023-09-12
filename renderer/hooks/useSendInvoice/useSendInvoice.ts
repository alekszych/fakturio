import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"

export const useSendInvoice = async (invoice, token) => {
	const {data: responseData} =  await axiosInstance.post("/allegro/invoice", {
		token: token,
		invoice: invoice
	})
	await useErrorHandler(responseData, async () => {
		alert(responseData.message)
	})
}