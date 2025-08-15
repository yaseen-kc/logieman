import axiosInstance from "./axios";

export type LoadDataPayload = {
  sourceCountry: string;
  destCountry: string;
  scheduledDate: string;
  weight: string;
  material: string;
  materialHSNCode?: string;
  loadType: "FTL" | "LTL" | "Project Basis";
};

export type CreateTempLoadRequest = {
  deviceHash: string;
  loadData: LoadDataPayload;
};

export async function createTempLoad(payload: CreateTempLoadRequest) {
  const response = await axiosInstance.post("/api/temp-loads/create", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
}


