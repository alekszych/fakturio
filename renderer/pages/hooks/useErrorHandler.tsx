import React from "react"

const useErrorHandler = (responseData = {}, success = () => {}) => {
	if("error" in responseData){
		console.log(responseData.error)
		alert(responseData.errorMessage)
	}
	else {
		success()
	}
}

export default useErrorHandler