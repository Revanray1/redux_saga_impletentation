import { HDFC_API_ENDPOINT, getData, getParams, postDataMultipart, downloadFile, getFileBlob, postData } from "../../api/commons";
import {
  SampleUserDataTypesResponse
} from "./dataTypes";

export const  GetUserRequestAPI = async (
  token: string,
  nocProjectId: number,
): Promise<SampleUserDataTypesResponse | null> => {
  // const url = `${HDFC_API_ENDPOINT}/external/bulknoc/getDraftDetails${getParams({ nocProjectId })}`;
  const url = `http://localhost:3000/users/${getParams({ nocProjectId })}`;
  try {
    const res: SampleUserDataTypesResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};