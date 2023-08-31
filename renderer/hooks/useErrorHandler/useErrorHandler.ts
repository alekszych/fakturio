"use client"

export const useErrorHandler = (responseData: {error: string, errorMessage: string} | any, success: () => Promise<any>) => {
	if("error" in responseData){
		console.log(responseData.error)
		alert(responseData.errorMessage)
	}
	else {
		return success()
	}
}
