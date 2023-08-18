import React, {FC, useContext, useState} from "react"
import {AuthContext} from "../../_app"
import {axiosInstance} from "../../../axios"
import {useErrorHandler} from "../../../hooks/useErrorHandler"
import {Error, InvoiceFile} from "../../../../types"
import {CreateInvoicesButtonProps} from "./CreateInvoicesButton.props"

export const CreateInvoicesButton: FC<CreateInvoicesButtonProps> = ({setInvoiceFiles, checked, setChecked}) => {
	const {account} = useContext(AuthContext)
	const [hideCreateInvoices, setHideCreateInvoices] = useState(false)
	const handleCreateInvoices = async () => {
		setHideCreateInvoices(true)
		const {data: responseData}: {data: Error | InvoiceFile[]} = await axiosInstance.post("/fakturownia/invoice", {data: checked, account: account})
		useErrorHandler({responseData: responseData, success: async () => {
			if(!Array.isArray(responseData))
				return
			setInvoiceFiles(invoiceFiles => invoiceFiles.concat(responseData))
			setChecked([])
			alert("Faktury zostały utworzone!")
			setHideCreateInvoices(false)
		}})
	}

	if(!hideCreateInvoices){
		return (
			<button className={"bg-white text-black h-fit py-3 px-10 rounded m-auto mb-5 mr-3"} onClick={handleCreateInvoices}>Utwórz faktury</button>
		)
	}

	return <> </>
}