import React from 'react';
import Image from 'next/legacy/image';

const MainContent = () => {
  return (
    <section className="bg-paper text-ink py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:w-3/5">
            <p className="eyebrow text-xs text-primary mb-4">Welcome</p>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-semibold text-ink mb-3 leading-tight">
              Welcome to <span className="text-primary">Conventus</span>
            </h2>
            <span className="accent-rule mb-8 block" />
            <div className="space-y-5 text-lg text-ink-700 leading-relaxed mt-6 text-justify">
              <p>
                Dear Delegates, we extend a warm welcome to you as you embark on your journey with the Conventus Model United Nations Society at NIET. A forum for aspiring leaders and diplomats, our society offers a unique opportunity to engage in meaningful discourse on pressing international issues.
              </p>
              <p>
                At Conventus, you will hone your skills in diplomacy, negotiation, and public speaking. The society also organizes engaging debates and public-speaking competitions, designed to sharpen your rhetoric and enhance your critical thinking.
              </p>
              <p>
                We warmly invite you to become part of our dynamic community of intellectuals and changemakers. Together, we will explore international relations, develop essential skills, and forge lasting friendships.
              </p>
            </div>
          </div>

          <div className="lg:w-2/5 flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              <div className="relative w-full aspect-[3/4] overflow-hidden border border-ink/15 bg-ink-100">
                <Image
                  src="/images/h2.jpg"
                  alt="Conventus delegates in session"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <p className="text-center text-lg font-serif-display tracking-wide text-ink-500 italic mt-8">
              Negatio &middot; Solutio &middot; Actio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
