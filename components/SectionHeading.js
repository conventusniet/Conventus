import React from 'react';

// Institutional section heading: small-caps crimson eyebrow + serif title + thin rule.
// Restrained, no animation, no gold. Usage:
// <SectionHeading eyebrow="Discover" title="Learn More" subtitle="..." align="center" />
const SectionHeading = ({ eyebrow, title, subtitle, align = 'center', light = false }) => {
    const isCenter = align !== 'left';
    return (
        <div className={`mb-12 ${isCenter ? 'text-center' : 'text-left'}`}>
            {eyebrow && (
                <p className={`eyebrow text-xs mb-4 ${light ? 'text-white/60' : 'text-primary'}`}>
                    {eyebrow}
                </p>
            )}
            <h2 className={`font-serif-display text-4xl sm:text-5xl font-semibold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
                {title}
            </h2>
            <span className={`accent-rule mt-6 ${isCenter ? '' : 'block'}`} />
            {subtitle && (
                <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${light ? 'text-white/70' : 'text-ink-700'} ${isCenter ? 'mx-auto' : ''}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeading;
