import React from 'react'

interface Testimonial {
  title: string
  quote: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    title: 'EUEE Success Story',
    quote: 'SuccessBridge helped me prepare for the Ethiopian University Entrance Exam. The organized materials and practice questions boosted my confidence. I scored 580 and got into my dream university!',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop'
  },
  {
    title: 'From Struggling to Excelling',
    quote: 'I was struggling with Grade 12 Chemistry until I found SuccessBridge. The detailed lessons with Ethiopian examples made everything clear. Now I\'m helping my classmates too!',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
  },
  {
    title: 'University Made Easy',
    quote: 'As a freshman at Addis Ababa University, SuccessBridge has been my lifeline. The modules, past exams, and video tutorials saved me countless hours. Highly recommend to all Ethiopian students!',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop'
  }
]

export const Testimonials: React.FC = () => {
  return (
    <div className="w-full space-y-4 md:space-y-6 py-4 md:py-6">
      <div className="text-center px-3 md:px-4">
        <h2 className="text-lg md:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          What Our Students Say
        </h2>
        <p className="mt-1.5 md:mt-2 text-xs md:text-sm lg:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Real stories from students who have transformed their learning experience with us.
        </p>
      </div>

      {/* Grid Layout - 3 columns on all screen sizes */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 lg:gap-6 px-3 md:px-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-slate-900 rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 active:scale-[0.98] md:hover:scale-[1.02]"
          >
            {/* Image Section */}
            <div className="relative h-24 md:h-40 lg:h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={testimonial.image}
                alt={testimonial.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Title Overlay on Image */}
              <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4">
                <h3 className="text-[10px] md:text-base lg:text-lg font-black text-white drop-shadow-lg leading-tight">
                  {testimonial.title}
                </h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-2 md:p-4 lg:p-5">
              <div className="flex items-start gap-1 md:gap-2 mb-2">
                <svg className="w-3 h-3 md:w-5 md:h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-[9px] md:text-sm lg:text-base text-slate-700 dark:text-slate-300 leading-relaxed flex-1 line-clamp-3 md:line-clamp-none">
                  {testimonial.quote}
                </p>
              </div>
              
              {/* Rating Stars */}
              <div className="flex gap-0.5 mt-2 md:mt-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-2.5 h-2.5 md:w-4 md:h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center px-3 md:px-4 pt-2 md:pt-4">
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
          Join thousands of Ethiopian students achieving their academic goals
        </p>
      </div>
    </div>
  )
}
