import React, {FC, useEffect, useState} from "react"
import {Listbox} from "@headlessui/react"
import {AccountSelectTypes} from "./AccountSelect.types"
import {HiChevronUpDown} from "react-icons/hi2"
import {Account} from "../../../../global-types"
import {axiosInstance} from "../../../axios"
import {useErrorHandler} from "../../../hooks/useErrorHandler"


export const AccountSelect: FC <AccountSelectTypes> = ({account, setAccount}) => {
	const [accounts, setAccounts] = useState<Account[]>([])

	useEffect(() => {
		(async function() {
			const {data: responseData}: {data: Error | Account[]} = await axiosInstance.get("/account")
			useErrorHandler({responseData: responseData, success: async () => {
				if(!Array.isArray(responseData))
					return
				setAccounts(responseData)
			}})
		})()
	}, [])

	if(!accounts || (accounts && accounts.length === 0)){
		return <p className={"text-xl m-auto flex w-fit"}> Nie dodałeś/aś jeszcze żadnego konta : ( </p>
	}

	if (accounts){
		return (
			<div className={"m-auto w-[400px] max-w-full"}>
				<Listbox value={account} onChange={setAccount}>
					<Listbox.Label className="text-xl">Wybierz konto</Listbox.Label>
					<div className="relative mt-2">
						<Listbox.Button className="relative cursor-default rounded-xl bg-white border-2 border-blue-800 py-2 pl-2 pr-10 text-left text-sm focus:outline-none focus:ring-indigo-500 sm:leading-6 w-full">
							<span className="flex items-center">
								<span className="ml-3 block truncate">{account ? account.name : "Wybierz konto"}</span>
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
								<HiChevronUpDown className="h-5 w-5" aria-hidden="true" />
							</span>
						</Listbox.Button>

						<Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg border-2 border-blue-800 focus:outline-none sm:text-sm">
							{accounts.map((account) => (
								<Listbox.Option
									key={account.id}
									className={({active}) => active ? "bg-indigo-600 text-blue-800 relative cursor-default select-none py-2 pl-3 pr-9" : "text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"}
									value={account}
								>
									<div className="flex items-center">
										<span className={"ml-3 truncate flex"}>
											<p className={"mr-3"}> {account.name} </p>
										</span>
									</div>
								</Listbox.Option>
							))}
						</Listbox.Options>
					</div>
				</Listbox>
			</div>
		)
	}
}