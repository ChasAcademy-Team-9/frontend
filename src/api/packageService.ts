import { apiClient } from './apiClient';
import type { PackageResponse, PackagesListResponse, Package } from '../types/package';

export const packageService = {
     // Hämta alla paket
     getAllPackages: async (): Promise<PackagesListResponse> => {
          const response = await apiClient.get<PackagesListResponse>('/api/packages');
          return response.data;
     },

     // Hämta ett specifikt paket via ID
     getPackageById: async (packageId: number): Promise<PackageResponse> => {
          const response = await apiClient.get<PackageResponse>(`/api/packages/${packageId}`);
          return response.data;
     },

     // Skapa ett nytt paket
     createPackage: async (packageData: Partial<Package>): Promise<PackageResponse> => {
          const response = await apiClient.post<PackageResponse>('/api/packages', packageData);
          return response.data;
     },

     // Uppdatera ett befintligt paket
     updatePackage: async (packageId: number, packageData: Partial<Package>): Promise<PackageResponse> => {
          const response = await apiClient.put<PackageResponse>(`/api/packages/${packageId}`, packageData);
          return response.data;
     },

     // Ta bort ett paket
     deletePackage: async (packageId: number): Promise<{ success: boolean; message: string }> => {
          const response = await apiClient.delete(`/api/packages/${packageId}`);
          return response.data;
     }
};