/* eslint-disable @typescript-eslint/indent */
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import searchWayReducer from './slices/searchWaySlice';
import searchDateReducer from './slices/searchDateSlice';
import searchFormReducer from './slices/searchFormSlice';
import ticketsReducer from './slices/ticketsSlice';
import searchFilterReducer from './slices/searchFilterSlice';
import lastTicketsReducer from './slices/lastTicketsSlice';
import loaderReducer from './slices/loaderSlice';
import subscribeReducer from './slices/subscribeSlice';
import placesReducer from './slices/placesSlice';
import { saveToLocalStorage, loadFromLocalStorage } from './storeLoaderUtils';
import passengerReducer from './slices/passengersSlice';
import infoReducer from './slices/infoSlice';
import pasPlacesReducer from './slices/pasPlacesSlice';
import paymentReducer from './slices/paymentFieldsSlice';
import paymentFormReducer from './slices/paymentFormSlice';
import locationReducer from './slices/locationsSlice';
import rateReducer from './slices/rateSlice';

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
    reducer: {
        locations: locationReducer,
        loader: loaderReducer,
        info: infoReducer,
        subscribe: subscribeReducer,
        rate: rateReducer,

        searchForm: searchFormReducer,
        searchFilter: searchFilterReducer,
        searchWay: searchWayReducer,
        searchDate: searchDateReducer,

        tickets: ticketsReducer,
        lastTicketsSlice: lastTicketsReducer,
        places: placesReducer,
        passengers: passengerReducer,
        pasPlaces: pasPlacesReducer,

        paymentFields: paymentReducer,
        paymentForm: paymentFormReducer,
    },
    preloadedState,
});

window.addEventListener('beforeunload', () => {
    saveToLocalStorage(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
