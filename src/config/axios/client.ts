import axios from "axios";
import { envVariables } from "../../constants/envVariables";
import * as qs from "qs";
export const axiosClient = axios.create({
    baseURL: `${envVariables.API_BASE_URL}/api/v1`,
    withCredentials: true,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat", encode: false });
      },
    },
  });
  