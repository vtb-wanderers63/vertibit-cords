## Advanced Examples

### Location-Based Services

```javascript
// Restaurant recommendation system
const userLocation = {lat: 40.7128, lng: -74.0060}; // User in NYC

const restaurants = [
  {lat: 40.7614, lng: -73.9776, name: 'Central Park Cafe', rating: 4.5},
  {lat: 40.7505, lng: -73.9934, name: 'Times Square Diner', rating: 4.2},
  {lat: 40.6892, lng: -74.0445, name: 'Liberty Island Grill', rating: 4.8},
  {lat: 40.8176, lng: -73.9782, name: 'Harlem Soul Food', rating: 4.6}
];

// Find restaurants within 10km
const nearbyRestaurants = getCoordinatesWithinDistance(
  userLocation, restaurants, 10, 'km'
);

// Find closest restaurant
const closest = getClosestCoordinate(userLocation, restaurants, 'km');
console.log(`Nearest restaurant: ${closest.name} (${closest.distance.toFixed(2)} km away)`);

// Find furthest restaurant (maybe for special occasions)
const furthest = getFurthestCoordinate(userLocation, restaurants, 'km');
console.log(`Adventure dining: ${furthest.name} (${furthest.distance.toFixed(2)} km away)`);
```

### Delivery Route Optimization

```javascript
const warehouse = {lat: 40.7282, lng: -73.7949}; // JFK area

const deliveryPoints = [
  {lat: 40.7589, lng: -73.9851, address: 'Manhattan Office', priority: 'high'},
  {lat: 40.6782, lng: -73.9442, address: 'Brooklyn Store', priority: 'medium'},
  {lat: 40.8448, lng: -73.8648, address: 'Bronx Warehouse', priority: 'low'},
  {lat: 40.7505, lng: -73.9934, address: 'Times Square Drop', priority: 'urgent'}
];

// Find deliveries within 25km range
const inRangeDeliveries = getCoordinatesWithinDistance(
  warehouse,# vertibit-cords

A powerful JavaScript package for geospatial calculations using coordinates. Provides accurate distance calculations and geofence area computations using proven mathematical formulas.

## Features

- 🌍 **Distance Calculations**: Calculate distances between two points using the Haversine formula
- 📐 **Geofence Areas**: Calculate polygon areas using spherical geometry
- 🎯 **High Precision**: Suitable for professional geospatial applications
- 📦 **Multiple Formats**: Support for both CommonJS and ES modules
- 🔧 **TypeScript Support**: Full TypeScript definitions included
- ✅ **Input Validation**: Comprehensive validation with descriptive error messages
- 🌐 **Multiple Units**: Support for kilometers, miles, meters, and their squared equivalents

## Installation

```bash
npm install vertibit-cords
```

## Quick Start

### CommonJS

```javascript
const { 
  calculateDistance, 
  calculateGeofenceArea, 
  getCoordinatesWithinDistance,
  getClosestCoordinate,
  getFurthestCoordinate
} = require('vertibit-cords');

// Calculate distance between New York and Los Angeles
const distance = calculateDistance(
  {lat: 40.7128, lng: -74.0060}, // New York City
  {lat: 34.0522, lng: -118.2437}, // Los Angeles
  'km'
);
console.log(`Distance: ${distance.toFixed(2)} km`);

// Find coordinates within 50km of New York
const nearby = getCoordinatesWithinDistance(
  {lat: 40.7128, lng: -74.0060}, // New York City
  [
    {lat: 40.7614, lng: -73.9776, name: 'Central Park'},
    {lat: 34.0522, lng: -118.2437, name: 'Los Angeles'},
    {lat: 40.6892, lng: -74.0445, name: 'Statue of Liberty'}
  ],
  50, // 50 km radius
  'km'
);
console.log(`Found ${nearby.length} locations within 50km`);
```

### ES Modules

```javascript
import { 
  calculateDistance, 
  calculateGeofenceArea,
  getCoordinatesWithinDistance,
  getClosestCoordinate,
  getFurthestCoordinate
} from 'vertibit-cords';

