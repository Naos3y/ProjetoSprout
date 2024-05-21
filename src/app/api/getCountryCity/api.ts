import axios from "axios";

axios.defaults.baseURL = "https://countriesnow.space/api/v0.1/countries";

const getCountries = async () => {
  const url = "/positions";
  return await axios.get(url);
};

const getStates = async (country: string) => {
  if (country) {
    const url = `/states/q?country=${country}`;
    const states = await axios.get(url);
    return states;
  }
  return null;
};

const getCities = async (country: string, state: string) => {
  if (state && country) {
    const url = `/state/cities/q?country=${country}&state=${state}`;
    const cities = await axios.get(url);
    return cities;
  }
  return null;
};

export { getCountries, getStates, getCities };
