export interface iFlight {
	id: string
	price: string
	place?: string
	flightNumber: number
	airportTag: string
	company: string
	baggageWeight: string
	goingDate: Date
	returnDate: Date
	startDestiny: iDestiny
	finalDestiny: iDestiny
}

export interface iDestiny {
	id: string
	cityName: string
	zipcode: string
	cityTag: string
	country: string
}