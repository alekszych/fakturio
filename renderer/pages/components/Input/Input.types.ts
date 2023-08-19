import {FormField} from "../../../../types"

export interface InputTypes{
	field: FormField
	onChange: ({target: {name, value}}) => void,
	defaultValues: Object
}