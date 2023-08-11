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
	exemptTaxKind: string
}