import React, {FC} from "react"
import {LiaFileInvoiceDollarSolid} from "react-icons/lia"
import {OffersHeaderTypes} from "./OffersHeader.types"
import {Button} from "../../Global/Button"

export const OffersHeader: FC <OffersHeaderTypes> = ({handleCreateInvoices}) => {
	return (
		<header>
			<h1 className={"text-3xl"}>Zamówienia allegro</h1>
			<div className={"flex items-start mt-5 mb-5 flex-wrap"}>
				<Button className={"mr-3 mb-3"} onClick={() => handleCreateInvoices()}> <LiaFileInvoiceDollarSolid className={"mr-2 text-xl"}/> <p className={"text-sm py-1"}> Utwórz faktury </p> </Button>
			</div>
		</header>
	)
}
