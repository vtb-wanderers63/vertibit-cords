/**
 * vertibit-cords - Geospatial calculations using coordinates
 * Provides functions for calculating distances and geofence areas
 */

/**
 * Validates if a coordinate object has valid latitude and longitude values
 * @param {Object} coord - Coordinate object with lat and lng properties
 * @param {string} paramName - Parameter name for error messages
 * @throws {Error} If coordinate is invalid
 */
function validateCoordinate(coord, paramName = 'coordinate') {
  if (!coord || typeof coord !== 'object') {
    throw new Error(`${paramName} must be an object with lat and lng properties`);
  }

  if (typeof coord.lat !== 'number' || typeof coord.lng !== 'number') {
    throw new Error(`${paramName} must have numeric lat and lng properties`);
  }

  if (coord.lat < -90 || coord.lat > 90) {
    throw new Error(`${paramName} latitude must be between -90 and 90 degrees`);
  }

  if (coord.lng < -180 || coord.lng > 180) {
    throw new Error(`${paramName} longitude must be between -180 and 180 degrees`);
  }
}

/**
 * Validates and normalizes distance/area unit
 * @param {string} unit - Unit string to validate
 * @param {string[]} validUnits - Array of valid units
 * @param {string} defaultUnit - Default unit if none provided
 * @returns {string} Normalized unit
 * @throws {Error} If unit is invalid
 */
function validateUnit(unit, validUnits, defaultUnit) {
  if (!unit) return defaultUnit;

  if (typeof unit !== 'string') {
    throw new Error('Unit must be a string');
  }

  const normalizedUnit = unit.toLowerCase();
  if (!validUnits.includes(normalizedUnit)) {
    throw new Error(`Invalid unit: ${unit}. Valid units are: ${validUnits.join(', ')}`);
  }

  return normalizedUnit;
}

/**
 * Converts degrees to radians
 * @param {number} degrees - Degrees to convert
 * @returns {number} Radians
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Converts radians to degrees
 * @param {number} radians - Radians to convert
 * @returns {number} Degrees
 */
