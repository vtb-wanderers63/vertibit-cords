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
 * Find coordinates within a specified distance from a reference point
 * @param fromCoord Reference coordinate point
 * @param coordinates Array of coordinates to check against
 * @param maxDistance Maximum distance to include in results
 * @param unit Distance unit (defaults to 'km')
 * @returns Array of coordinates within the specified distance, with distance property added
 * @throws Error if coordinates are invalid or unit is not supported
 * 
 * @example
 * ```typescript
 * const nearby = getCoordinatesWithinDistance(
 *   {lat: 40.7128, lng: -74.0060}, // New York City
 *   [
 *     {lat: 40.7614, lng: -73.9776, name: 'Central Park'},
 *     {lat: 34.0522, lng: -118.2437, name: 'Los Angeles'}
 *   ],
 *   50, // 50 km radius
 *   'km'
 * );
 * console.log(`Found ${nearby.length} locations within 50km`);
 * ```
 */
export function getCoordinatesWithinDistance(
  fromCoord: Coordinate,
  coordinates: Coordinate[],
  maxDistance: number,
  unit?: DistanceUnit
): (Coordinate & { distance: number })[];

/**
 * Find the closest coordinate from an array of coordinates
 * @param fromCoord Reference coordinate point
 * @param coordinates Array of coordinates to check against
 * @param unit Distance unit (defaults to 'km')
 * @returns Closest coordinate with distance property, or null if array is empty
 * @throws Error if coordinates are invalid or unit is not supported
 * 
 * @example
 * ```typescript
 * const closest = getClosestCoordinate(
 *   {lat: 40.7128, lng: -74.0060}, // New York City
 *   [
 *     {lat: 40.7614, lng: -73.9776, name: 'Central Park'},
 *     {lat: 34.0522, lng: -118.2437, name: 'Los Angeles'},
 *     {lat: 41.8781, lng: -87.6298, name: 'Chicago'}
 *   ],
 *   'km'
 * );
 * console.log(`Closest: ${closest?.name} at ${closest?.distance.toFixed(2)} km`);
 * ```
 */
export function getClosestCoordinate(
  fromCoord: Coordinate,
  coordinates: Coordinate[],
  unit?: DistanceUnit
): (Coordinate & { distance: number }) | null;

/**
 * Find the furthest coordinate from an array of coordinates
 * @param fromCoord Reference coordinate point
 * @param coordinates Array of coordinates to check against
 * @param unit Distance unit (defaults to 'km')
 * @returns Furthest coordinate with distance property, or null if array is empty
 * @throws Error if coordinates are invalid or unit is not supported
 * 
 * @example
 * ```typescript
 * const furthest = getFurthestCoordinate(
 *   {lat: 40.7128, lng: -74.0060}, // New York City
 *   [
 *     {lat: 40.7614, lng: -73.9776, name: 'Central Park'},
 *     {lat: 34.0522, lng: -118.2437, name: 'Los Angeles'},
 *     {lat: 41.8781, lng: -87.6298, name: 'Chicago'}
 *   ],
 *   'km'
 * );
 * console.log(`Furthest: ${furthest?.name} at ${furthest?.distance.toFixed(2)} km`);
 * ```
 */
export function getFurthestCoordinate(
  fromCoord: Coordinate,
  coordinates: Coordinate[],
  unit?: DistanceUnit
): (Coordinate & { distance: number }) | null;

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
  getCoordinatesWithinDistance: typeof getCoordinatesWithinDistance;
  getClosestCoordinate: typeof getClosestCoordinate;
  getFurthestCoordinate: typeof getFurthestCoordinate;
};

export default vertibitCords;