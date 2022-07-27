/* eslint-disable react/no-array-index-key */
import React from 'react';
import HeaderNavItem from './HeaderNavItem';

export default function HeaderNav() {
    const hrefs = ['/#scroll-to', '/#description', '/#reviews', '/#contacts'];

    const onClick = (href: string) => (e: React.SyntheticEvent) => {
        const idEl = document.querySelector(href.substring(1));
        const place = idEl.getBoundingClientRect();
        window.scrollTo({
            behavior: 'smooth',
            top: place.y,
        });
    };

    const navItems = ['О нас', 'Как это работает', 'Отзывы', 'Контакты'].map(
        (item, index) => {
            return (
                <HeaderNavItem key={index} onClick={onClick(hrefs[index])}>
                    {item}
                </HeaderNavItem>
            );
        },
    );

    return (
        <nav className='nav'>
            <div className='logo logo-header'>Лого</div>
            <ul className='nav-list'>{navItems}</ul>
        </nav>
    );
}
