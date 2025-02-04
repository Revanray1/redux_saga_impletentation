import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, postdownloadFile } from "../../api/commons";
import { FileResponse } from "./dataTypes";

export const downloadRowDataAPI = async (token: string, containerName: string, filePath: string, fileName: string): Promise<FileResponse | null> => {
  const params = {
    containerName,
    filePath,
    fileName,
  };
  const url = `${HDFC_API_ENDPOINT}/fileManager/downloadFile`;
  try {
    const result: FileResponse | null = await postdownloadFile(url, "POST", token, params);
    if (result?.fileName) {
      FileSaver.saveAs(result?.data, result?.fileName !== undefined ? result?.fileName : "");
      return result;
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.log(`Error while downloading data: ${error}`);
    return null;
  }
};
