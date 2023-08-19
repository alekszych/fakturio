import {FormField} from "../../../global-types"
import {FormEvent} from "react"

export interface FormTypes{
	title: String,
	fields: FormField[],
	defaultValues?: Object
	onSubmit: (event: FormEvent, formData: Object) => void
}