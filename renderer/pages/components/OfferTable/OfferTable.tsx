import React, {FC} from "react"
import {OfferTableTypes} from "./OfferTable.types"

export const OfferTable: FC <OfferTableTypes> = ({data, invoiceFiles, checked, setChecked}) => {
	const handleCheckboxChange = (item) => {
		const foundItem = checked.find(e => e.id === item.id)
		if (foundItem !== undefined){
			setChecked(checked => checked.filter(e => e.id !== item.id))
		} else {
			setChecked(checked.concat(item))
		}
	}

	return (
		<table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
			<thead className="bg-gray-50">
				<tr>
					<th scope="col" className="px-6 py-4 font-medium text-gray-900"/>
					<th scope="col" className="px-6 py-4 font-medium text-gray-900">Użytkownik</th>
					<th scope="col" className="px-6 py-4 font-medium text-gray-900">Produkty</th>
					<th scope="col" className="px-6 py-4 font-medium text-gray-900">Dane do faktury</th>
					<th scope="col" className="px-6 py-4 font-medium text-gray-900">Pobierz fakturę</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-100 border-t border-gray-100">
				{data.length > 0 && data.map(item =>
					<tr className="hover:bg-gray-50" key={item.id}>
						<td className="px-6 py-4">
							{!(invoiceFiles && invoiceFiles.find(i => i.id === item.id)) &&
								<div className="flex justify-center gap-4">
									<input type={"checkbox"} onChange={() => handleCheckboxChange(item)}/>
								</div>
							}
						</td>

						<td className="px-6 py-4">
							{item.client}
						</td>

						<td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
							{item.products.map(lineItem => 
								<div className="text-sm" key={lineItem.id}>
									<div className="font-medium text-gray-700">{lineItem.offer.name}</div>
									<div className="text-gray-400">{lineItem.price.amount}</div>
								</div>
							)}
						</td>

						{item.invoice && <td className="px-6 py-4">
							{"firstName" in item.invoice
								? item.invoice.firstName + " " + item.invoice.lastName
								: "company" in item.invoice && item.invoice.company !== null ?
									item.invoice.company.name + " " + item.invoice.company.taxId
									: item.invoice.naturalPerson.firstName + " " + item.invoice.naturalPerson.lastName}
							<br/>
							{item.invoice && item.invoice.street} <br/>
							{item.invoice.zipCode} {item.invoice.city} {item.invoice.countryCode}
						</td>}

						<td className={"flex align-middle"}>
							{invoiceFiles && invoiceFiles.find(i => i.id === item.id)  &&
								<a href={invoiceFiles.find(i => i.id === item.id).file}> <button className={"px-6 py-4"}> Pobierz </button></a>
							}
						</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}