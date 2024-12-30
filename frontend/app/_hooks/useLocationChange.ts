function useLocationChange({
  loadCities,
  loadStates,
  isMounting,
  setValue,
  selectedCountryName,
}: any) {
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;

    // Prevent resetting states/cities on mount
    if (!isMounting.current) {
      setValue("toState", ""); // Clear state
      setValue("toCity", ""); // Clear city
    }

    setValue("toCountry", newCountry); // Update country
    loadStates(newCountry); // Fetch states for the new country
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;

    // Prevent resetting cities on mount
    if (!isMounting.current) {
      setValue("toCity", ""); // Clear city
    }

    setValue("toState", newState); // Update state
    loadCities(selectedCountryName, newState); // Fetch cities for the new state
  };

  return {};
}

export default useLocationChange;
