import {FormEvent} from "react"
import {FormField} from "../../../../global-types"

export interface FormTypes{
	title: String,
	fields: FormField[],
	defaultValues?: Object
	onSubmit: (event: FormEvent, formData: Object) => void
}