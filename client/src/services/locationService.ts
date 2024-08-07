import { ILocationsResponse } from "../models/Location/Interfaces/ILocationsResponse";
import { IGeolocationResponse } from "../models/Location/Interfaces/IGeolocationResponse";
import { axiosInstance } from "./axiosInstance";
import { IErrorResponse } from "../models/error/IErrorResponse";

export const fetchLocationsByName = async (
  searchValue: string,
): Promise<ILocationsResponse[] | IErrorResponse> => {
  try {
    const response = await axiosInstance.get<ILocationsResponse[]>(
      "location/name",
      {
        params: {
          city: searchValue,
        },
      },
    );

    return response.data;
  } catch (error) {
    return {
      error: true,
      message: "An error occurred while fetching locations",
    };
  }
};

export const fetchLocationByCoordinates = async (
  lat: string,
  lon: string,
): Promise<IGeolocationResponse> => {
  try {
    const response = await axiosInstance.get<IGeolocationResponse>(
      "/location/coordinates",
      {
        params: {
          lat: lat,
          lon: lon,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather location", error);
    throw error;
  }
};
