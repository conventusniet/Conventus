import React from 'react';
import Image from 'next/legacy/image';
import { motion } from 'framer-motion';
import { ExternalLink, Download } from 'lucide-react';

const ExternalNewsletter = ({ 
  title, 
  description,
  imageUrl, 
  externalUrl,
  publisherName,
  edition,
  publishDate
}) => {
  const handleExternalLink = () => {
    window.open(externalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
 <div className="max-w-6xl mx-auto bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[70%] p-8 flex flex-col justify-center">
          <div className="mb-4">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {publisherName}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-red-800 mb-4">{title}</h3>
          <p className="text-gray-700 mb-6">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center justify-center transition-colors"
              onClick={handleExternalLink}
            >
              <ExternalLink className="mr-2" size={20} />
              View & Download
            </motion.button>
            
            <motion.button
              className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-full flex items-center justify-center transition-colors"
              onClick={handleExternalLink}
            >
              <Download className="mr-2" size={20} />
              Download PDF
            </motion.button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * This will redirect to the official repository to view/download the newsletter
          </p>
        </div>
        
        <div className="md:w-[30%] relative" style={{ minHeight: '400px' }}>
          <div 
            className="relative h-full overflow-hidden cursor-pointer" 
            onClick={handleExternalLink}
          >
            <div className="relative h-full w-full flex justify-center items-center">
              <Image
                src={imageUrl}
                alt={title}
                width={400}
                height={560}
                className="object-contain h-auto max-h-[95%] transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-ink/70 flex flex-col justify-end p-6">
              <div className="text-white">
                <p className="mb-2 text-sm font-medium bg-red-600 w-fit px-2 py-1 rounded-full">
                  {edition}
                </p>
                <h3 className="text-2xl font-bold text-red-100 mb-2">{publishDate}</h3>
                <p className="mb-4 opacity-90">Click to view the newsletter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalNewsletter;