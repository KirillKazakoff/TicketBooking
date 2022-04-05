import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/reduxHooks';
import { setExtraPrice } from '../../../../../../redux/slices/placesSlice';
import { ServiceProps } from '../../../../../../types/typesPlaces';
import ServiceTip from './ServiceTip';

export default function Service({ service, route, children }: ServiceProps) {
    const containerRef = useRef<HTMLButtonElement>(null);
    const { name, isIncluded, price } = service;
    const dispatch = useAppDispatch();

    const carNumber = useAppSelector(
        (state) => state.places.routes[route].activeCar.carNumber,
    );

    const statePrice = useAppSelector((state) => {
        const { extras } = state.places.routes[route];
        const index = extras.findIndex((extra) => extra.carNumber === carNumber);
        return extras[index].prices[name];
    });

    let containerCls = 'carriage-info-service-item';
    let filterCls = 'filter-black';

    if (statePrice > 0 && !isIncluded) {
        filterCls = 'filter-white';
        containerCls = `${containerCls} ${containerCls}-choosen`;
    }

    const onClick = () => {
        if (isIncluded) return;
        const payload = { name, route, value: price };
        if (statePrice > 0) payload.value = 0;
        dispatch(setExtraPrice(payload));
    };

    if (price === 0 && !isIncluded) return null;
    return (
        <button
            ref={containerRef}
            className={containerCls}
            onClick={onClick}
            disabled={isIncluded}
            type='button'
        >
            <div className={filterCls}>{children}</div>
            <ServiceTip
                value={name}
                containerRef={containerRef}
                isIncluded={isIncluded}
            />
        </button>
    );
}