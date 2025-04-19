import React from 'react';
import FlipbookNewsletter from './FlipbookNewsletter';

const MUN2Newsletter = () => {
    const newsletterPdf = "/pdfs/CMUN_2.0_Newsletter.pdf"; // Update with actual path
    
    return (
        <section className="py-16 bg-gradient-to-r from-red-50 to-white mb-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-red-800 mb-4">CMUN 2.0 Newsletter</h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-4" />
                    <p className="text-red-700 text-lg max-w-2xl mx-auto">
                        Stay informed with our comprehensive coverage of the second edition
                    </p>
                </div>
                
                <FlipbookNewsletter
                    title="CMUN 2.0 Newsletter"
                    imageUrl="/images/mun2.0/newsletter-preview.jpg"
                    pdfUrl={newsletterPdf}
                    showViewAll={true}
                />
            </div>
        </section>
    );
};

export default MUN2Newsletter;