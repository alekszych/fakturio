import {FormField} from "../../../global-types"

export interface UseHandleFormSubmitTypes{
	event: Event,
	data: Object
	fields: FormField[],
	success: () => Promise<void>
}