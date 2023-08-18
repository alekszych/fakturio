import React, {FC} from "react"
import {ButtonTypes} from "./Button.types"

export const Button: FC <ButtonTypes> = ({onClick = () => {}, children, variant = "default"}) => {
	return (
		<button className={"h-fit py-2 px-8 rounded m-auto my-5 ml-0 mr-3 flex items-center " + (variant == "default" ? "text-white bg-blue-800 border-2 border-blue-800" : "bg-white border-2 text-gray-500 border-gray-400") }
		        onClick={onClick}>
			{children}
		</button>
	)
}