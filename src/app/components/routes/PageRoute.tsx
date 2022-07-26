import React, { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../lib/Header/Header';
import Footer from '../lib/Footer/Footer';
import ErrorNavigator from '../lib/Utils/ErrorNavigator';
import Information from '../lib/Utils/Information';
import LocationNavigator from '../lib/Utils/LocationNavigator';
import { useCheckLocation } from '../lib/Utils/useCheckLocation';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { refreshFields } from '../lib/Common/Form/useRefreshFields';
import { selectPageStatus } from '../../redux/slices/loaderSlice';

export default function PageRoute() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { checkLocation, activeLocation } = useCheckLocation();

    useEffect(() => {
        dispatch(refreshFields());
    }, [activeLocation, dispatch]);

    useEffect(() => {
        if (!checkLocation) navigate('/history-error');
    }, [checkLocation, navigate]);

    const headerRef = useRef<HTMLDivElement>(null);
    const outletRef = useRef<HTMLDivElement>(null);
    const pageStatus = useAppSelector(selectPageStatus);

    useEffect(() => {
        if (pageStatus !== 'loaded' || !headerRef.current) return;
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [pageStatus]);

    useEffect(() => {
        const path = activeLocation.pathname;
        if (!checkLocation) return;
        if (path === '/' || path === '/tickets') return;
        outletRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [activeLocation, checkLocation]);

    if (!checkLocation) return null;

    return (
        <>
            <Information />
            <LocationNavigator />
            <ErrorNavigator />

            <div ref={headerRef}>
                <Header />
            </div>
            <div ref={outletRef}>
                <Outlet />
            </div>

            <Footer />
        </>
    );
}
