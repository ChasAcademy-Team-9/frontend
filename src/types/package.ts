export interface Package {
     PackageID: number;
     DriverID: number;
     SenderID: number;
     ReceiverID: number;
     PackageWidth: number;
     PackageHeight: number;
     PackageWeight: number;
     PackageDepth: number;
     Status: string | null;
     GPSLongitude: number | null;
     GPSLatitude: number | null;
     Origin: string | null;
     Destination: string | null;
     DriverName: string;
     SenderName: string;
     ReceiverName: string;
}
 // när det är bara ett paket 
export interface PackageResponse {
     success: boolean;
     package: Package;
}

 // när det är flera packet 
export interface PackageListResponse {
     success: boolean;
     packages: Package[];
}