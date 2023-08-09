import React, {useEffect, useState} from "react"
import { Listbox } from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { axiosInstance } from "../../axios"
import useErrorHandler from "../hooks/useErrorHandler"

const classNames = (...classes) => {
	return classes.filter(Boolean).join(" ")
}

const AccountSelect = ({account, setAccount}) => {
	const [accounts, setAccounts] = useState()
	useEffect(() => {
		(async function() {
			const {data: responseData} = await axiosInstance.get("/account")
			useErrorHandler(responseData, () => setAccounts(responseData))
		})()
	}, [])

	if(accounts && accounts.length === 0){
		return <p className={"text-white text-xl m-auto flex w-fit"}> Nie dodałeś/aś jeszcze żadnego konta </p>
	}
	
	if (accounts){
		return (
			<div className={"m-auto w-4/5"}>
				<Listbox value={account} onChange={setAccount}>
					<Listbox.Label className="text-white text-xl">Wybierz konto</Listbox.Label>
					<div className="relative mt-2">
						<Listbox.Button className="relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 w-full">
							<span className="flex items-center">
								<span className="ml-3 block truncate">{account ? account.name : "Wybierz konto"}</span>
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
								<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
							</span>
						</Listbox.Button>

						<Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{accounts.map((account) => (
								<Listbox.Option
									key={account.id}
									className={({ active }) =>
										classNames(
											active ? "bg-indigo-600 text-blue-400" : "text-gray-900",
											"relative cursor-default select-none py-2 pl-3 pr-9"
										)
									}
									value={account}
								>
									{({ selected }) => (
										<div className="flex items-center">
											<span className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 truncate flex")}>
												<p className={"mr-3"}> {account.name} </p>
											</span>
										</div>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</div>
				</Listbox>
			</div>
		)
	}
}

export default AccountSelect