"use client"
import React from "react"

const useErrorHandler = (responseData: {error: string, errorMessage: string} | { any: any }, success: () => Promise<void> = async () => {}) => {
	if("error" in responseData){
		console.log(responseData.error)
		alert(responseData.errorMessage)
	}
	else {
		success().then()
	}
}

export default useErrorHandler