export interface User {
  id: string
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: GeographicCoordinate
}

export interface GeographicCoordinate {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface Post {
  userId: string
  id: string
  title: string
  body: string
}
