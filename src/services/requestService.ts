import { get, postMultipart } from "@/lib/httpService";

interface RequestFormData {
  propertyType: string;
  location: string;
  description: string;
  urgency: string;
  agent?: string;  // Optional field
  documents: File[];
}

export const makeRequest = async ({ formData }: { formData: RequestFormData }) => {
  const data = new FormData();

  data.append("propertyType", formData.propertyType);
  data.append("location", formData.location);
  data.append("description", formData.description);
  data.append("urgency", formData.urgency);
  if (formData.agent) data.append("agent", formData.agent);

  // Ajouter les fichiers
  formData.documents.forEach((file: File) => {
    data.append("documents", file);
  });

  return await postMultipart("/requests", data);
};

export const getAllRequests = async () => {
  return await get("/requests/my-requests");
};
