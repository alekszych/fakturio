import {ReactNode} from "react"

export interface ButtonTypes{
	onClick?: (any) => void,
	children: ReactNode,
	variant?: "default" | "outline",
	className?: string
}