import React from 'react';
import Image from 'next/legacy/image';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const ExternalNewsletter = ({
  title,
  description,
  imageUrl,
  externalUrl,
  publisherName,
  edition,
  publishDate,
  isAnniversary = false,
}) => {
  const handleExternalLink = () => {
    window.open(externalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-6xl mx-auto bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[72%] p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="bg-red-800 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">
              {publisherName}
            </span>
            {isAnniversary && (
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
                25th anniversary
              </span>
            )}
          </div>

          <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-red-900 mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            {edition} · {publishDate}
          </p>

          <div className="h-px bg-red-100 mb-5" />

          <p className="text-gray-600 text-sm leading-relaxed mb-7">
            {description}
          </p>

          <div className="flex items-center gap-6 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors text-sm font-medium"
              onClick={handleExternalLink}
            >
              <ExternalLink size={16} />
              View newsletter
            </motion.button>

            <button
              className="text-red-700 hover:text-red-800 text-sm font-medium flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-0"
              onClick={handleExternalLink}
            >
              Download PDF
              <ArrowRight size={14} />
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-5">
            Opens the official repository to view or download the newsletter.
          </p>
        </div>

        <div className="md:w-[28%] relative" style={{ minHeight: '380px' }}>
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
