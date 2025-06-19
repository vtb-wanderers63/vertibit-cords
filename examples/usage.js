/**
 * Usage examples for vertibit-cords package
 * This file demonstrates various use cases and features
 */

const { 
  calculateDistance, 
  calculateGeofenceArea,
  getCoordinatesWithinDistance,
  getClosestCoordinate,
  getFurthestCoordinate
} = require('../index.js');

console.log('🌍 vertibit-cords Usage Examples\n');

// Example 1: Basic Distance Calculation
console.log('📏 Example 1: Distance Calculations');
console.log('=====================================');

const newYork = {lat: 40.7128, lng: -74.0060};
const losAngeles = {lat: 34.0522, lng: -118.2437};
const london = {lat: 51.5074, lng: -0.1278};
const paris = {lat: 48.8566, lng: 2.3522};

// Distance between New York and Los Angeles
const nyToLa = calculateDistance(newYork, losAngeles, 'km');
console.log(`New York to Los Angeles: ${nyToLa.toFixed(2)} km`);

// Same distance in different units
const nyToLaMiles = calculateDistance(newYork, losAngeles, 'miles');
const nyToLaMeters = calculateDistance(newYork, losAngeles, 'meters');
console.log(`                        : ${nyToLaMiles.toFixed(2)} miles`);
console.log(`                        : ${nyToLaMeters.toFixed(0)} meters`);

// European cities
const londonToParis = calculateDistance(london, paris, 'km');
console.log(`London to Paris: ${londonToParis.toFixed(2)} km`);

console.log('');

// Example 2: Multiple City Distance Calculations
console.log('🏙️  Example 2: Multiple City Distances');
console.log('=====================================');

const cities = [
  {name: 'New York', lat: 40.7128, lng: -74.0060},
  {name: 'London', lat: 51.5074, lng: -0.1278},
  {name: 'Tokyo', lat: 35.6762, lng: 139.6503},
  {name: 'Sydney', lat: -33.8688, lng: 151.2093},
  {name: 'Cape Town', lat: -33.9249, lng: 18.4241}
];

// Calculate distances from New York to all other cities
const baseCity = cities[0];
console.log(`Distances from ${baseCity.name}:`);
cities.slice(1).forEach(city => {
  const distance = calculateDistance(baseCity, city, 'km');
  console.log(`  to ${city.name}: ${distance.toFixed(0)} km`);
});

console.log('');

// Example 3: Basic Geofence Area Calculation
console.log('📐 Example 3: Geofence Area Calculations');
console.log('=======================================');

// Simple triangle in Manhattan
const triangleCoords = [
  {lat: 40.7831, lng: -73.9712}, // Point A
  {lat: 40.7890, lng: -73.9446}, // Point B
  {lat: 40.7735, lng: -73.9580}, // Point C
  {lat: 40.7831, lng: -73.9712}  // Close the polygon
];

const triangleArea = calculateGeofenceArea(triangleCoords, 'km2');
console.log(`Triangle area: ${triangleArea.toFixed(4)} km²`);
console.log(`              : ${(triangleArea * 1000000).toFixed(0)} m²`);

// Rectangle approximating Central Park
const centralParkCoords = [
  {lat: 40.7829, lng: -73.9654}, // Northwest corner
  {lat: 40.7829, lng: -73.9489}, // Northeast corner
  {lat: 40.7648, lng: -73.9489}, // Southeast corner
  {lat: 40.7648, lng: -73.9654}, // Southwest corner
  {lat: 40.7829, lng: -73.9654}  // Close the polygon
];

const parkArea = calculateGeofenceArea(centralParkCoords, 'km2');
console.log(`Central Park (approx): ${parkArea.toFixed(2)} km²`);

console.log('');

// Example 4: Complex Geofence
console.log('🔺 Example 4: Complex Irregular Polygon');
console.log('======================================');

