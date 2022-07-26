/* eslint-disable no-unused-vars */
import { SearchedCity } from '../../../../types/typesSearch';
import { useAppDispatch } from '../../../../redux/reduxHooks';
import { setCities, setWayStatus } from '../../../../redux/slices/searchWaySlice';

export type CheckCityMatchT = (
    input: HTMLInputElement,
    cities: SearchedCity[],
    aborter: AbortController
) => void;

type UseAbortFetchT = () => CheckCityMatchT;

const useAbortFetch: UseAbortFetchT = () => {
    const dispatch = useAppDispatch();

    const checkCityMatch: CheckCityMatchT = (input, cities, aborter) => {
        const { name: inputName, value } = input;
        const selectedCity = cities.find((city) => city.name === value.toLowerCase());

        if (selectedCity) {
            aborter.abort();
            dispatch(setCities({ inputName, cities: [selectedCity] }));
            dispatch(setWayStatus({ inputName, status: 'loaded' }));
        }
    };

    return checkCityMatch;
};

export default useAbortFetch;
