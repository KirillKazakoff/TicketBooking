import React from 'react';
import { useNavigate } from 'react-router-dom';
import BtnNextRouteNew from '../lib/Common/BtnNextRouteNew';
import { useAppSelector, useAppDispatch } from '../../redux/reduxHooks';
import { RootState } from '../../redux/store';
import { selectPlaces } from '../../redux/slices/placesSlice';
import { CarContentT } from '../../types/typesSlices';
import { setInfo } from '../../redux/slices/infoSlice';
import { messagesError } from '../lib/Common/Info/messagesInfo';
import Form from '../lib/Common/Form';

export type EmptyPlaceT = { index: number; route: string };
const emptyMsg = messagesError.emptyPasPlace;

export default function PasPlacesForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const pasPlaces = useAppSelector((state: RootState) => state.pasPlaces);
    const { routes } = useAppSelector(selectPlaces);

    const getEmptyPlaces = (route: CarContentT, key: string) => {
        const emptyPlaces = route.places.reduce<EmptyPlaceT[]>((total, place, index) => {
            const check = pasPlaces[key].some((pasInfo) => {
                return pasInfo.placeId === place.id;
            });

            const routeRus = key === 'departure' ? 'Туда' : 'Обратно';
            if (!check) total.push({ index: index + 1, route: routeRus });
            return total;
        }, []);

        return emptyPlaces;
    };

    const onSubmit = () => {
        const allEmpty = Object.entries(routes).reduce<EmptyPlaceT[]>(
            (total, [key, route]) => {
                const routeEmpty = getEmptyPlaces(route, key);
                total.push(...routeEmpty);
                return total;
            },
            [],
        );

        if (allEmpty.length > 0) {
            dispatch(setInfo({ status: 'error', msg: emptyMsg(allEmpty[0]) }));
            return;
        }
        navigate('/somewhere');
    };

    return (
        <Form onSubmitForm={onSubmit}>
            <BtnNextRouteNew cls='pas-places' />
        </Form>
    );
}