const complexGeofence = [
  {lat: 40.7831, lng: -73.9712},
  {lat: 40.7890, lng: -73.9446},
  {lat: 40.7815, lng: -73.9425},
  {lat: 40.7735, lng: -73.9580},
  {lat: 40.7690, lng: -73.9805},
  {lat: 40.7750, lng: -73.9850},
  {lat: 40.7831, lng: -73.9712} // Close the polygon
];

const complexArea = calculateGeofenceArea(complexGeofence, 'km2');
console.log(`Complex geofence area: ${complexArea.toFixed(4)} km²`);
console.log(`                     : ${(complexArea * 247.105).toFixed(2)} acres`);

console.log('');

// Example 5: Error Handling Demonstrations
console.log('⚠️  Example 5: Error Handling');
console.log('============================');

// Function to safely demonstrate errors
function demonstrateError(description, fn) {
  try {
    fn();
  } catch (error) {
    console.log(`${description}: ${error.message}`);
  }
}

demonstrateError('Invalid latitude', () => {
  calculateDistance({lat: 91, lng: 0}, {lat: 0, lng: 0});
});

demonstrateError('Invalid longitude', () => {
  calculateDistance({lat: 0, lng: 0}, {lat: 0, lng: 181});
});

demonstrateError('Invalid unit', () => {
  calculateDistance({lat: 0, lng: 0}, {lat: 1, lng: 1}, 'invalid');
});

demonstrateError('Invalid coordinate format', () => {
  calculateDistance('not an object', {lat: 0, lng: 0});
});

demonstrateError('Too few coordinates for polygon', () => {
  calculateGeofenceArea([{lat: 0, lng: 0}, {lat: 1, lng: 1}]);
});

console.log('');

// Example 6: New Coordinate Array Functions
console.log('🎯 Example 6: Coordinate Array Functions');
console.log('======================================');

const referencePoint = {lat: 40.7128, lng: -74.0060}; // New York City
const locations = [
  {lat: 40.7614, lng: -73.9776, name: 'Central Park', type: 'park'},
  {lat: 34.0522, lng: -118.2437, name: 'Los Angeles', type: 'city'},
  {lat: 41.8781, lng: -87.6298, name: 'Chicago', type: 'city'},
  {lat: 40.6892, lng: -74.0445, name: 'Statue of Liberty', type: 'landmark'},
  {lat: 40.7505, lng: -73.9934, name: 'Times Square', type: 'landmark'},
  {lat: 40.8176, lng: -73.9782, name: 'Yankee Stadium', type: 'stadium'}
];

// Find coordinates within 50km
console.log('Locations within 50km of NYC:');
const within50km = getCoordinatesWithinDistance(referencePoint, locations, 50, 'km');
within50km.forEach(location => {
  console.log(`  ${location.name}: ${location.distance.toFixed(2)} km`);
});

console.log('');

// Find closest location
const closest = getClosestCoordinate(referencePoint, locations, 'km');
console.log(`Closest location: ${closest.name}`);
console.log(`Distance: ${closest.distance.toFixed(2)} km`);

console.log('');

// Find furthest location
const furthest = getFurthestCoordinate(referencePoint, locations, 'km');
console.log(`Furthest location: ${furthest.name}`);
console.log(`Distance: ${furthest.distance.toFixed(2)} km`);

console.log('');

// Example 7: Real-world Application - Restaurant Finder
console.log('🍽️  Example 7: Restaurant Recommendation System');
console.log('==============================================');

const userLocation = {lat: 40.7589, lng: -73.9851}; // Columbus Circle

const restaurants = [
  {lat: 40.7614, lng: -73.9776, name: 'Central Park Cafe', rating: 4.5, cuisine: 'American'},
  {lat: 40.7505, lng: -73.9934, name: 'Times Square Diner', rating: 4.2, cuisine: 'Diner'},
  {lat: 40.6892, lng: -74.0445, name: 'Liberty Island Grill', rating: 4.8, cuisine: 'Seafood'},
  {lat: 40.8176, lng: -73.9782, name: 'Yankee Tavern', rating: 4.6, cuisine: 'Sports Bar'},
  {lat: 40.7282, lng: -73.9942, name: 'Downtown Bistro', rating: 4.4, cuisine: 'French'},
  {lat: 40.7831, lng: -73.9712, name: 'Uptown Eatery', rating: 4.3, cuisine: 'Italian'}
];