// Find the closest location
const closest = getClosestCoordinate(
  {lat: 40.7128, lng: -74.0060}, // New York City
  [
    {lat: 40.7614, lng: -73.9776, name: 'Central Park'},
    {lat: 34.0522, lng: -118.2437, name: 'Los Angeles'},
    {lat: 41.8781, lng: -87.6298, name: 'Chicago'}
  ],
  'km'
);
console.log(`Closest: ${closest.name} at ${closest.distance.toFixed(2)} km`);
```

## API Reference

### calculateDistance(coord1, coord2, unit)

Calculate the distance between two coordinate points using the Haversine formula.

**Parameters:**
- `coord1` (Object): First coordinate `{lat: number, lng: number}`
- `coord2` (Object): Second coordinate `{lat: number, lng: number}`
- `unit` (string, optional): Distance unit - `'km'`, `'miles'`, or `'meters'` (defaults to `'km'`)

**Returns:** `number` - Distance in specified unit

**Example:**
```javascript
const distance = calculateDistance(
  {lat: 51.5074, lng: -0.1278}, // London
  {lat: 48.8566, lng: 2.3522},  // Paris
  'km'
);
console.log(`London to Paris: ${distance.toFixed(2)} km`);
// Output: London to Paris: 344.70 km
```

### getCoordinatesWithinDistance(fromCoord, coordinates, maxDistance, unit)

Find all coordinates within a specified distance from a reference point.

**Parameters:**
- `fromCoord` (Object): Reference coordinate `{lat: number, lng: number}`
- `coordinates` (Array): Array of coordinates to check `[{lat: number, lng: number}, ...]`
- `maxDistance` (number): Maximum distance to include in results
- `unit` (string, optional): Distance unit - `'km'`, `'miles'`, or `'meters'` (defaults to `'km'`)

**Returns:** `Array` - Array of coordinates within distance, each with added `distance` property

**Example:**
```javascript
const nearby = getCoordinatesWithinDistance(
  {lat: 40.7128, lng: -74.0060}, // New York City
  [
    {lat: 40.7614, lng: -73.9776, name: 'Central Park'},
    {lat: 34.0522, lng: -118.2437, name: 'Los Angeles'},
    {lat: 40.6892, lng: -74.0445, name: 'Statue of Liberty'}
  ],
  50, // 50 km radius
  'km'
);
// Returns: [{lat: 40.7614, lng: -73.9776, name: 'Central Park', distance: 8.21}, ...]
```

### getClosestCoordinate(fromCoord, coordinates, unit)

Find the closest coordinate from an array of coordinates.

**Parameters:**
- `fromCoord` (Object): Reference coordinate `{lat: number, lng: number}`
- `coordinates` (Array): Array of coordinates to check `[{lat: number, lng: number}, ...]`
- `unit` (string, optional): Distance unit - `'km'`, `'miles'`, or `'meters'` (defaults to `'km'`)

**Returns:** `Object|null` - Closest coordinate with added `distance` property, or `null` if array is empty

**Example:**
```javascript
const closest = getClosestCoordinate(
  {lat: 40.7128, lng: -74.0060}, // New York City
  [
    {lat: 40.7614, lng: -73.9776, name: 'Central Park'},
    {lat: 34.0522, lng: -118.2437, name: 'Los Angeles'},
    {lat: 41.8781, lng: -87.6298, name: 'Chicago'}
  ],
  'km'
);
console.log(`Closest: ${closest.name} at ${closest.distance.toFixed(2)} km`);
// Output: Closest: Central Park at 8.21 km
```

### getFurthestCoordinate(fromCoord, coordinates, unit)

Find the furthest coordinate from an array of coordinates.

**Parameters:**
- `fromCoord` (Object): Reference coordinate `{lat: number, lng: number}`
- `coordinates` (Array): Array of coordinates to check `[{lat: number, lng: number}, ...]`
- `unit` (string, optional): Distance unit - `'km'`, `'miles'`, or `'meters'` (defaults to `'km'`)

**Returns:** `Object|null` - Furthest coordinate with added `distance` property, or `null` if array is empty

**Example:**
```javascript
const furthest = getFurthestCoordinate(
  {lat: 40.7128, lng: -74.0060}, // New York City
  [
    {lat: 40.7614, lng: -73.9776, name: 'Central Park'},
    {lat: 34.0522, lng: -118.2437, name: 'Los Angeles'},
    {lat: 41.8781, lng: -87.6298, name: 'Chicago'}
  ],
  'km'
);
console.log(`Furthest: ${furthest.name} at ${furthest.distance.toFixed(2)} km`);
// Output: Furthest: Los Angeles at 3944.42 km
```

### calculateGeofenceArea(coordinates, unit)

Calculate the area of a geofence polygon using spherical geometry.

**Parameters:**
- `coordinates` (Array): Array of coordinates `[{lat: number, lng: number}, ...]`
- `unit` (string, optional): Area unit - `'km2'`, `'miles2'`, or `'meters2'` (defaults to `'km2'`)

**Returns:** `number` - Area in specified unit

**Example:**
```javascript
// Define a rectangular geofence around Central Park, NYC
const centralParkArea = calculateGeofenceArea([
  {lat: 40.7829, lng: -73.9654}, // Northwest corner
  {lat: 40.7829, lng: -73.9489}, // Northeast corner
  {lat: 40.7648, lng: -73.9489}, // Southeast corner
  {lat: 40.7648, lng: -73.9654}, // Southwest corner
  {lat: 40.7829, lng: -73.9654}  // Close the polygon
], 'km2');
console.log(`Central Park area: ${centralParkArea.toFixed(2)} km²`);
```

## Supported Units

### Distance Units
- `'km'` - Kilometers (default)
- `'miles'` - Miles
- `'meters'` - Meters

### Area Units
- `'km2'` - Square kilometers (default)
- `'miles2'` - Square miles
- `'meters2'` - Square meters

## Input Validation

The package includes comprehensive input validation:

- **Coordinates**: Must be objects with numeric `lat` and `lng` properties
- **Latitude**: Must be between -90 and 90 degrees
- **Longitude**: Must be between -180 and 180 degrees
- **Units**: Must be one of the supported unit strings
- **Polygon**: Must have at least 3 coordinates to form a valid polygon

## Error Handling

The package throws descriptive errors for invalid inputs:

```javascript
try {
  const distance = calculateDistance(
    {lat: 91, lng: 0}, // Invalid latitude
    {lat: 0, lng: 0}
  );
} catch (error) {
  console.error(error.message);
  // Output: "coord1 latitude must be between -90 and 90 degrees"
}
```

## Advanced Examples

### Delivery Route Optimization

```javascript
const warehouse = {lat: 40.7282, lng: -73.7949}; // JFK area

