export interface UseErrorHandlerTypes{
	responseData: {error: string, errorMessage: string} | any,
	success: () => Promise<void>
}