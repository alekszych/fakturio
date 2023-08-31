import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"

export const useDeleteInvoice = async (id: string) => {
	const {data: responseData} = await axiosInstance.delete("/fakturownia/invoice", {
		params: {id: id}
	})
	await useErrorHandler(responseData, async () => {
		alert(responseData.message)
	})
}