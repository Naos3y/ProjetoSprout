import axios from "axios";

axios.defaults.baseURL = "https://countriesnow.space/api/v0.1/countries";

const getCountries = async () => {
  const url = "/positions";
  return await axios.get(url);
};

const getStates = async (country: string) => {
  const url = `/states/q?country=${country}`;
  return await axios.get(url);
};

const getCities = async (country: string, state: string) => {
  const url = `/state/cities/q?country=${country}&state=${state}`;
  return await axios.get(url);
};

export { getCountries, getStates, getCities };
