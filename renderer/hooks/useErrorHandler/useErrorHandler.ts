"use client"
import {UseErrorHandlerTypes} from "./useErrorHandler.types"

export const useErrorHandler = ({responseData, success}: UseErrorHandlerTypes): void => {
	if("error" in responseData){
		console.log(responseData.error)
		alert(responseData.errorMessage)
	}
	else {
		success().then()
	}
}
