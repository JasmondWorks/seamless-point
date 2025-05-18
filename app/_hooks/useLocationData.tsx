import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getCities, getCountries, getStates } from "@/app/_lib/actions";

export function useLocationData(isSender: boolean = true) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      const response: any = await getCountries();
      setIsLoading(false);

      if (response.status === "success") setCountries(response.data);
      else {
        // toast.error("Failed to fetch countries");
      }
    };
    fetchCountries();
  }, []);

  async function fetchStates(selectedCountryCode: string) {
    console.log(selectedCountryCode);
    const country: any = countries.find(
      (c: any) => c.isoCode === selectedCountryCode
    );

    if (country) {
      setIsLoading(true);
      const response: any = await getStates(country.isoCode);
      setIsLoading(false);

      if (response.status === "success") setStates(response.data);
      // else toast.error(response.message);

      if (response.data.length === 0) {
        toast.error(`No states available for ${country.name}.`);
        setStates([]);
      }
    }
  }

  async function fetchCities(
    selectedCountryCode: string,
    selectedStateName: string
  ) {
    const country: any = countries.find(
      (c: any) => c.isoCode === selectedCountryCode
    );
    const state: any = states.find((s: any) => s.name === selectedStateName);

    if (country && state) {
      console.log("here");
      setIsLoading(true);
      const response: any = await getCities(country.isoCode, state.isoCode);
      setIsLoading(false);
      console.log("Cities", response.data.data);

      if (response.status === "success") setCities(response.data.data);
      // else toast.error(response.message);

      if (response?.data?.data?.length === 0) {
        // toast.error(`No cities available for ${state.name}.`);
        setCities([]);
      }
    }
  }

  function onCountryChange(selectedCountry: string, setValue: any) {
    setValue(isSender ? "state" : "toState", ""); // Clear state
    setValue(isSender ? "city" : "toCity", ""); // Clear city
    fetchStates(selectedCountry); // Fetch states
  }
  function onStateChange(
    selectedCountryCode: string,
    selectedState: string,
    setValue: any
  ) {
    setValue(isSender ? "city" : "toCity", ""); // Clear city
    fetchCities(selectedCountryCode, selectedState); // Fetch states
  }

  return {
    countries,
    states,
    cities,
    fetchCities,
    fetchStates,
    onCountryChange,
    onStateChange,
    isLoading,
  };
}
