import React, {FC, useState} from "react"
import {OffersTableTypes} from "./OffersTable.types"
import {LuSend} from "react-icons/lu"
import {HiOutlineEye, HiOutlineTrash} from "react-icons/hi"
import {IoCheckmarkSharp, IoClose} from "react-icons/io5"
import {useSendInvoice} from "../../../hooks/useSendInvoice"
import {DisplayPdf} from "../DisplayPdf"
import {Checkbox} from "../../Global/Checkbox"
import {TableAddress} from "./TableAddress"
import {useDeleteInvoice} from "../../../hooks/useDeleteInvoice"
import {useSelector} from "react-redux"

export const OffersTable: FC <OffersTableTypes> = ({data, checked, setChecked, reloadInvoices}) => {
	const [displayPDF, setDisplayPDF] = useState<string>("")
	const token = useSelector((state: any) => state.token.value)
	const handleCheckboxChange = (item) => {
		const foundItem = checked.find(e => e.id === item.id)
		if (foundItem !== undefined){
			setChecked(checked => checked.filter(e => e.id !== item.id))
		} else {
			setChecked(checked.concat(item))
		}
	}

	if(displayPDF !== ""){
		return (<DisplayPdf invoiceId={displayPDF} close={() => setDisplayPDF("")}/>)
	}

	return (
		<table className="border-collapse bg-white text-left text-sm text-gray-500 overflow-hidden min-w-[800px]">
			<thead className="bg-gray-50">
				<tr>
					<th scope="col" className="px-6 py-4 font-medium text-gray-900">Posiada fakturę</th>
					<th scope="col" className="px-6 py-4 font-medium text-gray-900">Użytkownik</th>
					<th scope="col" className="px-6 py-4 font-medium text-gray-900">Produkty</th>
					<th scope="col" className="px-6 py-4 font-medium text-gray-900">Dane do faktury</th>
					<th scope="col" className="px-6 py-4 font-medium text-gray-900">Opcje faktury</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-100 border-t border-gray-100">
				{data.length > 0 && data.map(item =>
					<tr className="hover:bg-gray-50" key={item.id}>
						<td className="px-6 py-4">
							{item.invoiceStatus === "allegro" ? <IoCheckmarkSharp className={"text-xl text-green-700 "}/> : <IoClose className={"text-xl text-red-500"}/>}
						</td>

						<td className="px-6 py-4">
							<p>{item.client}</p>
						</td>

						<td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
							{item.products.map(lineItem =>
								<div className="text-sm" key={lineItem.id}>
									<div className="font-medium text-gray-700">{lineItem.offer.name}</div>
									<div className="text-gray-400">{lineItem.price.amount}</div>
								</div>
							)}
						</td>

						<td className={"px-6 py-4 "}>
							<TableAddress item={item}/>
						</td>


						<td className={"flex align-middle px-6 py-4 gap-2 justify-items-start"}>
							{item.invoiceStatus !== "allegro" && (item.invoiceStatus === "local" ?
								<div className={"flex"}>
									<button onClick={() => setDisplayPDF(item.invoiceFile)} className={"py-1 text-2xl text-blue-800"}> <HiOutlineEye/> </button>
									<button onClick={() => {useSendInvoice(item.invoiceFile, token).then(); reloadInvoices()}} className={"text-blue-800 px-3 py-1 text-2xl"}> <LuSend/> </button>
									<button onClick={() => {useDeleteInvoice(item.id).then(); reloadInvoices()}} className={"text-blue-800 py-1 text-2xl"}> <HiOutlineTrash/> </button>
								</div>
								:
								<div className="flex justify-center gap-4">
									<Checkbox onChange={() => handleCheckboxChange(item)}/>
								</div>
							)}
						</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}