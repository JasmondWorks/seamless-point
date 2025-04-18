import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  fetchCitiesForState,
  fetchCountries,
  fetchStatesForCountry,
} from "@/app/_utils/utils";

export function useLocationData(isSender: boolean = true) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response: any = await fetchCountries();
        setCountries(response);
      } catch (error) {
        toast.error("Failed to fetch countries.");
      }
    };
    getCountries();
  }, []);

  async function loadCities(
    selectedCountryName: string,
    selectedStateName: string
  ) {
    const country: any = countries.find(
      (c: any) => c.name === selectedCountryName
    );
    const state: any = states.find((s: any) => s.name === selectedStateName);

    if (country && state) {
      const response: any = await fetchCitiesForState(
        country.isoCode,
        state.isoCode
      );
      setCities(response);

      if (response.length === 0) toast.error("No cities available.");
    }
  }
  async function loadStates(selectedCountryName: string) {
    const country: any = countries.find(
      (c: any) => c.name === selectedCountryName
    );

    if (country) {
      const response: any = await fetchStatesForCountry(country.isoCode);
      setStates(response);

      if (response.length === 0) toast.error("No states available.");
    }
  }

  function onCountryChange(selectedCountry: string, setValue: any) {
    console.log(selectedCountry);

    setValue(isSender ? "state" : "toState", ""); // Clear state
    setValue(isSender ? "city" : "toCity", ""); // Clear city
    loadStates(selectedCountry); // Fetch states
  }
  function onStateChange(
    selectedCountryName: string,
    selectedState: string,
    setValue: any
  ) {
    console.log(selectedState);

    setValue(isSender ? "city" : "toCity", ""); // Clear city
    loadCities(selectedCountryName, selectedState); // Fetch states
  }

  return {
    countries,
    states,
    cities,
    loadCities,
    loadStates,
    onCountryChange,
    onStateChange,
  };
}
