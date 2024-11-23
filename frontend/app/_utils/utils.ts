import toast from "react-hot-toast";
import { Country, State, City } from "country-state-city";

export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Copied to clipboard:", text);
      toast.success(`${text} copied to clipboard`);
    })
    .catch((err) => {
      console.error("Failed to copy to clipboard:", err);
    });
};

// Function to get all countries asynchronously
export const fetchCountries = async () => {
  return new Promise((resolve) => {
    const countries = Country.getAllCountries();
    resolve(countries);
  });
};

// Function to get states for a specific country asynchronously
export const fetchStatesForCountry = async (countryCode) => {
  console.log(countryCode);
  return new Promise((resolve) => {
    const states = State.getStatesOfCountry(countryCode);
    resolve(states);
  });
};

// Function to get cities for a specific state asynchronously
export const fetchCitiesForState = async (countryCode, stateCode) => {
  return new Promise((resolve) => {
    const cities = City.getCitiesOfState(countryCode, stateCode);
    resolve(cities);
  });
};
