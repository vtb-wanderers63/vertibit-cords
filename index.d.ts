/**
 * Calculate the distance between two coordinate points using the Haversine formula
 * @param {Object} coord1 - First coordinate {lat: number, lng: number}
 * @param {Object} coord2 - Second coordinate {lat: number, lng: number}
 * @param {string} [unit='km'] - Distance unit ('km', 'miles', 'meters')
 * @returns {number} Distance in specified unit
 * @throws {Error} If coordinates are invalid or unit is not supported
 *
 * @example
 * const distance = calculateDistance(
 *   {lat: 40.7128, lng: -74.0060}, // New York City
 *   {lat: 34.0522, lng: -118.2437}, // Los Angeles
 *   'km'
 * );
 * console.log(`Distance: ${distance.toFixed(2)} km`);
 */
export function calculateDistance(coord1: any, coord2: any, unit?: string): number;
/**
 * Calculate the area of a geofence polygon using spherical geometry
 * @param {Array<Object>} coordinates - Array of coordinates [{lat: number, lng: number}, ...]
 * @param {string} [unit='km2'] - Area unit ('km2', 'miles2', 'meters2')
 * @returns {number} Area in specified unit
 * @throws {Error} If coordinates are invalid or unit is not supported
 *
 * @example
 * const area = calculateGeofenceArea([
 *   {lat: 40.7128, lng: -74.0060},
 *   {lat: 40.7614, lng: -73.9776},
 *   {lat: 40.7505, lng: -73.9934},
 *   {lat: 40.7128, lng: -74.0060} // Close the polygon
 * ], 'km2');
 * console.log(`Area: ${area.toFixed(2)} km²`);
 */
export function calculateGeofenceArea(coordinates: Array<any>, unit?: string): number;
/**
 * Find coordinates within a specified distance from a reference point
 * @param {Object} fromCoord - Reference coordinate {lat: number, lng: number}
 * @param {Array<Object>} coordinates - Array of coordinates to check [{lat: number, lng: number}, ...]
 * @param {number} maxDistance - Maximum distance to filter by
 * @param {string} [unit='km'] - Distance unit ('km', 'miles', 'meters')
 * @returns {Array<Object>} Array of coordinates within the specified distance, with distance property added
 * @throws {Error} If coordinates are invalid or unit is not supported
 *
 * @example
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
 */
export function getCoordinatesWithinDistance(fromCoord: any, coordinates: Array<any>, maxDistance: number, unit?: string): Array<any>;
/**
 * Find the closest coordinate from an array of coordinates
 * @param {Object} fromCoord - Reference coordinate {lat: number, lng: number}
 * @param {Array<Object>} coordinates - Array of coordinates to check [{lat: number, lng: number}, ...]
 * @param {string} [unit='km'] - Distance unit ('km', 'miles', 'meters')
 * @returns {Object|null} Closest coordinate with distance property, or null if array is empty
 * @throws {Error} If coordinates are invalid or unit is not supported
 *
 * @example
 * const closest = getClosestCoordinate(
 *   {lat: 40.7128, lng: -74.0060}, // New York City
 *   [
 *     {lat: 40.7614, lng: -73.9776, name: 'Central Park'},
 *     {lat: 34.0522, lng: -118.2437, name: 'Los Angeles'},
 *     {lat: 41.8781, lng: -87.6298, name: 'Chicago'}
 *   ],
 *   'km'
 * );
 * console.log(`Closest: ${closest.name} at ${closest.distance.toFixed(2)} km`);
 */
export function getClosestCoordinate(fromCoord: any, coordinates: Array<any>, unit?: string): any | null;
/**
 * Find the furthest coordinate from an array of coordinates
 * @param {Object} fromCoord - Reference coordinate {lat: number, lng: number}
 * @param {Array<Object>} coordinates - Array of coordinates to check [{lat: number, lng: number}, ...]
 * @param {string} [unit='km'] - Distance unit ('km', 'miles', 'meters')
 * @returns {Object|null} Furthest coordinate with distance property, or null if array is empty
 * @throws {Error} If coordinates are invalid or unit is not supported
 *
 * @example
 * const furthest = getFurthestCoordinate(
 *   {lat: 40.7128, lng: -74.0060}, // New York City
 *   [
 *     {lat: 40.7614, lng: -73.9776, name: 'Central Park'},
 *     {lat: 34.0522, lng: -118.2437, name: 'Los Angeles'},
 *     {lat: 41.8781, lng: -87.6298, name: 'Chicago'}
 *   ],
 *   'km'
 * );
 * console.log(`Furthest: ${furthest.name} at ${furthest.distance.toFixed(2)} km`);
 */
export function getFurthestCoordinate(fromCoord: any, coordinates: Array<any>, unit?: string): any | null;
/**
 * Check if a coordinate is inside a geofence polygon using ray casting algorithm
 * @param {Object} coord - Coordinate to check {lat: number, lng: number}
 * @param {Array<Object>} geofence - Array of coordinates defining the polygon [{lat: number, lng: number}, ...]
 * @returns {boolean} True if coordinate is inside the geofence, false otherwise
 * @throws {Error} If coordinates are invalid
 *
 * @example
 * const isInside = isCoordinateInGeofence(
 *   {lat: 40.7300, lng: -73.9950}, // Point to check
 *   [
 *     {lat: 40.7128, lng: -74.0060},
 *     {lat: 40.7614, lng: -73.9776},
 *     {lat: 40.7505, lng: -73.9934},
 *     {lat: 40.7128, lng: -74.0060}
 *   ]
 * );
 * console.log(`Coordinate is ${isInside ? 'inside' : 'outside'} the geofence`);
 */
export function isCoordinateInGeofence(coord: any, geofence: Array<any>): boolean;
/**
 * Check if a coordinate is within a specified distance from a geofence polygon's perimeter
 * @param {Object} coord - Coordinate to check {lat: number, lng: number}
 * @param {Array<Object>} geofence - Array of coordinates defining the polygon [{lat: number, lng: number}, ...]
 * @param {number} maxDistance - Maximum distance from geofence perimeter
 * @param {string} [unit='km'] - Distance unit ('km', 'miles', 'meters')
 * @returns {Object} Object with {isNear: boolean, distance: number, closestPoint: {lat, lng}}
 * @throws {Error} If coordinates are invalid or unit is not supported
 *
 * @example
 * const result = isCoordinateNearGeofence(
 *   {lat: 40.7300, lng: -73.9950}, // Point to check
 *   [
 *     {lat: 40.7128, lng: -74.0060},
 *     {lat: 40.7614, lng: -73.9776},
 *     {lat: 40.7505, lng: -73.9934}
 *   ],
 *   5, // Within 5 km of the geofence
 *   'km'
 * );
 * console.log(`Point is ${result.isNear ? 'near' : 'not near'} the geofence`);
 * console.log(`Distance to geofence: ${result.distance.toFixed(2)} km`);
 */
export function isCoordinateNearGeofence(coord: any, geofence: Array<any>, maxDistance: number, unit?: string): any;
