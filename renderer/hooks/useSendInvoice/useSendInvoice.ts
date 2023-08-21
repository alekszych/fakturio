import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"

export const useSendInvoice = async ({token, invoice}) => {
	const {data: responseData} =  await axiosInstance.post("/allegro/invoice", {
		token: token,
		invoice: invoice
	})
	useErrorHandler({responseData: responseData, success: async () => {
		alert(responseData.message)
	}})
}