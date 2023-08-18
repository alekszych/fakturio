"use client"
import {UseErrorHandlerTypes} from "./useErrorHandler.types"

export const useErrorHandler = ({responseData, success}: UseErrorHandlerTypes): any => {
	if("error" in responseData){
		console.log(responseData.error)
		alert(responseData.errorMessage)
	}
	else {
		return success()
	}
}
