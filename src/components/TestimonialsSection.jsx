import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Wanjiku",
      role: "Tourism Ambassador - Nairobi",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612d6c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "Being a Tourism Ambassador has opened my eyes to the incredible beauty of Kenya. The #TembeaKenya initiative connects us with our heritage while sharing it with the world.",
      rating: 5
    },
    {
      name: "James Kiprotich",
      role: "Cultural Guide - Maasai Mara",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "Through Tourism Ambassadors, I have been able to showcase authentic Maasai culture to visitors from around the globe. It's more than tourism - it's cultural preservation.",
      rating: 5
    },
    {
      name: "Grace Mutua",
      role: "Student Ambassador - Mombasa",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "The ambassador program taught me leadership skills while promoting our beautiful coastal culture. #TembeaKenya isn't just a hashtag - it's a movement!",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-forest-50 to-nature-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-forest-900 mb-4">
            AMBASSADOR <span className="text-nature-600">VOICES</span>
          </h2>
          <p className="text-lg text-forest-700 max-w-3xl mx-auto">
            Hear from our passionate Tourism Ambassadors who are promoting Kenya's beauty and culture through the #TembeaKenya movement.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center">
              <img 
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-nature-200"
              />
              
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-lg text-gray-600 mb-6 italic leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </p>
              
              <h3 className="text-xl font-semibold text-forest-900 mb-1">
                {testimonials[currentTestimonial].name}
              </h3>
              <p className="text-nature-600 font-medium">
                {testimonials[currentTestimonial].role}
              </p>
            </div>
          </div>

          <button 
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-forest-700" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-forest-700" />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentTestimonial ? 'bg-nature-600' : 'bg-nature-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
