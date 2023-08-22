import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"
import {UseDeleteInvoiceTypes} from "./useDeleteInvoice.types"

export const useDeleteInvoice = async ({id}: UseDeleteInvoiceTypes) => {
	const {data: responseData} =  await axiosInstance.delete("/fakturownia/invoice", {
		params: {id: id}
	})
	useErrorHandler({responseData: responseData, success: async () => {
		alert(responseData.message)
	}})
}