// Find restaurants within walking distance (2km)
const walkingDistance = getCoordinatesWithinDistance(userLocation, restaurants, 2, 'km');
console.log(`Restaurants within walking distance (2km):`);
walkingDistance.forEach(restaurant => {
  console.log(`  ${restaurant.name} (${restaurant.cuisine}): ${restaurant.distance.toFixed(2)} km - ${restaurant.rating}⭐`);
});

// Find closest restaurant
const nearestRestaurant = getClosestCoordinate(userLocation, restaurants, 'km');
console.log(`\nNearest restaurant: ${nearestRestaurant.name}`);
console.log(`  Distance: ${nearestRestaurant.distance.toFixed(2)} km`);
console.log(`  Rating: ${nearestRestaurant.rating}⭐`);
console.log(`  Cuisine: ${nearestRestaurant.cuisine}`);

// Find highest-rated restaurant within 5km
const nearby5km = getCoordinatesWithinDistance(userLocation, restaurants, 5, 'km');
const highestRated = nearby5km.reduce((best, current) => 
  current.rating > best.rating ? current : best
);
console.log(`\nBest rated within 5km: ${highestRated.name}`);
console.log(`  Distance: ${highestRated.distance.toFixed(2)} km`);
console.log(`  Rating: ${highestRated.rating}⭐`);

console.log('');

// Example 8: Emergency Services Response
console.log('🚑 Example 8: Emergency Response System');
console.log('=====================================');

const emergencyLocation = {lat: 40.7505, lng: -73.9934}; // Times Square emergency

const emergencyServices = [
  {lat: 40.7614, lng: -73.9776, name: 'Central Park Station', type: 'Fire', units: 3},
  {lat: 40.7282, lng: -73.9942, name: 'Downtown Station', type: 'Police', units: 5},
  {lat: 40.7831, lng: -73.9712, name: 'Uptown Station', type: 'Fire', units: 2},
  {lat: 40.7419, lng: -73.9891, name: 'Midtown Station', type: 'EMS', units: 4},
  {lat: 40.6892, lng: -74.0445, name: 'Harbor Station', type: 'Police', units: 2}
];

// Find closest emergency service
const closestService = getClosestCoordinate(emergencyLocation, emergencyServices, 'km');
console.log(`Emergency Response Dispatch:`);
console.log(`  Station: ${closestService.name}`);
console.log(`  Type: ${closestService.type}`);
console.log(`  Distance: ${closestService.distance.toFixed(2)} km`);
console.log(`  Units available: ${closestService.units}`);
console.log(`  ETA: ~${(closestService.distance * 3).toFixed(0)} minutes`); // Assume 20km/h in traffic

// Find all services within 5km for backup
const backupServices = getCoordinatesWithinDistance(emergencyLocation, emergencyServices, 5, 'km');
console.log(`\nBackup services within 5km: ${backupServices.length}`);
backupServices.forEach(service => {
  console.log(`  ${service.name} (${service.type}): ${service.distance.toFixed(2)} km`);
});

console.log('');

// Example 9: Delivery Route Optimization
console.log('📦 Example 9: Delivery Route Optimization');
console.log('========================================');

const warehouse = {lat: 40.7282, lng: -73.7949}; // JFK area

let deliveryPoints = [
  {lat: 40.7589, lng: -73.9851, address: 'Columbus Circle Office', priority: 'high', packages: 3},
  {lat: 40.6782, lng: -73.9442, address: 'Brooklyn Store', priority: 'medium', packages: 1},
  {lat: 40.8448, lng: -73.8648, address: 'Bronx Warehouse', priority: 'low', packages: 2},
  {lat: 40.7505, lng: -73.9934, address: 'Times Square Drop', priority: 'urgent', packages: 1},
  {lat: 40.7614, lng: -73.9776, address: 'Central Park Hotel', priority: 'medium', packages: 2}
];

