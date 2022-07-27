// import { HashLink as Link } from 'react-router-hash-link';
import React, { HTMLProps } from 'react';

type HeaderNavItemProps = HTMLProps<HTMLLIElement>;

export default function HeaderNavItem({ children, onClick }: HeaderNavItemProps) {
    return (
        <li className='nav-link' onClick={onClick}>
            {children}
        </li>
    );
}
