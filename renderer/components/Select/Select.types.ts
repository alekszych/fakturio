import {FormField} from "../../../global-types"

export interface SelectTypes{
	formData: Object,
	field: FormField
	onChange: ({target: {name, value}}) => void
}