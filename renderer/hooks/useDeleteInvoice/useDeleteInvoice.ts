import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"

export const useDeleteInvoice = async (invoiceId: string) => {
	const {data: responseData} = await axiosInstance.delete(`/fakturownia/invoice/${invoiceId}`)
	await useErrorHandler(responseData, async () => {
		alert(responseData.message)
	})
}