import {UseHandleFormSubmitTypes} from "./useHandleFormSubmit.types"

const UseHandleFormSubmit = ({event, data, fields, success} : UseHandleFormSubmitTypes) => {
	event.preventDefault()
	let error = false
	if(!data){
		alert("Wypełnij formularz")
		return
	}
	fields.forEach(field => {
		if (!(field.devName in data) && !("optional" in field && field.optional === true)){
			error = true
		}
	})
	if(error){
		alert("Uzupełnij wszystkie pola")
		return
	}
	success().then()
}

export default UseHandleFormSubmit