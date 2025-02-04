import { openWarningModal } from "../../widgets/WarningModal";
import appStore from "../common/store";
import { logout, setActivityTimestamp } from "../services/login/actions";
import { env } from "../../env";
import dayjs from "dayjs";
import { FAILED_TO_CONNECT_NETWORK, networkErrorCode } from "../../utils/constants";
import { call } from "redux-saga/effects";
import { errorNotification, successNotification } from "../../modules/Components/UtilityFunctions";
import { createJWTToken, verifyResponse } from "./jwtToken";
import { versionApiUrl } from "../services/login/api";
export const signatureBlackListAPis = [versionApiUrl];
export const HDFC_API_ENDPOINT = "https://dragon-qa-external.trugenie.ai/dragon-external-api";
//location.protocol + '//' + location.host+"/dragon-api";
// export const HDFC_API_ENDPOINT = import.meta.env.VITE_REACT_APP_HDFC_BASE_URL;
export const VERSION_TOKEN = env.VITE_REACT_APP_GET_VERSION_TOKEN;
// export const HDFC_API_ENDPOINT = "http://4.188.251.175:8080/DragonAPI";
export const IDENTIFIER = "nFjq5SdMgP";
type HandleErrorProps = {
  error: any; // Adjust type as per your error handling needs
  action: { callback?: (success: boolean, message?: string) => void };
  message: string;
  networkErrorCode: number[]; // Define networkErrorCode type as needed
};

type Header = {
  "Content-Type"?: string;
  "Accept-Encoding"?: string;
  Accept: string;
  Authorization?: string;
  "Access-Control-Allow-Origin"?: string;
  "Access-Control-Allow-Headers"?: string;
};

export const getBlobFilename = (response: Response) => {
  const contentDisposition = response.headers.get("Content-Disposition");
  let filename = contentDisposition?.split("filename=")[1];

  if (filename) {
    filename = filename.replace(/"/g, "");
  }
  return filename;
};

export const getParams = (params: object) => {
  const url_params = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => key + "=" + value.toString())
    .join("&");
  return url_params.length > 0 ? "?" + url_params : "";
};

export const generateHeader = (token?: string, contentType = "application/json; charset=utf-8") => {
  let header: Header = {
    Accept: contentType,
    "Accept-Encoding": "gzip",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
  };

  if (contentType) {
    header["Content-Type"] = contentType;
  }
  if (token) {
    header = {
      ...header,
      Authorization: `Bearer ${token}`,
    };
  }
  return header;
};

export const generateHeaderMultipart = (token?: string) => {
  let auth = {};
  if (token) {
    auth = {
      Authorization: `Bearer ${token}`,
    };
  }
  const header = new Headers({
    Accept: "application/json",
    "Accept-Encoding": "gzip",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    ...auth,
  });

  return header;
};