function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

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
function calculateDistance(coord1, coord2, unit = 'km') {
  // Validate inputs
  validateCoordinate(coord1, 'coord1');
  validateCoordinate(coord2, 'coord2');

  const validUnits = ['km', 'miles', 'meters'];
  const normalizedUnit = validateUnit(unit, validUnits, 'km');

  // Earth's radius in kilometers
  const R = 6371;

  // Convert coordinates to radians
  const lat1Rad = toRadians(coord1.lat);
  const lat2Rad = toRadians(coord2.lat);
  const deltaLatRad = toRadians(coord2.lat - coord1.lat);
  const deltaLngRad = toRadians(coord2.lng - coord1.lng);

  // Haversine formula
  const a =
    Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLngRad / 2) * Math.sin(deltaLngRad / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  let distance = R * c;

  // Convert to requested unit
  switch (normalizedUnit) {
    case 'miles':
      distance *= 0.621371; // km to miles
      break;
    case 'meters':
      distance *= 1000; // km to meters
      break;
    // 'km' is already in kilometers
  }

  return distance;
}

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
function getCoordinatesWithinDistance(fromCoord, coordinates, maxDistance, unit = 'km') {
  // Validate inputs
  validateCoordinate(fromCoord, 'fromCoord');

  if (!Array.isArray(coordinates)) {
    throw new Error('Coordinates must be an array');
  }

  if (typeof maxDistance !== 'number' || maxDistance < 0) {
    throw new Error('Max distance must be a non-negative number');
  }

  const validUnits = ['km', 'miles', 'meters'];
  const normalizedUnit = validateUnit(unit, validUnits, 'km');

  // Validate each coordinate and calculate distances
  const results = [];

  coordinates.forEach((coord, index) => {
    validateCoordinate(coord, `coordinates[${index}]`);

    const distance = calculateDistance(fromCoord, coord, normalizedUnit);

    if (distance <= maxDistance) {
      results.push({
        ...coord,
        distance: distance,
      });
    }
  });

  // Sort by distance (closest first)
  results.sort((a, b) => a.distance - b.distance);

  return results;
}

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
function getClosestCoordinate(fromCoord, coordinates, unit = 'km') {
  // Validate inputs
  validateCoordinate(fromCoord, 'fromCoord');

  if (!Array.isArray(coordinates)) {
    throw new Error('Coordinates must be an array');
  }

  if (coordinates.length === 0) {
    return null;
  }

  const validUnits = ['km', 'miles', 'meters'];
  const normalizedUnit = validateUnit(unit, validUnits, 'km');

  let closestCoord = null;
  let minDistance = Infinity;

  coordinates.forEach((coord, index) => {
    validateCoordinate(coord, `coordinates[${index}]`);

    const distance = calculateDistance(fromCoord, coord, normalizedUnit);

    if (distance < minDistance) {
      minDistance = distance;
      closestCoord = {
        ...coord,
        distance: distance,
      };
    }
  });

  return closestCoord;
}

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
function getFurthestCoordinate(fromCoord, coordinates, unit = 'km') {
  // Validate inputs
  validateCoordinate(fromCoord, 'fromCoord');

  if (!Array.isArray(coordinates)) {
    throw new Error('Coordinates must be an array');
  }

  if (coordinates.length === 0) {
    return null;
  }

  const validUnits = ['km', 'miles', 'meters'];
  const normalizedUnit = validateUnit(unit, validUnits, 'km');

  let furthestCoord = null;
  let maxDistance = -1;

  coordinates.forEach((coord, index) => {
    validateCoordinate(coord, `coordinates[${index}]`);

    const distance = calculateDistance(fromCoord, coord, normalizedUnit);

    if (distance > maxDistance) {
      maxDistance = distance;
      furthestCoord = {
        ...coord,
        distance: distance,
      };
    }
  });

  return furthestCoord;
}

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
function calculateGeofenceArea(coordinates, unit = 'km2') {
  // Validate inputs
  if (!Array.isArray(coordinates)) {
    throw new Error('Coordinates must be an array');
  }

  if (coordinates.length < 3) {
    throw new Error('At least 3 coordinates are required to form a polygon');
  }

  // Validate each coordinate
  coordinates.forEach((coord, index) => {
    validateCoordinate(coord, `coordinates[${index}]`);
  });

  const validUnits = ['km2', 'miles2', 'meters2'];
  const normalizedUnit = validateUnit(unit, validUnits, 'km2');

  // Earth's radius in kilometers
  const R = 6371;

  // Ensure polygon is closed (first and last points are the same)
  const coords = [...coordinates];
  const firstCoord = coords[0];
  const lastCoord = coords[coords.length - 1];

  if (firstCoord.lat !== lastCoord.lat || firstCoord.lng !== lastCoord.lng) {
    coords.push({ ...firstCoord }); // Close the polygon
  }

  // Calculate area using spherical excess formula
  let area = 0;
  const n = coords.length - 1; // Subtract 1 because we added closing point

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const lat1 = toRadians(coords[i].lat);
    const lat2 = toRadians(coords[j].lat);
    const deltaLng = toRadians(coords[j].lng - coords[i].lng);

    area += deltaLng * (2 + Math.sin(lat1) + Math.sin(lat2));
  }

  area = (Math.abs(area) * R * R) / 2;

  // Convert to requested unit
  switch (normalizedUnit) {
    case 'miles2':
      area *= 0.386102; // km² to miles²
      break;
    case 'meters2':
      area *= 1000000; // km² to m²
      break;
    // 'km2' is already in square kilometers
  }

  return area;
}

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
function isCoordinateInGeofence(coord, geofence) {
  // Validate inputs
  validateCoordinate(coord, 'coord');

  if (!Array.isArray(geofence)) {
    throw new Error('Geofence must be an array of coordinates');
  }

  if (geofence.length < 3) {
    throw new Error('At least 3 coordinates are required to form a geofence polygon');
  }

  // Validate each geofence coordinate
  geofence.forEach((fenceCoord, index) => {
    validateCoordinate(fenceCoord, `geofence[${index}]`);
  });

  // Ray casting algorithm (point-in-polygon test)
  // Cast a ray from the point to infinity (horizontally to the right)
  // Count how many times it intersects with polygon edges
  // Odd number of intersections = inside, even = outside

  const lat = coord.lat;
  const lng = coord.lng;
  let inside = false;

  for (let i = 0, j = geofence.length - 1; i < geofence.length; j = i++) {
    const lat1 = geofence[i].lat;
    const lng1 = geofence[i].lng;
    const lat2 = geofence[j].lat;
    const lng2 = geofence[j].lng;

    // Check if point's latitude is within the edge's latitude range
    // and if a horizontal ray from the point intersects the edge
    const intersect =
      lat1 > lat !== lat2 > lat && lng < ((lng2 - lng1) * (lat - lat1)) / (lat2 - lat1) + lng1;

    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

// CommonJS exports
module.exports = {
  calculateDistance,
  calculateGeofenceArea,
  getCoordinatesWithinDistance,
  getClosestCoordinate,
  getFurthestCoordinate,
};

// ES Module exports (for environments that support it)
if (typeof exports !== 'undefined') {
  exports.calculateDistance = calculateDistance;
  exports.isCoordinateInGeofence = isCoordinateInGeofence;
  exports.calculateGeofenceArea = calculateGeofenceArea;
  exports.getCoordinatesWithinDistance = getCoordinatesWithinDistance;
  exports.getClosestCoordinate = getClosestCoordinate;
  exports.getFurthestCoordinate = getFurthestCoordinate;
}