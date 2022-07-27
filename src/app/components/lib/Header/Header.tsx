import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchFormMain from '../Search/SearchFormMain';
import HeaderNav from './HeaderNav';
import HeaderTitleMain from './HeaderTitleMain';
import SearchFormInline from '../Search/SearchFormInline';
import HeaderProgressBar from './HeaderProgressBar/HeaderProgressBar';

export default function Header() {
    const { pathname } = useLocation();

    const HeaderOutletMain = (
        <>
            <section className='header-content framed'>
                <HeaderTitleMain plain='Вся жизнь -' bold='путешествие !' />
                <SearchFormMain />
            </section>
            <div className='header-line' />
        </>
    );
    const HeaderOutletContent = (
        <>
            <SearchFormInline />
            <HeaderProgressBar />
        </>
    );
    const HeaderOutletSuccess: any = null;
    // const HeaderOutletError = <div>Error</div>;

    let className = 'central';
    let HeaderOutlet = HeaderOutletContent;

    if (pathname === '/') {
        HeaderOutlet = HeaderOutletMain;
        className = 'main';
    }
    if (pathname === '/success') {
        HeaderOutlet = HeaderOutletSuccess;
        className = 'success';
    }

    return (
        <header className={`header header-${className}`}>
            <HeaderNav />
            {HeaderOutlet}
        </header>
    );
}
