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

export interface iUser {
	id: string
	name: string
	password: string
	cpf: string
	age: number
	adress: string
	number: string
	passportNumber?: string
}

export interface iCard {
	id: string
	cardNumber: number
	securityNumber: number
	validity: Date
	propertyName: string
}