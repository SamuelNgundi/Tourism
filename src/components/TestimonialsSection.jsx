import React, { useState, useEffect } from 'react';
import damaris from '../images/Damaris_Maweu.jpg';
import jesse from '../images/Jesse_Saruni.jpg';
import margaret from '../images/Margaret_Wanjiku.jpg';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Hon. Dr. Damaris Maweu",
      role: "Director at Kenya Medical Research Institute (KEMRI)",
      image: damaris,
      text: "It was a motivation for cultural tourism as it ignited a strong desire to interact more with local communities to experience their robust heritage and get involved in their cultural pride.",
      rating: 5
    },
    {
      name: "Wakili Jesse Saruni",
      role: "Lawyer",
      image: jesse,
      text: "As a Tourism Ambassador, I marvel at the opportunities available to attract tourists in Kenya. Tourism Ambassadors are at the front of marketing Kenya.",
      rating: 5
    },
    {
      name: "Dr.Hon Margaret Wanjiku",
      role: "",
      image: margaret,
      text: "Taste the world, one bite at a time with the Tourism Ambassadors",
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
            TESTIMONIALS <span className="text-nature-600">OF OUR AMBASSADORS</span>
          </h2>
          <p className="text-lg text-forest-700 max-w-3xl mx-auto">
            Hear from our passionate Tourism Ambassadors who are promoting Kenya's beauty and culture through the #TembeaKenya movement.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center">
              <OptimizedImage 
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-nature-200"
                widths={[120, 160, 200]}
                sizes="80px"
                quality={80}
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
