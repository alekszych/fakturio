import React, {SetStateAction} from "react"
import {Invoice, Offer} from "../../../../types"

export interface CreateInvoicesButtonProps {
	setInvoices: React.Dispatch<SetStateAction<Invoice[]>>,
	checked: Offer[],
	setChecked: React.Dispatch<SetStateAction<Offer[]>>
}
