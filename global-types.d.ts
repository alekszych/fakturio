export interface Account {
	id?: number,
	name: string,
	allegroClientId: string,
	allegroClientSecret: string,
	fakturowniaName: string,
	fakturowniaToken: string
}

export interface AccountData {
	id?: number,
	accountId?: number,
	name: string,
	taxNo: string,
	street: string,
	postCode: string,
	city: string,
	country: string,
	lumpSumTax: string,
	vat: string,
	exemptTaxKind?: string
}

export interface Address{
	city: string,
	companyName?: string | null
	company?: {name: string, taxId: string} | null
	countryCode: string,
	firstName?: string | null,
	lastName?: string | null,
	modifiedAt?: string | null,
	phoneNumber: string,
	street: string,
	zipCode: string
	naturalPerson?: {firstName: string, lastName: string} | null
}

export interface Product{
	boughtAt: string,
	id: string,
	offer: {id: string, name: string, external: string | null},
	originalPrice: {amount: string, currency: string},
	price: {amount: string, currency: string},
	quantity: number,
	reconciliation: string | null,
	selectedAdditionalServices: any[]
}

export interface Offer{
	id: string,
	client: string,
	currency: string,
	deliveryCost: string,
	address: Address,
	products: Product[]
}

export interface SimplifiedOffer{
	id: string,
	client: string,
	products: Product[],
	deliveryCost: string,
	currency: string,
	address: Address | null,
	invoiceFile: string | null,
	invoiceStatus: "none" | "local" | "allegro",
	paymentType: "CASH_ON_DELIVERY" | "ONLINE"
}

export interface Error{
	error: String,
	errorMessage: String
}

export interface FormField {
	clientName: string,
	devName: string,
	optional?: boolean
	size?: "normal" | "large"
	options?: string[]
}

export interface SimpleAccount{
	id: string,
	name: string
}

