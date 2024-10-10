import React from 'react';

const MainContent = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          <div className="lg:w-3/5 space-y-6">
            <h1 className="text-5xl font-bold text-red-600">Welcome to CONVENTUS</h1>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Dear Delegates, We extend a warm welcome to you as you embark on your journey with Conventus Model United Nations Society at NIET. This is forum for aspiring leaders & diplomats, our society offers a unique opportunity to engage in meaningful discourse on pressing international issues.
              </p>
              <p>
                At Conventus, you will hone your skills in diplomacy, negotiation, and public speaking. The society also organize engaging debates and public speaking competitions, designed to sharpen your rhetorical skills and enhance your critical thinking.
              <p>
                We warmly invite you to become a part of our dynamic community of intellectuals and changemakers. Together, we will explore international relations, develop essential skills, and forge lasting friendships.
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
              "Negatio | Solutio | Actio"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
