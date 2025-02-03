import { atomWithReducer } from 'jotai/utils'
import { LatLng } from 'leaflet'

export type Country = {
    code: string
    name: string
    lat: number
    lng: number
}

type CountryAction = {
    type: 'SET_COUNTRY'
    payload: Country
}

const defaultCountry: Country = {
    code: 'TH',
    name: 'Thailand',
    lat: 13.7563,
    lng: 100.5018
}

export const countryAtomReducer = (prevState: Country, action: CountryAction) => {
    switch (action.type) {
        case 'SET_COUNTRY':
            return { ...prevState, ...action.payload }
        default:
            return prevState
    }
}

export const countryStateAtom = atomWithReducer(defaultCountry, countryAtomReducer)