const deliveryPoints = [
  {lat: 40.7589, lng: -73.9851, address: 'Manhattan Office', priority: 'high'},
  {lat: 40.6782, lng: -73.9442, address: 'Brooklyn Store', priority: 'medium'},
  {lat: 40.8448, lng: -73.8648, address: 'Bronx Warehouse', priority: 'low'},
  {lat: 40.7505, lng: -73.9934, address: 'Times Square Drop', priority: 'urgent'}
];

// Find deliveries within 25km range
const inRangeDeliveries = getCoordinatesWithinDistance(
  warehouse,
  deliveryPoints,
  25,
  'km'
);

console.log(`${inRangeDeliveries.length} deliveries within range`);

// Start with closest delivery
let currentLocation = warehouse;
const route = [];

while (inRangeDeliveries.length > 0) {
  const nextStop = getClosestCoordinate(currentLocation, inRangeDeliveries, 'km');
  route.push(nextStop);
  
  // Remove from remaining deliveries
  const index = inRangeDeliveries.findIndex(d => 
    d.lat === nextStop.lat && d.lng === nextStop.lng
  );
  inRangeDeliveries.splice(index, 1);
  
  currentLocation = nextStop;
}

console.log('Optimized route:');
route.forEach((stop, i) => {
  console.log(`${i + 1}. ${stop.address} (${stop.distance.toFixed(2)} km)`);
});
```

### Emergency Services Coverage

```javascript
const emergencyCall = {lat: 40.7505, lng: -73.9934}; // Times Square emergency

