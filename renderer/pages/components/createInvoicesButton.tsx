import React, {FC, useContext, useState} from "react"
import {AuthContext} from "../_app"
import {axiosInstance} from "../../axios"
import useErrorHandler from "../../hooks/useErrorHandler"
import {Invoice, Offer} from "../../../types"

const CreateInvoicesButton: FC<{setInvoices: (value: (invoices) => Invoice[]) => void, checked: Offer[], setChecked: (value: Offer[]) => void}> = ({setInvoices, checked, setChecked}) => {
	const {account} = useContext(AuthContext)
	const [hideCreateInvoices, setHideCreateInvoices] = useState(false)
	const handleCreateInvoices = async () => {
		setHideCreateInvoices(true)
		const {data: responseData} = await axiosInstance.post("/fakturownia/invoice", {data: checked, account: account})
		useErrorHandler(responseData, async () => {
			setInvoices(invoices => invoices.concat(responseData))
			setChecked([])
			alert("Faktury zostały utworzone!")
			setHideCreateInvoices(false)
		})
	}

	if(!hideCreateInvoices){
		return (
			<button className={"bg-white text-black h-fit py-3 px-10 rounded m-auto mb-5 mr-3"} onClick={handleCreateInvoices}>Utwórz faktury</button>
		)
	}
	return <> </>

}

export default CreateInvoicesButton