import {Error, InvoiceFile} from "../../../types"
import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"
import {UseCreateInvoicesTypes} from "./useCreateInvoices.types"

export const useCreateInvoices = ({checked, account}: UseCreateInvoicesTypes) => {
	return axiosInstance.post("/fakturownia/invoice", {data: checked, account: account}).then(data => {
		const {data: responseData}: {data: InvoiceFile[] | Error} = data
		return useErrorHandler({responseData: responseData, success: async () => {
			if(!Array.isArray(responseData))
				return
			alert("Faktury zostały utworzone!")
			return responseData
		}})
	})
}