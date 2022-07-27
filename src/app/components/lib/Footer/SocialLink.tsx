/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

type SocialLinkProps = { onClick: () => void; children: React.ReactNode };

export default function SocialLink({ onClick, children }: SocialLinkProps) {
    return (
        <div onClick={onClick} className='social-link'>
            {children}
        </div>
    );
}