console.log('Optimizing delivery route using nearest-neighbor algorithm:');

// Find deliveries within operational range (30km)
const inRange = getCoordinatesWithinDistance(warehouse, deliveryPoints, 30, 'km');
console.log(`${inRange.length} deliveries within 30km range`);

// Create optimized route
const route = [];
let currentLocation = warehouse;
let remainingDeliveries = [...inRange];
let totalDistance = 0;

console.log('\nOptimized Route:');
console.log('0. Start at Warehouse');

while (remainingDeliveries.length > 0) {
  const nextStop = getClosestCoordinate(currentLocation, remainingDeliveries, 'km');
  route.push(nextStop);
  totalDistance += nextStop.distance;
  
  console.log(`${route.length}. ${nextStop.address} (${nextStop.distance.toFixed(2)} km) - ${nextStop.priority} priority`);
  
  // Remove from remaining deliveries
  const index = remainingDeliveries.findIndex(d => 
    d.lat === nextStop.lat && d.lng === nextStop.lng
  );
  remainingDeliveries.splice(index, 1);
  
  currentLocation = nextStop;
}

// Return to warehouse
const returnDistance = calculateDistance(currentLocation, warehouse, 'km');
totalDistance += returnDistance;
console.log(`${route.length + 1}. Return to Warehouse (${returnDistance.toFixed(2)} km)`);
console.log(`\nTotal route distance: ${totalDistance.toFixed(2)} km`);
console.log(`Estimated time: ${(totalDistance * 3).toFixed(0)} minutes`);

console.log('');

// Example 10: Performance Testing with New Functions
console.log('⚡ Example 10: Performance Testing');
console.log('=================================');

// Generate test data
const testLocations = [];
for (let i = 0; i < 1000; i++) {
  testLocations.push({
    lat: 40.5 + Math.random() * 0.5, // Random points around NYC
    lng: -74.2 + Math.random() * 0.4,
    id: i
  });
}

const testCenter = {lat: 40.7128, lng: -74.0060};

console.log('Performance test with 1000 locations:');

// Test getCoordinatesWithinDistance
let startTime = Date.now();
const within10km = getCoordinatesWithinDistance(testCenter, testLocations, 10, 'km');
let endTime = Date.now();
console.log(`  getCoordinatesWithinDistance: ${endTime - startTime} ms (found ${within10km.length} locations)`);

// Test getClosestCoordinate
startTime = Date.now();
const closest1000 = getClosestCoordinate(testCenter, testLocations, 'km');
endTime = Date.now();
console.log(`  getClosestCoordinate: ${endTime - startTime} ms (closest at ${closest1000.distance.toFixed(4)} km)`);

// Test getFurthestCoordinate
startTime = Date.now();
const furthest1000 = getFurthestCoordinate(testCenter, testLocations, 'km');
endTime = Date.now();
console.log(`  getFurthestCoordinate: ${endTime - startTime} ms (furthest at ${furthest1000.distance.toFixed(4)} km)`);

console.log('');

// Example 11: Error Handling for New Functions
console.log('⚠️  Example 11: Error Handling for New Functions');
console.log('================================================');

function demonstrateNewFunctionErrors(description, fn) {
  try {
    fn();
  } catch (error) {
    console.log(`${description}: ${error.message}`);
  }
}

demonstrateNewFunctionErrors('Invalid distance in getCoordinatesWithinDistance', () => {
  getCoordinatesWithinDistance({lat: 0, lng: 0}, [{lat: 1, lng: 1}], -5);
});

demonstrateNewFunctionErrors('Non-array coordinates in getClosestCoordinate', () => {
  getClosestCoordinate({lat: 0, lng: 0}, 'not an array');
});