const fireStations = [
  {lat: 40.7614, lng: -73.9776, name: 'Station 1 - Central Park', units: 3},
  {lat: 40.7282, lng: -73.9942, name: 'Station 2 - Lower Manhattan', units: 2},
  {lat: 40.7831, lng: -73.9712, name: 'Station 3 - Upper West', units: 4},
  {lat: 40.7419, lng: -73.9891, name: 'Station 4 - Midtown', units: 5}
];

// Find closest station for fastest response
const closestStation = getClosestCoordinate(emergencyCall, fireStations, 'km');
console.log(`Dispatch: ${closestStation.name}`);
console.log(`ETA: ~${(closestStation.distance * 3).toFixed(0)} minutes`); // Assume 20km/h in traffic

// Find all stations within 5km for backup
const backupStations = getCoordinatesWithinDistance(
  emergencyCall,
  fireStations,
  5,
  'km'
);

console.log(`${backupStations.length} stations available for backup`);
```

### Real Estate Analysis

```javascript
const newOfficeLocation = {lat: 40.7614, lng: -73.9776}; // Central Park area

const competitors = [
  {lat: 40.7505, lng: -73.9934, name: 'CompetitorA HQ', employees: 500},
  {lat: 40.7282, lng: -73.9942, name: 'CompetitorB Office', employees: 200},
  {lat: 40.7831, lng: -73.9712, name: 'CompetitorC Branch', employees: 150}
];

const publicTransport = [
  {lat: 40.7589, lng: -73.9851, name: 'Columbus Circle Station', type: 'subway'},
  {lat: 40.7648, lng: -73.9808, name: '59th St Station', type: 'subway'},
  {lat: 40.7505, lng: -73.9934, name: 'Times Square Hub', type: 'major_hub'}
];

// Analyze competition proximity
console.log('Competition Analysis:');
competitors.forEach(competitor => {
  const distance = calculateDistance(newOfficeLocation, competitor, 'km');
  console.log(`${competitor.name}: ${distance.toFixed(2)} km away`);
});

// Check public transport accessibility
const nearbyTransport = getCoordinatesWithinDistance(
  newOfficeLocation,
  publicTransport,
  1, // Within 1km walking distance
  'km'
);

console.log(`\nPublic Transport: ${nearbyTransport.length} stations within 1km`);
```

### Agricultural Zone Management

```javascript
const farmHQ = {lat: 40.8176, lng: -73.9782}; // Farm headquarters

const fields = [
  {lat: 40.8200, lng: -73.9800, crop: 'corn', size: 50, lastWatered: '2025-06-15'},
  {lat: 40.8150, lng: -73.9750, crop: 'wheat', size: 30, lastWatered: '2025-06-14'},
  {lat: 40.8220, lng: -73.9820, crop: 'soybeans', size: 40, lastWatered: '2025-06-13'},
  {lat: 40.8100, lng: -73.9700, crop: 'vegetables', size: 20, lastWatered: '2025-06-12'}
];

// Find fields needing immediate attention (furthest from last watering)
const urgentFields = fields.filter(field => {
  const daysSinceWatering = Math.floor(
    (new Date('2025-06-18') - new Date(field.lastWatered)) / (1000 * 60 * 60 * 24)
  );
  return daysSinceWatering > 3;
});

