import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"
import {useGetItem} from "../useGetItem"

export const useSendInvoice = async (invoice) => {
	const token = useGetItem("token")
	const {data: responseData} =  await axiosInstance.post("/allegro/invoice", {
		token: token,
		invoice: invoice
	})
	await useErrorHandler(responseData, async () => {
		alert(responseData.message)
	})
}