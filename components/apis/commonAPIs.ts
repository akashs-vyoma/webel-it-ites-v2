import { deleteCookie } from "@/utils/cookies";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const callAPI = async (url: string, body: any) => {
    const response = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
}

export const uploadDocumentAPI = async (
  url: string,
  file: File,
  docDetails: any
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('docDetials', JSON.stringify(docDetails));

  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      accept: '*/*',
    },
    body: formData,
  });

  if(response?.status == 401) {
    deleteCookie("ad_auth");
    throw new Error(`Aadhaar authentication expired. Please verify Aadhaar again.`);
  }

  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`);
  }

  return await response.json();
};
