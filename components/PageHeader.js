import React from 'react';

// Institutional inner-page banner. Default: ivory canvas with crimson serif title,
// small-caps eyebrow, and an engraved double-rule. Optional image uses a flat ink wash.
// Usage: <PageHeader eyebrow="The Club" title="About Conventus" subtitle="..." image="/images/h3.jpg" />
const PageHeader = ({ eyebrow, title, subtitle, image }) => {
    const onImage = Boolean(image);
    return (
        <header
            className={`relative pt-36 pb-16 sm:pt-44 sm:pb-20 border-b ${onImage ? 'border-ink text-white' : 'border-ink/15 text-ink bg-paper'}`}
        >
            {onImage && (
                <>
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }} />
                    <div className="absolute inset-0 bg-ink/75" />
                </>
            )}

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {eyebrow && (
                    <p className={`eyebrow text-xs mb-5 ${onImage ? 'text-white/70' : 'text-primary'}`}>{eyebrow}</p>
                )}
                <h1 className="font-serif-display text-5xl sm:text-6xl font-semibold tracking-tight">
                    {title}
                </h1>
                <div className="flex justify-center mt-6">
                    <span className="double-rule" style={onImage ? { borderColor: '#ffffff' } : undefined} />
                </div>
                {subtitle && (
                    <p className={`mt-7 text-lg leading-relaxed max-w-2xl mx-auto ${onImage ? 'text-white/80' : 'text-ink-700'}`}>
                        {subtitle}
                    </p>
                )}
            </div>
        </header>
    );
};

export default PageHeader;
