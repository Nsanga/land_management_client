import { get } from "@/lib/httpService";

export const getAgentsFonciers = async () => {
  return await get("/users", { role: "agent_foncier" });
};
