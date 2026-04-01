import React from 'react'

interface Testimonial {
  title: string
  quote: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    title: 'Inspiring Growth',
    quote: 'I never thought I could excel in math until I took the course on SuccessBridge. The interactive lessons made everything so clear!',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
  },
  {
    title: 'Confidence Boost',
    quote: 'The Creative Writing Essentials course helped me find my voice as a writer. I now feel confident sharing my stories.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop'
  },
  {
    title: 'Hands-On Experience',
    quote: 'The Science Explorations course was a game-changer for me. I loved the hands-on experiments that brought the lessons to life.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop'
  }
]

export const Testimonials: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          What Our Students Say
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Real stories from students who have transformed their learning experience with us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={testimonial.image}
                alt={testimonial.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">
                {testimonial.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {testimonial.quote}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
