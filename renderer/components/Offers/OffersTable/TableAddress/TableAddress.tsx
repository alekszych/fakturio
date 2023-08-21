import React, {FC} from "react"
import {TableAddressTypes} from "./TableAdress.types"

export const TableAddress: FC <TableAddressTypes> = ({item}) => {
	const {address, paymentType} = item
	if (!address){
		return <> </>
	}

	let name = ""

	if ("firstName" in address){
		name = address.firstName + " " + address.lastName
	}

	if ("company" in address && address.company !== null){
		name = address.company.name + " " + address.company.taxId
	}

	let payment = ""

	if(paymentType === "CASH_ON_DELIVERY"){
		payment = "Za pobraniem"
	}

	if(paymentType === "ONLINE"){
		payment = "Przelew"
	}

	return (
		<>
			<p> {name} </p>
			<p> {address.street} </p>
			<p> {address.zipCode} {address.city} {address.countryCode} </p>
			<p> {payment} </p>
		</>
	)

}