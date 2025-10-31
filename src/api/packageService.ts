import { apiClient } from './apiClient';
import type { PackageResponse, PackageListResponse } from '../types/package';

export const packageService = {
     // GET alla paket
     getAllPackages: async (): Promise<PackageListResponse> => {
          const response = await apiClient.get<PackageListResponse>('/api/packages');
          return response.data;
     },

     // GET ett specifikt paket via ID
     getPackageById: async (packageId: number): Promise<PackageResponse> => {
          const response = await apiClient.get<PackageResponse>(`/api/packages/${packageId}`);
          return response.data;
     },

     // Hämta befintligt paket från QR-kod (lägg till i lista)
     addExistingPackageFromQR: async (qrCode: string): Promise<PackageResponse> => {
          const qrData = JSON.parse(qrCode);
          const packageId = qrData.paketId;

          const response = await apiClient.get<PackageResponse>(`/api/packages/${packageId}`);
          return response.data;
     },

     createPackageFromQR: async (qrCode: string) => {
          const response = await apiClient.post('/api/packages', { 
               qrCode: qrCode,
          });
          return response.data;
     }
};