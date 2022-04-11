import React from 'react';
import { PlaceT } from '../../../../types/typesSlices';
import PasPlaceExtras from './PasPlaceExtras';
import PasPlaceHeader from './PasPlaceHeader';
import PasPlaceInfo from './PasPlaceInfo';
import PasPlaceSelect from './PasPlaceSelect';

type Props = { place: PlaceT; index: number };

export default function PasPlace({ place, index }: Props) {
    const {
        price, extras, carNumber, seat_number, placeType,
    } = place;
    return (
        <li className='pas-plases-dir-item'>
            <PasPlaceHeader index={index} price={price} />
            <PasPlaceInfo carNumber={carNumber} seat_number={seat_number} />
            <PasPlaceExtras extras={extras} placeType={placeType} />
            <PasPlaceSelect place={place} />
        </li>
    );
}
