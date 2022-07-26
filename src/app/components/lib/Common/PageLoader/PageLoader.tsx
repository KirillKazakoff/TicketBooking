import React, { useEffect, useRef } from 'react';
import { useCheckLocation } from '../../Utils/useCheckLocation';
import './pageLoader.css';

type PageLoaderProps = { cls?: string; desc: string };

export default function PageLoader({ cls, desc }: PageLoaderProps) {
    const { activeLocation } = useCheckLocation();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [activeLocation]);

    return (
        <div ref={ref} className={`page-loader-container ${cls}`}>
            <span className='page-loader-desc'>{desc}</span>
            <div className='animation-area'>
                <div className='train-container' />
                <div className='bg-loader bg-before' />
                <div className='bg-loader bg-after' />
            </div>
        </div>
    );
}

PageLoader.defaultProps = {
    cls: '',
};
