import { atom } from "jotai";

export interface CountryState {
	name: string;
	lat: number;
	lng: number;
}

export const countryStateAtom = atom<CountryState | null>(null);