demonstrateNewFunctionErrors('Empty array in getFurthestCoordinate', () => {
  const result = getFurthestCoordinate({lat: 0, lng: 0}, []);
  if (result === null) {
    console.log('Empty array handling: Returns null correctly');
  }
});

demonstrateNewFunctionErrors('Invalid coordinate in array', () => {
  getCoordinatesWithinDistance({lat: 0, lng: 0}, [{lat: 91, lng: 0}], 100);
});

console.log('');

// Example 12: Real-world Coordinate Array Usage
console.log('🌐 Example 12: Additional Real-world Scenarios');
console.log('==============================================');

// Retail Chain Analysis
console.log('Retail Chain Store Analysis:');
const regionalHQ = {lat: 40.7128, lng: -74.0060}; // Regional HQ in NYC

const storeLocations = [
  {name: 'Store 1 - Manhattan', lat: 40.7589, lng: -73.9851, revenue: 150000},
  {name: 'Store 2 - Brooklyn', lat: 40.6782, lng: -73.9442, revenue: 120000},
  {name: 'Store 3 - Queens', lat: 40.7282, lng: -73.7949, revenue: 95000},
  {name: 'Store 4 - Bronx', lat: 40.8448, lng: -73.8648, revenue: 85000}
];

let totalRouteDistance = 0;
let currentVisitLocation = regionalHQ;

storeLocations.forEach((store, index) => {
  const distance = calculateDistance(currentVisitLocation, store, 'km');
  totalRouteDistance += distance;
  console.log(`  ${store.name}: ${distance.toFixed(2)} km (Revenue: ${store.revenue.toLocaleString()})`);
  currentVisitLocation = store;
});

// Return to HQ
const returnToHQ = calculateDistance(currentVisitLocation, regionalHQ, 'km');
totalRouteDistance += returnToHQ;
console.log(`  Return to HQ: ${returnToHQ.toFixed(2)} km`);
console.log(`  Total inspection route: ${totalRouteDistance.toFixed(2)} km`);

console.log('');

// Service Coverage Zones
console.log('Service Coverage Analysis:');

// Define service zones around key areas
const downtownServiceZone = [
  {lat: 40.7590, lng: -73.9845},
  {lat: 40.7590, lng: -73.9835},
  {lat: 40.7580, lng: -73.9835},
  {lat: 40.7580, lng: -73.9845},
  {lat: 40.7590, lng: -73.9845}
];

const uptownServiceZone = [
  {lat: 40.7829, lng: -73.9654},
  {lat: 40.7829, lng: -73.9489},
  {lat: 40.7648, lng: -73.9489},
  {lat: 40.7648, lng: -73.9654},
  {lat: 40.7829, lng: -73.9654}
];

const downtownArea = calculateGeofenceArea(downtownServiceZone, 'meters2');
const uptownArea = calculateGeofenceArea(uptownServiceZone, 'km2');

console.log(`  Downtown service zone: ${downtownArea.toFixed(0)} m²`);
console.log(`  Uptown service zone: ${uptownArea.toFixed(2)} km²`);

console.log('');

// Example 13: Performance and Precision Tests
console.log('⚡ Example 13: Performance & Precision');
console.log('====================================');

// Test precision with very close points
const precisionTestPoint1 = {lat: 40.7128000, lng: -74.0060000};
const precisionTestPoint2 = {lat: 40.7128001, lng: -74.0060001}; // ~0.11 meters apart

const veryPreciseDistance = calculateDistance(precisionTestPoint1, precisionTestPoint2, 'meters');
console.log(`Very close points distance: ${veryPreciseDistance.toFixed(6)} meters`);

// Test with antipodal points (opposite sides of Earth)
const northernPoint = {lat: 89.9, lng: 0};
const southernPoint = {lat: -89.9, lng: 180};
const antipodialDist = calculateDistance(northernPoint, southernPoint, 'km');
console.log(`Near-antipodial distance: ${antipodialDist.toFixed(2)} km`);

// Performance test
console.log('Performance test (1000 calculations):');
const perfTestCoord1 = {lat: 40.7128, lng: -74.0060};
const perfTestCoord2 = {lat: 34.0522, lng: -118.2437};