if (urgentFields.length > 0) {
  const closest = getClosestCoordinate(farmHQ, urgentFields, 'km');
  console.log(`Priority field: ${closest.crop} field (${closest.distance.toFixed(2)} km)`);
}

// Calculate total farm area using field boundaries
const farmBoundary = [
  {lat: 40.8250, lng: -73.9850},
  {lat: 40.8250, lng: -73.9650},
  {lat: 40.8050, lng: -73.9650},
  {lat: 40.8050, lng: -73.9850},
  {lat: 40.8250, lng: -73.9850}
];

const totalArea = calculateGeofenceArea(farmBoundary, 'km2');
console.log(`Total farm area: ${(totalArea * 247.105).toFixed(2)} acres`);
```

### Multiple Distance Calculations

```javascript
const cities = [
  {name: 'New York', lat: 40.7128, lng: -74.0060},
  {name: 'London', lat: 51.5074, lng: -0.1278},
  {name: 'Tokyo', lat: 35.6762, lng: 139.6503},
  {name: 'Sydney', lat: -33.8688, lng: 151.2093}
];

// Calculate distances from New York to all other cities
const newYork = cities[0];
cities.slice(1).forEach(city => {
  const distance = calculateDistance(newYork, city, 'km');
  console.log(`${newYork.name} to ${city.name}: ${distance.toFixed(0)} km`);
});
```

### Complex Geofence

```javascript
// Define a complex geofence (irregular polygon)
const geofenceCoords = [
  {lat: 40.7831, lng: -73.9712},
  {lat: 40.7890, lng: -73.9446},
  {lat: 40.7815, lng: -73.9425},
  {lat: 40.7735, lng: -73.9580},
  {lat: 40.7690, lng: -73.9805},
  {lat: 40.7750, lng: -73.9850},
  {lat: 40.7831, lng: -73.9712} // Close the polygon
];

const area = calculateGeofenceArea(geofenceCoords, 'meters2');
console.log(`Geofence area: ${area.toFixed(0)} m²`);
```

### Unit Conversions

```javascript
const coord1 = {lat: 40.7128, lng: -74.0060};
const coord2 = {lat: 34.0522, lng: -118.2437};

// Get distance in different units
const distanceKm = calculateDistance(coord1, coord2, 'km');
const distanceMiles = calculateDistance(coord1, coord2, 'miles');
const distanceMeters = calculateDistance(coord1, coord2, 'meters');

console.log(`Distance: ${distanceKm.toFixed(2)} km`);
console.log(`Distance: ${distanceMiles.toFixed(2)} miles`);
console.log(`Distance: ${distanceMeters.toFixed(0)} meters`);
```

## Mathematical Background

### Haversine Formula
The distance calculation uses the Haversine formula, which is well-suited for calculating great-circle distances between two points on Earth's surface. This formula accounts for Earth's spherical shape and provides accurate results for most practical applications.

### Spherical Polygon Area
The geofence area calculation uses spherical geometry to account for Earth's curvature. This is particularly important for large polygons where the flat-Earth approximation would introduce significant errors.

## TypeScript Support

The package includes comprehensive TypeScript definitions:

```typescript
import { calculateDistance, calculateGeofenceArea, Coordinate, DistanceUnit, AreaUnit } from 'vertibit-cords';

const point1: Coordinate = {lat: 40.7128, lng: -74.0060};
const point2: Coordinate = {lat: 34.0522, lng: -118.2437};
const unit: DistanceUnit = 'km';

const distance: number = calculateDistance(point1, point2, unit);
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## Changelog

### 1.0.0
- Initial release
- Distance calculation using Haversine formula
- Geofence area calculation using spherical geometry
- Input validation and error handling
- TypeScript support
- Multiple unit support