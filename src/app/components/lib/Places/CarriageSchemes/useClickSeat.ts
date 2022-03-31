import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/reduxHooks';
import { removePlace, setPlace } from '../../../../redux/slices/placesSlice';
import { CarInfoT } from '../../../../types/models/modelSeats';
import { PlaceT } from '../../../../types/typesSlices';
import { mapSectionsSecond } from './mapSection';

export const useClickSeat = (car: CarInfoT, route: string) => {
    const dispatch = useAppDispatch();
    const places = useAppSelector((state) => state.places.routes[route].places);

    console.log(places);
    const onClick = (e: React.SyntheticEvent) => {
        const { textContent: i, className } = e.currentTarget;
        const { seatsFull } = car.seatsInfo;
        const {
            index, placeType, carType, price,
        } = seatsFull[+i - 1];

        const place: PlaceT = {
            carNumber: car.carNumber,
            placeNumber: index,
            placeType,
            carType,
            price,
        };
        const payload = { route, place };

        if (className.includes('seat-active')) {
            dispatch(removePlace(payload));
            e.currentTarget.classList.remove('carriage-seat-active');
        } else {
            e.currentTarget.classList.add('carriage-seat-active');
            dispatch(setPlace(payload));
        }
    };

    const sections = mapSectionsSecond(car, places);
    return { sections, onClick };
};