export const postData = async (url: string = HDFC_API_ENDPOINT, data: any, token?: string) => {
  if (data && Object.keys(data).length > 0) {
    const sign = await createJWTToken(data);
    data = { ...data, signature: sign };
  }
  return fetch(url, {
    method: "POST",
    headers: generateHeader(token),
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(async response => {
      if (!response.ok) {
        if (response.status === 401 || response.status === 503 || response.status === 504) throw response.status;
        else throw await response.json();
      }
      const result = await response.json();
      return verifyResponse(result);
    })
    .catch(error => {
      throw error;
    });
};

export const postDataMultipart = (url: string = HDFC_API_ENDPOINT, data: FormData, token?: string) => {
  return fetch(url, {
    method: "POST",
    headers: generateHeaderMultipart(token),
    body: data,
  })
    .then(async response => {
      if (!response.ok) {
        console.log("$$$",response);
        // return response.json();
        if (response.status === 401 || response.status === 503 || response.status === 504) {
          throw response.status;
        } else {
          const responseData = await response.json();
          throw await { ...responseData, code: response.status };
        }
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
};

// Function to fetch and download the report
export const exportReport = (url: string = HDFC_API_ENDPOINT, token?: string, data?: any, contentType?: string) => {
  return fetch(url, {
    method: "GET",
    headers: generateHeader(token, contentType),
    body: data ? JSON.stringify(data) : null,
  })
    .then(async response => {
      if (!response.ok) {
        if (response.status === 401 || response.status === 503 || response.status === 504) throw response.status;
        else throw new Error("Failed to download report");
      }
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "report";
      if (contentDisposition) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, "");
        }
      }
      const blob = await response.blob();
      return { blob, filename };
    })
    .catch(() => {
      throw new Error("Failed to download report");
    });
};

export const getData = async (url: string = HDFC_API_ENDPOINT, token?: string, data?: any, contentType?: string) => {
  if (data && Object.keys(data).length > 0) {
    const sign = await createJWTToken(data);
    data = { ...data, signature: sign };
  }
  return fetch(url, {
    method: data ? "POST" : "GET",
    headers: generateHeader(token, contentType),
    body: data ? JSON.stringify(data) : null,
  })
    .then(async response => {
      if (!response.ok) {
        if (response.status === 401 || response.status === 503 || response.status === 504) {
          throw response.status;
        } else throw await response.json();
      }
      const result = await response.json();
      if (!url.includes(signatureBlackListAPis.join(","))) return verifyResponse(result);
      else return result;
    })
    .catch(error => {
      throw error;
    });
};

export const getCaptchaResponse = async (url: string = HDFC_API_ENDPOINT, token?: string, data?: any, contentType?: string) => {
  return fetch(url, {
    method: data ? "POST" : "GET",
    headers: generateHeader(token, contentType),
    body: data ? JSON.stringify(data) : null,
  })
    .then(async response => {
      if (!response.ok) {
        if (response.status === 401 || response.status === 503 || response.status === 504) {
          throw response.status;
        } else if (response.status === 500) throw "Invalid RequestId!";
      }
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const putData = async (data: any, url: string = HDFC_API_ENDPOINT, token?: string) => {
  const body = data ? { body: JSON.stringify(data) } : {}; // body data type must match "Content-Type" header
  return fetch(url, {
    method: "PUT",
    headers: generateHeader(token),
    ...body,
  })
    .then(async response => {
      if (!response.ok) {
        if (response.status === 401 || response.status === 503 || response.status === 504) throw response.status;
        else throw await response.json();
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
};

export const downloadFile = async (url: string = HDFC_API_ENDPOINT, method: string, token?: string, data?: any) => {
  const req = token
    ? {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      }
    : {
        method: method,
        body: data,
      };
  return fetch(url, req)
    .then(async response => {
      if (!response.ok) {
        if (response.status === 401 || response.status === 503 || response.status === 504) throw response.status;
        else {
          const responseData = await response.json();
          throw await { ...responseData, code: response.status };
        }
      }
      const contentDisposition = response.headers.get("Content-Disposition");
      let fileName: string | null = null;
      if (contentDisposition) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
          fileName = matches[1].replace(/['"]/g, "");
        }
        return {
          fileName: fileName,
          data: await response.blob(),
        };
      } else {
        return await response.json();
      }
    })
    .catch(error => {
      throw error;
    });
};

export const postdownloadFile = async (url: string = HDFC_API_ENDPOINT, method: string, token?: string, data?: any) => {
  if (data && Object.keys(data).length > 0) {
    const sign = await createJWTToken(data);
    data = { ...data, signature: sign };
  }
  const req = token
    ? {
        method: method,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : null,
      }
    : {
        method: method,
        body: data ? JSON.stringify(data) : null,
      };
  return fetch(url, req)
    .then(async response => {
      if (!response.ok) {
        if (response.status === 401 || response.status === 503 || response.status === 504) throw response.status;
        else {
          const responseData = await response.json();
          throw await { ...responseData, code: response.status };
        }
      }
      const contentDisposition = response.headers.get("Content-Disposition");
      let fileName: string | null = null;
      if (contentDisposition) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
          fileName = matches[1].replace(/['"]/g, "");
        }
        return {
          fileName: fileName,
          data: await response.blob(),
        };
      } else {
        return await response.json();
      }
    })
    .catch(error => {
      throw error;
    });
};

const { fetch: originalFetch } = window;

window.fetch = async (...args) => {
  const [resource, config] = args;
  const response = await originalFetch(resource, config);
  const { store } = appStore;
  const isLoggedIn: boolean = store?.getState()?.hdfcAuth?.accessToken !== undefined;
  if (isLoggedIn) {
    store.dispatch(setActivityTimestamp(dayjs().valueOf()));
  }
  if (isLoggedIn && response.status === 401) {
    await openWarningModal();
    store.dispatch(logout());
    // persist.purge();
  }
  return response;
};

export function* handleError(error, action, message, callback?: (success: boolean, message?: string) => void) {
  let errorMessage = error?.info?.message || message;
  if (action?.callback) {
    if (error?.message) {
      errorMessage = error.message;
    }
    // if(networkErrorCode.includes(error) ){
    yield call(errorNotification, networkErrorCode.includes(error) ? FAILED_TO_CONNECT_NETWORK : errorMessage);
    // }
    yield call(action?.callback, false, networkErrorCode.includes(error) ? FAILED_TO_CONNECT_NETWORK : errorMessage);
  } else {
    yield call(errorNotification, networkErrorCode.includes(error) ? FAILED_TO_CONNECT_NETWORK : errorMessage);
  }
}


export const getFileBlob = (url: string = HDFC_API_ENDPOINT, token?: string, contentType = "application/octet-stream; charset=utf-8") => {
  return fetch(url, {
    method: "GET",
    // headers: generateHeader(token, contentType),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      const fileName = getBlobFilename(response);
      return {
        fileName: fileName,
        data: await response.blob(),
      };
    })
    .catch(error => {
      throw error;
    });
};