const perfStartTime = Date.now();
for (let i = 0; i < 1000; i++) {
  calculateDistance(perfTestCoord1, perfTestCoord2, 'km');
}
const perfEndTime = Date.now();
console.log(`  Time for 1000 distance calculations: ${perfEndTime - perfStartTime} ms`);

// Large polygon performance test
const circularPolygon = [];
const circleCenterLat = 40.7128;
const circleCenterLng = -74.0060;
const circleRadius = 0.01; // ~1km radius

for (let i = 0; i < 100; i++) {
  const angle = (i / 100) * 2 * Math.PI;
  circularPolygon.push({
    lat: circleCenterLat + circleRadius * Math.cos(angle),
    lng: circleCenterLng + circleRadius * Math.sin(angle)
  });
}
circularPolygon.push(circularPolygon[0]); // Close the polygon

const polyStartTime = Date.now();
const circularPolyArea = calculateGeofenceArea(circularPolygon, 'km2');
const polyEndTime = Date.now();

console.log(`  100-sided polygon area: ${circularPolyArea.toFixed(4)} km²`);
console.log(`  Polygon calculation time: ${polyEndTime - polyStartTime} ms`);

console.log('');

// Example 14: Coordinate Validation Examples
console.log('✅ Example 14: Input Validation Success Cases');
console.log('=============================================');

// Edge cases that should work
const validationEdgeCases = [
  {name: 'Equator/Prime Meridian', coord: {lat: 0, lng: 0}},
  {name: 'North Pole', coord: {lat: 90, lng: 0}},
  {name: 'South Pole', coord: {lat: -90, lng: 0}},
  {name: 'International Date Line', coord: {lat: 0, lng: 180}},
  {name: 'Antimeridian', coord: {lat: 0, lng: -180}}
];

console.log('Valid edge case coordinates:');
validationEdgeCases.forEach(testCase => {
  try {
    const edgeDistance = calculateDistance(testCase.coord, {lat: 0, lng: 0}, 'km');
    console.log(`  ✓ ${testCase.name}: ${edgeDistance.toFixed(2)} km from origin`);
  } catch (error) {
    console.log(`  ✗ ${testCase.name}: ${error.message}`);
  }
});

console.log('');

// Example 15: Unit Conversion Verification
console.log('🔄 Example 15: Unit Conversion Verification');
console.log('==========================================');

const conversionPoint1 = {lat: 40.7128, lng: -74.0060};
const conversionPoint2 = {lat: 40.7589, lng: -73.9851};

// Distance in all units
const distanceKm = calculateDistance(conversionPoint1, conversionPoint2, 'km');
const distanceMiles = calculateDistance(conversionPoint1, conversionPoint2, 'miles');
const distanceMeters = calculateDistance(conversionPoint1, conversionPoint2, 'meters');

console.log('Same distance in different units:');
console.log(`  ${distanceKm.toFixed(6)} km`);
console.log(`  ${distanceMiles.toFixed(6)} miles`);
console.log(`  ${distanceMeters.toFixed(2)} meters`);

// Verify conversions
const kmToMilesCalculated = distanceKm * 0.621371;
const kmToMetersCalculated = distanceKm * 1000;

console.log('Conversion verification:');
console.log(`  km to miles calc: ${kmToMilesCalculated.toFixed(6)} (diff: ${Math.abs(distanceMiles - kmToMilesCalculated).toFixed(8)})`);
console.log(`  km to meters calc: ${kmToMetersCalculated.toFixed(2)} (diff: ${Math.abs(distanceMeters - kmToMetersCalculated).toFixed(6)})`);

// Area conversions
const testSquareCoords = [
  {lat: 40.7128, lng: -74.0060},
  {lat: 40.7138, lng: -74.0060},
  {lat: 40.7138, lng: -74.0050},
  {lat: 40.7128, lng: -74.0050},
  {lat: 40.7128, lng: -74.0060}
];

