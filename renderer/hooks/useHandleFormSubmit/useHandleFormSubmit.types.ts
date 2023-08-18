import {FormField} from "../../../types"

export interface UseHandleFormSubmitTypes{
	event: Event,
	data: Object
	fields: FormField[],
	success: () => Promise<void>
}