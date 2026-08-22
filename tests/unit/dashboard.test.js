/**
 * Unit Tests for Enterprise Itinerary Dashboard
 * Verifying State Management, Search Filters, and Itinerary Generation
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { dashboardInstance } from '../../src/dashboard/DashboardService.js';

describe('DashboardService - Enterprise Feature Validation', () => {

    beforeEach(() => {
        // Reset state before each test
        dashboardInstance.store.setState({
            isLoaded: false,
            selectedDestinations: [],
            itinerary: null,
            currentView: 'planner',
            activeTourSite: null,
            searchQuery: '',
            filters: { region: 'all', type: 'all' },
        });
    });

    describe('Static Content Generation', () => {
        it('should generate exactly 20 high-quality mock data locations', () => {
            expect(dashboardInstance.mockDatabase.length).toBe(20);
        });

        it('should contain robust data attributes (lat/long/type)', () => {
            const site = dashboardInstance.mockDatabase[0];
            expect(site).toHaveProperty('id');
            expect(site).toHaveProperty('name');
            expect(site).toHaveProperty('region');
            expect(site).toHaveProperty('lat');
            expect(site).toHaveProperty('lng');
        });
    });

    describe('State Management and Store Interactions', () => {
        it('should correctly initialize and set isLoaded to true', async () => {
            const state = await dashboardInstance.initialize();
            expect(state.isLoaded).toBe(true);
        });

        it('should add destination to selectedDestinations securely', () => {
            dashboardInstance.addDestinationToItinerary('1');
            dashboardInstance.addDestinationToItinerary('2');

            const state = dashboardInstance.store.getState();
            expect(state.selectedDestinations).toEqual(['1', '2']);
        });

        it('should enforce unique selected destinations (prevent duplicates)', () => {
            dashboardInstance.addDestinationToItinerary('1');
            dashboardInstance.addDestinationToItinerary('1'); // Duplicate attempt

            const state = dashboardInstance.store.getState();
            expect(state.selectedDestinations).toEqual(['1']); // Only 1 instance
        });

        it('should remove destination successfully', () => {
            dashboardInstance.addDestinationToItinerary('1');
            dashboardInstance.addDestinationToItinerary('2');
            dashboardInstance.removeDestinationFromItinerary('1');

            const state = dashboardInstance.store.getState();
            expect(state.selectedDestinations).toEqual(['2']);
        });
    });

    describe('Location Fetching & Search Logic', () => {
        it('should retrieve all paginated results by default', async () => {
            const result = await dashboardInstance.fetchDestinations('', { region: 'all', type: 'all' }, 1, 5);
            expect(result.data.length).toBe(5);
            expect(result.total).toBe(20); // 20 DB items total
        });

        it('should filter correctly by case-insensitive search query', async () => {
            const result = await dashboardInstance.fetchDestinations('taj', { region: 'all', type: 'all' }, 1, 10);
            expect(result.data.length).toBeGreaterThan(0);
            expect(result.data[0].name.toLowerCase()).toContain('taj');
        });

        it('should filter correctly by region (e.g., South)', async () => {
            const result = await dashboardInstance.fetchDestinations('', { region: 'South', type: 'all' }, 1, 10);
            expect(result.data.length).toBeGreaterThan(0);
            // Ensure all returned items are 'South' region
            const allSouth = result.data.every(s => s.region === 'South');
            expect(allSouth).toBe(true);
        });

        it('should sort results by popularity descending', async () => {
            const result = await dashboardInstance.fetchDestinations('', { region: 'all', type: 'all' }, 1, 20);
            const data = result.data;
            expect(data[0].popularity).toBeGreaterThanOrEqual(data[data.length - 1].popularity);
        });
    });

    describe('Itinerary Generation and Traveling Salesman Approximation', () => {
        it('should successfully build an itinerary and switch views to analytics on commit', () => {
            dashboardInstance.addDestinationToItinerary('1');
            dashboardInstance.addDestinationToItinerary('4');

            dashboardInstance.commitItinerary();

            const state = dashboardInstance.store.getState();
            expect(state.currentView).toBe('analytics');
            expect(state.itinerary).toBeDefined();
            expect(state.itinerary.length).toBe(2);
        });

        it('should calculate estimated timelines and days', () => {
            // Pick 5 locations to trigger day shifts
            dashboardInstance.addDestinationToItinerary('1');
            dashboardInstance.addDestinationToItinerary('2');
            dashboardInstance.addDestinationToItinerary('3');
            dashboardInstance.addDestinationToItinerary('4');
            dashboardInstance.addDestinationToItinerary('5');

            const optimizedRoute = dashboardInstance.generateOptimizedItinerary(['1', '2', '3', '4', '5']);

            expect(optimizedRoute.length).toBe(5);
            expect(optimizedRoute[0]).toHaveProperty('day');
            expect(optimizedRoute[0]).toHaveProperty('estimatedArrival');

            // Node 5 should be Day 3 (2 nodes per day on average)
            expect(optimizedRoute[4].day).toBeGreaterThan(1);
        });

        it('should do nothing on commit if less than 1 destination is selected', () => {
            dashboardInstance.commitItinerary();
            const state = dashboardInstance.store.getState();
            expect(state.currentView).toBe('planner');
            expect(state.itinerary).toBeNull();
        });
    });

    describe('Modal / View Interactions', () => {
        it('should open virtual tour and change state to viewer', () => {
            // Open Taj Mahal modal
            dashboardInstance.openVirtualTour('1');
            const state = dashboardInstance.store.getState();

            expect(state.currentView).toBe('viewer');
            expect(state.activeTourSite.id).toBe('1');
        });

        it('should safely close virtual tour and return to planner view', () => {
            dashboardInstance.openVirtualTour('1');
            dashboardInstance.closeVirtualTour();
            const state = dashboardInstance.store.getState();

            expect(state.currentView).toBe('planner');
            expect(state.activeTourSite).toBeNull();
        });
    });
});
