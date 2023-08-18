import React, {SetStateAction} from "react"
import {InvoiceFile, Offer} from "../../../../types"

export interface CreateInvoicesButtonProps {
	setInvoiceFiles: React.Dispatch<SetStateAction<InvoiceFile[]>>,
	checked: Offer[],
	setChecked: React.Dispatch<SetStateAction<Offer[]>>
}
