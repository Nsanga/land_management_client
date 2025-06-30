import { startLoading } from "@/store/authSlice";
import { fetchAgentsFonciersSuccess, fetchAgentsFonciersFailure } from "@/store/usersSlice";
import { AppDispatch } from "./store";
import { getAgentsFonciers } from "@/services/userService";
import { fetchRequestFailure, fetchRequestSuccess, startLoadingRequests } from "@/store/requestSlice";
import { getAllRequests } from "@/services/requestService";
import { AxiosError } from "axios";

export const fetchAgentsFonciers = async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  try {
    const data = await getAgentsFonciers();
    dispatch(fetchAgentsFonciersSuccess(data));
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.message || error.message
        : "Erreur lors du chargement des agents fonciers";
    
    dispatch(fetchAgentsFonciersFailure(errorMessage));
  }
};

export const fetchRequests = async (dispatch: AppDispatch) => {
  dispatch(startLoadingRequests());

  try {
    const data = await getAllRequests();
    dispatch(fetchRequestSuccess(data));
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.message || error.message
        : "Erreur lors du chargement des agents fonciers";
    
    dispatch(fetchRequestFailure(errorMessage));
  }
};
