import React, {FC} from "react"
import {InputTypes} from "./Input.types"

export const Input: FC <InputTypes> = ({field, onChange, defaultValues}) => {
	return (
		<input
			className={"bg-[#eff1fa] h-fit rounded-xl px-4 py-2 focus:outline-blue-300 max-w-full " +
				(field.size && field.size === "large" ? "w-[660px]" : "w-[320px]")}
			name={field.devName}
			onChange={onChange}
			defaultValue={defaultValues && field.devName in defaultValues && defaultValues[field.devName]}/>
	)
}