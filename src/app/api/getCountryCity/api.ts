import axios from "axios";

axios.defaults.baseURL = "https://countriesnow.space/api/v0.1/countries";

const getCountries = async () => {
  const url = "/positions";
  return await axios.get(url);
};

const getStates = async (country: string) => {
  const url = `/states/q?country=${country}`;
  const states = await axios.get(url);
  return states;
};

const getCities = async (country: string, state: string) => {
  const url = `/state/cities/q?country=${country}&state=${state}`;
  const cities = await axios.get(url);
  return cities;
};

export { getCountries, getStates, getCities };
