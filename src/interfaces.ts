export interface iFlight {
	_id: string
	price: string
	place: iPlaces[]
	flightNumber: number
	airportTag: string
	company: string
	baggageWeight: string
	goingDate: string
	returnDate: string
	startDestination: iDestination
	finalDestination: iDestination
}

export interface iPlaces {
	user_id: string
	user_places: string[]
}

export interface iDestination {
	_id: string
	cityName: string
	zipcode: string
	cityTag: string
	country: string
}

export interface iUser {
	_id: string
	name: string
	password: string
	cpf: string
	age: number
	adress: string
	number: string
	passportNumber?: string
}
export interface iUserUpdate {
	name: string
	password: string
	cpf: string
	age: number
	address: string
	number: string
	passportNumber?: string
}

export interface iCard {
	_id?: string
	cardNumber: string
	securityNumber: number
	validity: string
	propertyName: string
}