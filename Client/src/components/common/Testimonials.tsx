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
        <h2 className="text-lg md:text-2xl lg:text-[1.7rem] font-semibold text-slate-900 dark:text-white tracking-tight">
          What Our Students Say
        </h2>
        <p className="mt-1.5 md:mt-2 text-xs md:text-sm lg:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Real stories from students who have transformed their learning experience with us.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 px-3 md:px-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-[#0E1524] rounded-xl md:rounded-2xl border border-slate-200/80 dark:border-white/[0.07] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Image Section */}
            <div className="relative h-36 md:h-40 lg:h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={testimonial.image}
                alt={testimonial.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Title Overlay on Image */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white leading-tight">
                  {testimonial.title}
                </h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 md:p-4 lg:p-5">
              <p className="text-[13px] md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {testimonial.quote}
              </p>

              <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                Verified learner · 5.0
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
