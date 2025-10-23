import { apiClient } from "./apiClient";
import type { PackageListResponse, PackageResponse } from "../types/package";

export const packageService = {
     // GET alla packet
     getAllPackages: async (): Promise<PackageListResponse> => {
          const response = await apiClient.get<PackageListResponse>
               (`/api/packages`);
          return response.data;
     },

     // GET ett packet via ID
     getPackageID: async (packageID: number): Promise<PackageResponse> => {
          const response = await apiClient.get<PackageResponse>(`/api/packages/${packageID}`);
          return response.data;
     }
};

