import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import React from "react";
import { countries } from "@/assets/constants/country";
import { SelectProps } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { useAtomValue, useSetAtom } from "jotai";
import { countryStateAtom } from "@/atoms/country";

interface CountrySelectorProps extends SelectProps {
	className?: string;
}

const CountrySelector = ({ className }: CountrySelectorProps) => {
	const country = useAtomValue(countryStateAtom);
	const setCountryState = useSetAtom(countryStateAtom);

	const setCountry = (code: string) => {
		const _country = countries.find((c) => c.code === code);
		if (_country) {
			setCountryState({
				name: _country.name,
				lat: _country.lat,
				lng: _country.lng,
			});
		}
	};

	return (
		<Select
			onValueChange={(value) => setCountry(value)}
			defaultValue={country?.name}>
			<SelectTrigger className={cn("w-[280px]", className)}>
				<SelectValue placeholder="Select a country" />
			</SelectTrigger>
			<SelectContent align="end" side="bottom" className="md:h-96 h-60">
				<SelectGroup>
					{countries.map((country) => (
						<SelectItem key={country.code} value={country.code}>
							{country.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default CountrySelector;