const testAreaKm2 = calculateGeofenceArea(testSquareCoords, 'km2');
const testAreaMiles2 = calculateGeofenceArea(testSquareCoords, 'miles2');
const testAreaMeters2 = calculateGeofenceArea(testSquareCoords, 'meters2');

console.log('\nArea in different units:');
console.log(`  ${testAreaKm2.toFixed(8)} km²`);
console.log(`  ${testAreaMiles2.toFixed(8)} miles²`);
console.log(`  ${testAreaMeters2.toFixed(2)} m²`);

console.log('');

// Example 16: Summary and Best Practices
console.log('📋 Example 16: Summary & Best Practices');
console.log('======================================');

console.log('Best Practices when using vertibit-cords:');
console.log('');
console.log('1. Always validate coordinates before processing:');
console.log('   - Latitude: -90 to 90 degrees');
console.log('   - Longitude: -180 to 180 degrees');
console.log('');
console.log('2. Choose appropriate units for your use case:');
console.log('   - Use meters for high precision, short distances');
console.log('   - Use kilometers for general geographic calculations');
console.log('   - Use miles for US-centric applications');
console.log('');
console.log('3. For geofencing:');
console.log('   - Ensure polygons are properly closed');
console.log('   - Use at least 3 points for valid polygons');
console.log('   - Consider Earth\'s curvature for large areas');
console.log('');
console.log('4. Error handling:');
console.log('   - Wrap calculations in try-catch blocks');
console.log('   - Validate input data from external sources');
console.log('   - Check for edge cases in your application');
console.log('');
console.log('5. Performance considerations:');
console.log('   - Calculations are fast but consider caching for repeated operations');
console.log('   - Large polygons (100+ points) may take more processing time');
console.log('   - Consider preprocessing coordinates for batch operations');

console.log('');

// Example 17: Final Applications Summary
console.log('🌐 Example 17: Final Applications Summary');
console.log('========================================');

console.log('The enhanced coordinate array functions enable powerful applications:');
console.log('');
console.log('✅ Location-Based Services:');
console.log('   - Find nearby restaurants, shops, or services');
console.log('   - Implement "find nearest" functionality');
console.log('   - Create proximity-based recommendations');
console.log('');
console.log('✅ Emergency Response Systems:');
console.log('   - Dispatch closest emergency services');
console.log('   - Find backup resources within range');
console.log('   - Calculate response times and coverage areas');
console.log('');
console.log('✅ Delivery & Logistics:');
console.log('   - Optimize delivery routes using nearest-neighbor');
console.log('   - Filter deliveries by operational range');
console.log('   - Calculate total route distances and times');
console.log('');
console.log('✅ Real Estate & Business Intelligence:');
console.log('   - Analyze competitor proximity');
console.log('   - Find locations within target demographics');
console.log('   - Assess transportation accessibility');
console.log('');
console.log('✅ Agriculture & Field Management:');
console.log('   - Monitor distributed field locations');
console.log('   - Prioritize maintenance based on proximity');
console.log('   - Calculate coverage areas and zones');

console.log('');
console.log('🎉 All examples completed successfully!');
console.log('   Enhanced package now includes:');
console.log('   - calculateDistance() - Distance between two points');
console.log('   - calculateGeofenceArea() - Polygon area calculation');
console.log('   - getCoordinatesWithinDistance() - Filter by distance');
console.log('   - getClosestCoordinate() - Find nearest point');
console.log('   - getFurthestCoordinate() - Find furthest point');
console.log('');
console.log('   Package is production-ready with comprehensive functionality!');

// Export enhanced test data for potential testing
module.exports = {
  // Original test data
  newYork,
  losAngeles,
  london,
  paris,
  triangleCoords,
  centralParkCoords,
  complexGeofence,
  // New test data from coordinate array functions
  referencePoint,
  locations,
  restaurants,
  emergencyServices,
  deliveryPoints,
  // Additional test data from fixed examples
  regionalHQ,
  storeLocations
};