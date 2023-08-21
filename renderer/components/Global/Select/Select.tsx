import React, {FC} from "react"
import {Listbox} from "@headlessui/react"
import {HiChevronUpDown} from "react-icons/hi2"
import {SelectTypes} from "./Select.types"

export const Select: FC <SelectTypes> = ({formData, field, onChange}) => {
	return (
		<Listbox onChange={(value) => onChange({target: {name: field.devName, value: value}})}>
			<div className="relative mt-2 w-[320px] rounded-xl bg-[#eff1fa] max-w-full">
				<Listbox.Button className="relative rounded-xl bg-[#eff1fa] py-2 pr-10 pl-1.5 text-gray-900 focus:outline-none focus:ring-indigo-500 w-full">
					<span className="flex items-center">
						<span className="ml-3 block truncate">{field.devName in formData ? formData[field.devName] : "Wybierz"}</span>
					</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
						<HiChevronUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</span>
				</Listbox.Button>

				<Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-xl bg-[#eff1fa] py-1 text-base focus:outline-none sm:text-sm">
					{field.options.map((option) => (
						<Listbox.Option
							key={option}
							className={({active}) => active ?
								"bg-indigo-600 text-blue-800 relative cursor-default select-none py-2 pl-3 pr-9" :
								"text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
							}
							value={option}>
							<div className="flex items-center">
								<span className={"ml-3 truncate flex"}>
									<p className={"mr-3"}> {option} </p>
								</span>
							</div>
						</Listbox.Option>
					))}
				</Listbox.Options>
			</div>
		</Listbox>
	)
}