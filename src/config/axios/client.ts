import axios from "axios";
import * as qs from "qs";

import { envVariables } from "../../constants/envVariables";
export const axiosClient = axios.create({
  baseURL: `${envVariables.API_BASE_URL}/api/v1`,
  withCredentials: true,
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat", encode: false });
    },
  },
});
