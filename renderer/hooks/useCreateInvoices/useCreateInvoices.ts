import {Error} from "../../../global-types"
import {axiosInstance} from "../../axios"
import {useErrorHandler} from "../useErrorHandler"
import {UseCreateInvoicesTypes} from "./useCreateInvoices.types"

export const useCreateInvoices = async ({checked, account}: UseCreateInvoicesTypes) => {
	const {data: responseData}: {data: any | Error} = await axiosInstance.post("/fakturownia/invoice", {data: checked, account: account})
	useErrorHandler({responseData: responseData, success: async () => {
		alert("Faktury zostały utworzone!")
	}})
}