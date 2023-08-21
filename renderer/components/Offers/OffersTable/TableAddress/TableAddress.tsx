import React, {FC} from "react"
import {TableAddressTypes} from "./TableAdress.types"

export const TableAddress: FC <TableAddressTypes> = ({address}) => {
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

	// if ("naturalPerson" in address){
	// 	name = address.naturalPerson.firstName + " " + address.naturalPerson.lastName
	// }

	return (
		<>
			<p> {name} </p>
			<p> {address.street} </p>
			<p> {address.zipCode} {address.city} {address.countryCode} </p>
		</>
	)

}