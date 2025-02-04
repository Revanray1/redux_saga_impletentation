
interface APIResponseInfo {
  info: {
    message: string;
    code: number;
  };
}

export type APIResponse = {
  code: number;
  message: string;
};


export type SampleUserData = {
  name:string;
  address:string;
  age: number;
}[]

export type SampleUserDataTypesResponse = APIResponseInfo & {  // refer saga.ts  line number 24 for Api response usage
data : SampleUserData
}


export type userDetails ={
  Name:string;
  Type:string;
  Value:number
}
export type userResponseDetails = APIResponseInfo & {   // This type describes the meta-information returned with an API response. It contains:
  data : userDetails[]
}
