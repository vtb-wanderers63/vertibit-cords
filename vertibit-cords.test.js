/**
 * Jest tests for vertibit-cords package
 * Comprehensive test suite covering all functionality
 */

const {
    calculateDistance,
    calculateGeofenceArea,
    getCoordinatesWithinDistance,
    getClosestCoordinate,
    getFurthestCoordinate
  } = require('./index.js');
  
  describe('vertibit-cords', () => {
    // Test data
    const newYork = { lat: 40.7128, lng: -74.0060 };
    const losAngeles = { lat: 34.0522, lng: -118.2437 };
    const london = { lat: 51.5074, lng: -0.1278 };
    const paris = { lat: 48.8566, lng: 2.3522 };
  
    const triangleCoords = [
      { lat: 40.7831, lng: -73.9712 },
      { lat: 40.7890, lng: -73.9446 },
      { lat: 40.7735, lng: -73.9580 },
      { lat: 40.7831, lng: -73.9712 }
    ];
  
    const centralParkCoords = [
      { lat: 40.7829, lng: -73.9654 },
      { lat: 40.7829, lng: -73.9489 },
      { lat: 40.7648, lng: -73.9489 },
      { lat: 40.7648, lng: -73.9654 },
      { lat: 40.7829, lng: -73.9654 }
    ];
  
    describe('calculateDistance', () => {
      test('should calculate distance between New York and Los Angeles', () => {
        const distance = calculateDistance(newYork, losAngeles, 'km');
        expect(distance).toBeCloseTo(3935.75, 1); // Allow 0.1km tolerance
      });
  
      test('should calculate distance in different units', () => {
        const distKm = calculateDistance(newYork, losAngeles, 'km');
        const distMiles = calculateDistance(newYork, losAngeles, 'miles');
        const distMeters = calculateDistance(newYork, losAngeles, 'meters');
  
        expect(distMiles).toBeCloseTo(distKm * 0.621371, 2);
        expect(distMeters).toBeCloseTo(distKm * 1000, 0);
      });
  
      test('should calculate London to Paris distance', () => {
        const distance = calculateDistance(london, paris, 'km');
        expect(distance).toBeCloseTo(343.56, 1);
      });
  
      test('should default to km when no unit specified', () => {
        const distanceWithUnit = calculateDistance(newYork, losAngeles, 'km');
        const distanceWithoutUnit = calculateDistance(newYork, losAngeles);
        expect(distanceWithoutUnit).toBe(distanceWithUnit);
      });
  
      test('should handle very close points with high precision', () => {
        const point1 = { lat: 40.7128000, lng: -74.0060000 };
        const point2 = { lat: 40.7128001, lng: -74.0060001 };
        const distance = calculateDistance(point1, point2, 'meters');
        expect(distance).toBeLessThan(1); // Should be less than 1 meter
        expect(distance).toBeGreaterThan(0);
      });
  
      test('should handle antipodal points', () => {
        const northPole = { lat: 89.9, lng: 0 };
        const nearSouthPole = { lat: -89.9, lng: 180 };
        const distance = calculateDistance(northPole, nearSouthPole, 'km');
        expect(distance).toBeCloseTo(20015.09, 1); // Approximately half Earth's circumference
      });
    });
  
    describe('calculateDistance - Error Handling', () => {
      test('should throw error for invalid latitude', () => {
        expect(() => {
          calculateDistance({ lat: 91, lng: 0 }, { lat: 0, lng: 0 });
        }).toThrow('coord1 latitude must be between -90 and 90 degrees');
      });
  
      test('should throw error for invalid longitude', () => {
        expect(() => {
          calculateDistance({ lat: 0, lng: 0 }, { lat: 0, lng: 181 });
        }).toThrow('coord2 longitude must be between -180 and 180 degrees');
      });
  
      test('should throw error for invalid unit', () => {
        expect(() => {
          calculateDistance({ lat: 0, lng: 0 }, { lat: 1, lng: 1 }, 'invalid');
        }).toThrow('Invalid unit: invalid');
      });
  
      test('should throw error for invalid coordinate format', () => {
        expect(() => {
          calculateDistance('not an object', { lat: 0, lng: 0 });
        }).toThrow('coord1 must be an object with lat and lng properties');
      });
  
      test('should handle edge case coordinates', () => {
        const edgeCases = [
          { name: 'Equator/Prime Meridian', coord: { lat: 0, lng: 0 } },
          { name: 'North Pole', coord: { lat: 90, lng: 0 } },
          { name: 'South Pole', coord: { lat: -90, lng: 0 } },
          { name: 'International Date Line', coord: { lat: 0, lng: 180 } },
          { name: 'Antimeridian', coord: { lat: 0, lng: -180 } }
        ];
  
        edgeCases.forEach(testCase => {
          expect(() => {
            calculateDistance(testCase.coord, { lat: 0, lng: 0 }, 'km');
          }).not.toThrow();
        });
      });
    });
  
    describe('calculateGeofenceArea', () => {
      test('should calculate triangle area', () => {
        const area = calculateGeofenceArea(triangleCoords, 'km2');
        expect(area).toBeGreaterThan(0);
        expect(area).toBeLessThan(100); // Reasonable size for Manhattan triangle
      });
  
      test('should calculate Central Park area approximation', () => {
        const area = calculateGeofenceArea(centralParkCoords, 'km2');
        expect(area).toBeCloseTo(2.80, 0.2); // Our rectangular approximation
      });
  
      test('should calculate area in different units', () => {
        const areaKm2 = calculateGeofenceArea(triangleCoords, 'km2');
        const areaMiles2 = calculateGeofenceArea(triangleCoords, 'miles2');
        const areaMeters2 = calculateGeofenceArea(triangleCoords, 'meters2');
  
        expect(areaMiles2).toBeCloseTo(areaKm2 * 0.386102, 4);
        expect(areaMeters2).toBeCloseTo(areaKm2 * 1000000, 0);
      });
  
      test('should auto-close polygon if not closed', () => {
        const openPolygon = [
          { lat: 40.7831, lng: -73.9712 },
          { lat: 40.7890, lng: -73.9446 },
          { lat: 40.7735, lng: -73.9580 }
          // Not closed
        ];
        const area = calculateGeofenceArea(openPolygon, 'km2');
        expect(area).toBeGreaterThan(0);
      });
  
      test('should handle large circular polygon', () => {
        const circularPolygon = [];
        const centerLat = 40.7128;
        const centerLng = -74.0060;
        const radius = 0.01;
  
        for (let i = 0; i < 100; i++) {
          const angle = (i / 100) * 2 * Math.PI;
          circularPolygon.push({
            lat: centerLat + radius * Math.cos(angle),
            lng: centerLng + radius * Math.sin(angle)
          });
        }
        circularPolygon.push(circularPolygon[0]);
  
        const area = calculateGeofenceArea(circularPolygon, 'km2');
        expect(area).toBeGreaterThan(0);
        expect(area).toBeLessThan(10); // Should be reasonable size
      });
    });
  
    describe('calculateGeofenceArea - Error Handling', () => {
      test('should throw error for non-array coordinates', () => {
        expect(() => {
          calculateGeofenceArea('not an array');
        }).toThrow('Coordinates must be an array');
      });
  
      test('should throw error for too few coordinates', () => {
        expect(() => {
          calculateGeofenceArea([{ lat: 0, lng: 0 }, { lat: 1, lng: 1 }]);
        }).toThrow('At least 3 coordinates are required to form a polygon');
      });
  
      test('should throw error for invalid coordinates in array', () => {
        expect(() => {
          calculateGeofenceArea([
            { lat: 0, lng: 0 },
            { lat: 91, lng: 0 }, // Invalid latitude
            { lat: 1, lng: 1 }
          ]);
        }).toThrow('coordinates[1] latitude must be between -90 and 90 degrees');
      });
    });
  
    describe('getCoordinatesWithinDistance', () => {
      const referencePoint = { lat: 40.7128, lng: -74.0060 }; // NYC
      const locations = [
        { lat: 40.7614, lng: -73.9776, name: 'Central Park', type: 'park' },
        { lat: 34.0522, lng: -118.2437, name: 'Los Angeles', type: 'city' },
        { lat: 41.8781, lng: -87.6298, name: 'Chicago', type: 'city' },
        { lat: 40.6892, lng: -74.0445, name: 'Statue of Liberty', type: 'landmark' },
        { lat: 40.7505, lng: -73.9934, name: 'Times Square', type: 'landmark' },
        { lat: 40.8176, lng: -73.9782, name: 'Yankee Stadium', type: 'stadium' }
      ];
  
      test('should find locations within 50km of NYC', () => {
        const within50km = getCoordinatesWithinDistance(referencePoint, locations, 50, 'km');
        
        expect(within50km.length).toBeGreaterThan(0);
        expect(within50km.length).toBeLessThan(locations.length); // Should exclude distant cities
        
        // All returned locations should have distance property
        within50km.forEach(location => {
          expect(location).toHaveProperty('distance');
          expect(location.distance).toBeLessThanOrEqual(50);
        });
  
        // Should be sorted by distance (closest first)
        for (let i = 1; i < within50km.length; i++) {
          expect(within50km[i].distance).toBeGreaterThanOrEqual(within50km[i - 1].distance);
        }
      });
  
      test('should preserve original properties', () => {
        const within50km = getCoordinatesWithinDistance(referencePoint, locations, 50, 'km');
        
        within50km.forEach(location => {
          expect(location).toHaveProperty('name');
          expect(location).toHaveProperty('type');
          expect(location).toHaveProperty('lat');
          expect(location).toHaveProperty('lng');
        });
      });
  
      test('should work with different units', () => {
        const withinKm = getCoordinatesWithinDistance(referencePoint, locations, 50, 'km');
        const withinMiles = getCoordinatesWithinDistance(referencePoint, locations, 31, 'miles'); // ~50km
        
        expect(withinKm.length).toBe(withinMiles.length);
      });
  
      test('should return empty array when no locations within range', () => {
        const result = getCoordinatesWithinDistance(referencePoint, locations, 1, 'km');
        expect(result).toEqual([]);
      });
    });
  
    describe('getCoordinatesWithinDistance - Error Handling', () => {
      const referencePoint = { lat: 40.7128, lng: -74.0060 };
      const locations = [{ lat: 40.7614, lng: -73.9776, name: 'Central Park' }];
  
      test('should throw error for invalid distance', () => {
        expect(() => {
          getCoordinatesWithinDistance(referencePoint, locations, -5);
        }).toThrow('Max distance must be a non-negative number');
      });
  
      test('should throw error for non-array coordinates', () => {
        expect(() => {
          getCoordinatesWithinDistance(referencePoint, 'not an array', 10);
        }).toThrow('Coordinates must be an array');
      });
  
      test('should throw error for invalid coordinate in array', () => {
        expect(() => {
          getCoordinatesWithinDistance(referencePoint, [{ lat: 91, lng: 0 }], 100);
        }).toThrow('coordinates[0] latitude must be between -90 and 90 degrees');
      });
    });
  
    describe('getClosestCoordinate', () => {
      const referencePoint = { lat: 40.7128, lng: -74.0060 }; // NYC
      const locations = [
        { lat: 40.7614, lng: -73.9776, name: 'Central Park', type: 'park' },
        { lat: 34.0522, lng: -118.2437, name: 'Los Angeles', type: 'city' },
        { lat: 41.8781, lng: -87.6298, name: 'Chicago', type: 'city' },
        { lat: 40.6892, lng: -74.0445, name: 'Statue of Liberty', type: 'landmark' }
      ];
  
      test('should find closest location', () => {
        const closest = getClosestCoordinate(referencePoint, locations, 'km');
        
        expect(closest).toHaveProperty('name');
        expect(closest).toHaveProperty('distance');
        expect(closest.distance).toBeGreaterThan(0);
        
        // Should be closer than all other locations
        locations.forEach(location => {
          if (location.name !== closest.name) {
            const distance = calculateDistance(referencePoint, location, 'km');
            expect(closest.distance).toBeLessThanOrEqual(distance);
          }
        });
      });
  
      test('should preserve original properties', () => {
        const closest = getClosestCoordinate(referencePoint, locations, 'km');
        
        expect(closest).toHaveProperty('name');
        expect(closest).toHaveProperty('type');
        expect(closest).toHaveProperty('lat');
        expect(closest).toHaveProperty('lng');
      });
  
      test('should work with different units', () => {
        const closestKm = getClosestCoordinate(referencePoint, locations, 'km');
        const closestMiles = getClosestCoordinate(referencePoint, locations, 'miles');
        
        expect(closestKm.name).toBe(closestMiles.name);
        expect(closestMiles.distance).toBeCloseTo(closestKm.distance * 0.621371, 2);
      });
  
      test('should return null for empty array', () => {
        const result = getClosestCoordinate(referencePoint, [], 'km');
        expect(result).toBeNull();
      });
    });
  
    describe('getClosestCoordinate - Error Handling', () => {
      const referencePoint = { lat: 40.7128, lng: -74.0060 };
  
      test('should throw error for non-array coordinates', () => {
        expect(() => {
          getClosestCoordinate(referencePoint, 'not an array');
        }).toThrow('Coordinates must be an array');
      });
  
      test('should throw error for invalid coordinate in array', () => {
        expect(() => {
          getClosestCoordinate(referencePoint, [{ lat: 91, lng: 0 }]);
        }).toThrow('coordinates[0] latitude must be between -90 and 90 degrees');
      });
    });
  
    describe('getFurthestCoordinate', () => {
      const referencePoint = { lat: 40.7128, lng: -74.0060 }; // NYC
      const locations = [
        { lat: 40.7614, lng: -73.9776, name: 'Central Park', type: 'park' },
        { lat: 34.0522, lng: -118.2437, name: 'Los Angeles', type: 'city' },
        { lat: 41.8781, lng: -87.6298, name: 'Chicago', type: 'city' },
        { lat: 40.6892, lng: -74.0445, name: 'Statue of Liberty', type: 'landmark' }
      ];
  
      test('should find furthest location', () => {
        const furthest = getFurthestCoordinate(referencePoint, locations, 'km');
        
        expect(furthest).toHaveProperty('name');
        expect(furthest).toHaveProperty('distance');
        expect(furthest.distance).toBeGreaterThan(0);
        
        // Should be further than all other locations
        locations.forEach(location => {
          if (location.name !== furthest.name) {
            const distance = calculateDistance(referencePoint, location, 'km');
            expect(furthest.distance).toBeGreaterThanOrEqual(distance);
          }
        });
      });
  
      test('should preserve original properties', () => {
        const furthest = getFurthestCoordinate(referencePoint, locations, 'km');
        
        expect(furthest).toHaveProperty('name');
        expect(furthest).toHaveProperty('type');
        expect(furthest).toHaveProperty('lat');
        expect(furthest).toHaveProperty('lng');
      });
  
      test('should work with different units', () => {
        const furthestKm = getFurthestCoordinate(referencePoint, locations, 'km');
        const furthestMiles = getFurthestCoordinate(referencePoint, locations, 'miles');
        
        expect(furthestKm.name).toBe(furthestMiles.name);
        expect(furthestMiles.distance).toBeCloseTo(furthestKm.distance * 0.621371, 2);
      });
  
      test('should return null for empty array', () => {
        const result = getFurthestCoordinate(referencePoint, [], 'km');
        expect(result).toBeNull();
      });
    });
  
    describe('getFurthestCoordinate - Error Handling', () => {
      const referencePoint = { lat: 40.7128, lng: -74.0060 };
  
      test('should throw error for non-array coordinates', () => {
        expect(() => {
          getFurthestCoordinate(referencePoint, 'not an array');
        }).toThrow('Coordinates must be an array');
      });
  
      test('should throw error for invalid coordinate in array', () => {
        expect(() => {
          getFurthestCoordinate(referencePoint, [{ lat: 91, lng: 0 }]);
        }).toThrow('coordinates[0] latitude must be between -90 and 90 degrees');
      });
    });
  
    describe('Real-world Application Tests', () => {
      test('Restaurant recommendation system', () => {
        const userLocation = { lat: 40.7589, lng: -73.9851 }; // Columbus Circle
        const restaurants = [
          { lat: 40.7614, lng: -73.9776, name: 'Central Park Cafe', rating: 4.5, cuisine: 'American' },
          { lat: 40.7505, lng: -73.9934, name: 'Times Square Diner', rating: 4.2, cuisine: 'Diner' },
          { lat: 40.6892, lng: -74.0445, name: 'Liberty Island Grill', rating: 4.8, cuisine: 'Seafood' },
          { lat: 40.8176, lng: -73.9782, name: 'Yankee Tavern', rating: 4.6, cuisine: 'Sports Bar' }
        ];
  
        // Find restaurants within walking distance
        const walkingDistance = getCoordinatesWithinDistance(userLocation, restaurants, 2, 'km');
        expect(walkingDistance.length).toBeGreaterThan(0);
        
        walkingDistance.forEach(restaurant => {
          expect(restaurant.distance).toBeLessThanOrEqual(2);
          expect(restaurant).toHaveProperty('rating');
          expect(restaurant).toHaveProperty('cuisine');
        });
  
        // Find closest restaurant
        const nearest = getClosestCoordinate(userLocation, restaurants, 'km');
        expect(nearest).toHaveProperty('name');
        expect(nearest).toHaveProperty('rating');
      });
  
      test('Emergency response system', () => {
        const emergencyLocation = { lat: 40.7505, lng: -73.9934 }; // Times Square
        const emergencyServices = [
          { lat: 40.7614, lng: -73.9776, name: 'Central Park Station', type: 'Fire', units: 3 },
          { lat: 40.7282, lng: -73.9942, name: 'Downtown Station', type: 'Police', units: 5 },
          { lat: 40.7831, lng: -73.9712, name: 'Uptown Station', type: 'Fire', units: 2 }
        ];
  
        const closest = getClosestCoordinate(emergencyLocation, emergencyServices, 'km');
        expect(closest).toHaveProperty('type');
        expect(closest).toHaveProperty('units');
        expect(closest.distance).toBeGreaterThan(0);
  
        const backup = getCoordinatesWithinDistance(emergencyLocation, emergencyServices, 5, 'km');
        expect(backup.length).toBeGreaterThan(0);
      });
  
      test('Delivery route optimization', () => {
        const warehouse = { lat: 40.7282, lng: -73.7949 };
        const deliveryPoints = [
          { lat: 40.7589, lng: -73.9851, address: 'Columbus Circle Office', priority: 'high' },
          { lat: 40.6782, lng: -73.9442, address: 'Brooklyn Store', priority: 'medium' },
          { lat: 40.8448, lng: -73.8648, address: 'Bronx Warehouse', priority: 'low' }
        ];
  
        const inRange = getCoordinatesWithinDistance(warehouse, deliveryPoints, 30, 'km');
        expect(inRange.length).toBe(deliveryPoints.length); // All should be within 30km
  
        // Test route optimization logic
        let currentLocation = warehouse;
        let remainingDeliveries = [...inRange];
        let totalDistance = 0;
  
        while (remainingDeliveries.length > 0) {
          const nextStop = getClosestCoordinate(currentLocation, remainingDeliveries, 'km');
          totalDistance += nextStop.distance;
          
          const index = remainingDeliveries.findIndex(d => 
            d.lat === nextStop.lat && d.lng === nextStop.lng
          );
          remainingDeliveries.splice(index, 1);
          currentLocation = nextStop;
        }
  
        expect(totalDistance).toBeGreaterThan(0);
      });
    });
  
    describe('Performance Tests', () => {
      test('should handle large datasets efficiently', () => {
        // Generate 1000 test locations
        const testLocations = [];
        for (let i = 0; i < 1000; i++) {
          testLocations.push({
            lat: 40.5 + Math.random() * 0.5,
            lng: -74.2 + Math.random() * 0.4,
            id: i
          });
        }
        const testCenter = { lat: 40.7128, lng: -74.0060 };
  
        // Test performance (should complete in reasonable time)
        const startTime = Date.now();
        
        const within10km = getCoordinatesWithinDistance(testCenter, testLocations, 10, 'km');
        const closest = getClosestCoordinate(testCenter, testLocations, 'km');
        const furthest = getFurthestCoordinate(testCenter, testLocations, 'km');
        
        const endTime = Date.now();
        
        expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
        expect(within10km.length).toBeGreaterThan(0);
        expect(closest).toHaveProperty('distance');
        expect(furthest).toHaveProperty('distance');
        expect(furthest.distance).toBeGreaterThanOrEqual(closest.distance);
      });
  
      test('should maintain precision with multiple calculations', () => {
        const coord1 = { lat: 40.7128, lng: -74.0060 };
        const coord2 = { lat: 34.0522, lng: -118.2437 };
  
        // Run same calculation multiple times
        const results = [];
        for (let i = 0; i < 100; i++) {
          results.push(calculateDistance(coord1, coord2, 'km'));
        }
  
        // All results should be identical (deterministic)
        const firstResult = results[0];
        results.forEach(result => {
          expect(result).toBe(firstResult);
        });
      });
    });
  
    describe('Unit Conversion Accuracy', () => {
      test('should maintain accuracy across unit conversions', () => {
        const point1 = { lat: 40.7128, lng: -74.0060 };
        const point2 = { lat: 40.7589, lng: -73.9851 };
  
        const distKm = calculateDistance(point1, point2, 'km');
        const distMiles = calculateDistance(point1, point2, 'miles');
        const distMeters = calculateDistance(point1, point2, 'meters');
  
        // Verify conversion accuracy
        const kmToMiles = distKm * 0.621371;
        const kmToMeters = distKm * 1000;
  
        expect(Math.abs(distMiles - kmToMiles)).toBeLessThan(0.000001);
        expect(Math.abs(distMeters - kmToMeters)).toBeLessThan(0.001);
      });
  
      test('should maintain area conversion accuracy', () => {
        const coords = [
          { lat: 40.7128, lng: -74.0060 },
          { lat: 40.7138, lng: -74.0060 },
          { lat: 40.7138, lng: -74.0050 },
          { lat: 40.7128, lng: -74.0050 },
          { lat: 40.7128, lng: -74.0060 }
        ];
  
        const areaKm2 = calculateGeofenceArea(coords, 'km2');
        const areaMiles2 = calculateGeofenceArea(coords, 'miles2');
        const areaMeters2 = calculateGeofenceArea(coords, 'meters2');
  
        const km2ToMiles2 = areaKm2 * 0.386102;
        const km2ToMeters2 = areaKm2 * 1000000;
  
        expect(Math.abs(areaMiles2 - km2ToMiles2)).toBeLessThan(0.0001);
        expect(Math.abs(areaMeters2 - km2ToMeters2)).toBeLessThan(1);
      });
    });
  });