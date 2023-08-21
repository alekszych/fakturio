import React, {FC} from "react"
import {CheckboxTypes} from "./Checkbox.types"

export const Checkbox: FC <CheckboxTypes> = ({onChange = () => {}, className = ""}) => {
	return (
		<label className={"inline-flex items-center mt-3 hover:cursor-pointer " + className}>
			<input type="checkbox" className="form-checkbox h-4 w-4 text-blue-800 border-2 rounded border-[#000000]" onChange={onChange}/>
		</label>
	)
}