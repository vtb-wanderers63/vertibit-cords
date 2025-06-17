/**
 * TypeScript definitions for vertibit-cords
 */

/**
 * Coordinate object with latitude and longitude
 */
export interface Coordinate {
    /** Latitude in decimal degrees (-90 to 90) */
    lat: number;
    /** Longitude in decimal degrees (-180 to 180) */
    lng: number;
  }
  
  /**
   * Supported distance units
   */
  export type DistanceUnit = 'km' | 'miles' | 'meters';
  
  /**
   * Supported area units
   */
  export type AreaUnit = 'km2' | 'miles2' | 'meters2';
  
  /**
   * Calculate the distance between two coordinate points using the Haversine formula
   * @param coord1 First coordinate point
   * @param coord2 Second coordinate point
   * @param unit Distance unit (defaults to 'km')
   * @returns Distance in specified unit
   * @throws Error if coordinates are invalid or unit is not supported
   * 
   * @example
   * ```typescript
   * const distance = calculateDistance(
   *   {lat: 40.7128, lng: -74.0060}, // New York City
   *   {lat: 34.0522, lng: -118.2437}, // Los Angeles
   *   'km'
   * );
   * console.log(`Distance: ${distance.toFixed(2)} km`);
   * ```
   */
  export function calculateDistance(
    coord1: Coordinate,
    coord2: Coordinate,
    unit?: DistanceUnit
  ): number;
  
  /**
   * Calculate the area of a geofence polygon using spherical geometry
   * @param coordinates Array of coordinate points forming a polygon
   * @param unit Area unit (defaults to 'km2')
   * @returns Area in specified unit
   * @throws Error if coordinates are invalid or unit is not supported
   * 
   * @example
   * ```typescript
   * const area = calculateGeofenceArea([
   *   {lat: 40.7128, lng: -74.0060},
   *   {lat: 40.7614, lng: -73.9776},
   *   {lat: 40.7505, lng: -73.9934},
   *   {lat: 40.7128, lng: -74.0060} // Close the polygon
   * ], 'km2');
   * console.log(`Area: ${area.toFixed(2)} km²`);
   * ```
   */
  export function calculateGeofenceArea(
    coordinates: Coordinate[],
    unit?: AreaUnit
  ): number;
  
  /**
   * Default export object containing all functions
   */
  declare const vertibitCords: {
    calculateDistance: typeof calculateDistance;
    calculateGeofenceArea: typeof calculateGeofenceArea;
  };
  
  export default vertibitCords;