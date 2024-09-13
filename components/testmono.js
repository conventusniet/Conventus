import Image from 'next/image'
import React from 'react'

const testimonials = [
  {
    name: 'John Doe',
    position: 'Frontend Developer at DevUI',
    imageSrc: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    quote: '“Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aliquam repellat laborum minima tempore deserunt explicabo placeat! Fugit, molestias nesciunt.”',
  },
  {
    name: 'Jane Smith',
    position: 'Backend Developer at CodeBase',
    imageSrc: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    quote: '“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.”',
  },
  {
    name: 'Michael Johnson',
    position: 'UI/UX Designer at Creativo',
    imageSrc: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    quote: '“Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.”',
  },
]

export function TestimonialOne() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 py-16 space-y-20">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={`w-full max-w-6xl mx-auto md:flex md:items-center md:justify-center md:space-x-14 ${
            index % 2 === 1 ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div className="relative h-48 w-48 flex-shrink-0 mx-auto md:mx-0">
            <Image
              className="rounded-full object-cover"
              src={testimonial.imageSrc}
              alt={testimonial.name}
              width={192}
              height={192}
            />
          </div>

          <div className="mt-10 md:mt-0 text-center md:text-left">
            <blockquote>
              <p className="text-xl text-gray-900">{testimonial.quote}</p>
            </blockquote>
            <p className="mt-7 text-lg font-semibold text-black">{testimonial.name}</p>
            <p className="mt-1 text-base text-gray-600">{testimonial.position}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
