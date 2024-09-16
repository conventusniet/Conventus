import React from 'react';

const MainContent = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          <div className="lg:w-3/5 space-y-6">
            <h1 className="text-5xl font-bold text-red-600">CONVENTUS</h1>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
            </div>
          </div>
          
          <div className="lg:w-2/5 flex flex-col items-center">
            <div className="bg-gray-200 w-full max-w-sm aspect-[3/4] mb-6"> {/* Changed aspect ratio */}
              <img 
                src="/images/coll4.png" 
                alt="Conventus" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-xl font-semibold text-gray-800 italic">
              "Empowering minds, shaping futures"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
