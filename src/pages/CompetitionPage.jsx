import React, { useState } from 'react';
import { Trophy, Users, Calendar, CheckCircle, Award, Star } from 'lucide-react';

function CompetitionPage() {
  const [selectedCategory, setSelectedCategory] = useState('photography');

  const competitionCategories = [
    {
      id: 'photography',
      title: 'Photography Contest',
      description: 'Capture the beauty of Kenya through your lens',
      prize: 'KES 100,000 + Camera Equipment',
      deadline: 'April 30, 2024',
      participants: 245
    },
    {
      id: 'video',
      title: 'Video Storytelling',
      description: 'Tell compelling stories about Kenyan culture',
      prize: 'KES 150,000 + Video Equipment',
      deadline: 'May 15, 2024',
      participants: 189
    },
    {
      id: 'essay',
      title: 'Tourism Essay Writing',
      description: 'Write about the future of Kenyan tourism',
      prize: 'KES 75,000 + Publishing Opportunity',
      deadline: 'March 31, 2024',
      participants: 312
    },
    {
      id: 'innovation',
      title: 'Tourism Innovation Challenge',
      description: 'Propose innovative solutions for tourism development',
      prize: 'KES 200,000 + Mentorship Program',
      deadline: 'June 30, 2024',
      participants: 156
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Choose Your Category",
      description: "Select the competition category that matches your skills and interests."
    },
    {
      number: 2,
      title: "Read Guidelines",
      description: "Carefully review the rules, judging criteria, and submission requirements."
    },
    {
      number: 3,
      title: "Create Your Entry",
      description: "Develop your photography, video, essay, or innovation proposal."
    },
    {
      number: 4,
      title: "Submit Entry",
      description: "Upload your submission through our online portal before the deadline."
    },
    {
      number: 5,
      title: "Judging Process",
      description: "Expert panel reviews all entries based on creativity, authenticity, and impact."
    },
    {
      number: 6,
      title: "Results Announcement",
      description: "Winners announced at the annual Tourism Ambassadors Gala event."
    }
  ];

  const judgingCriteria = [
    { criterion: "Creativity & Originality", weight: "25%" },
    { criterion: "Authenticity & Cultural Representation", weight: "25%" },
    { criterion: "Technical Quality", weight: "20%" },
    { criterion: "Tourism Promotion Value", weight: "20%" },
    { criterion: "Audience Engagement Potential", weight: "10%" }
  ];

  const pastWinners = [
    {
      name: "Maria Ochieng",
      category: "Photography",
      year: "2023",
      title: "Maasai Sunrise",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      name: "David Kiprop",
      category: "Video Storytelling",
      year: "2023",
      title: "Voices of the Coast",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      name: "Grace Mutindi",
      category: "Essay Writing",
      year: "2023",
      title: "Kenya: The Heart of Africa",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
            alt="Tourism competition celebration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-camp-900/80 to-camp-900/40"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            TOURISM AMBASSADORS <span className="text-camp-300">COMPETITIONS</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Showcase your creativity and passion for Kenya while competing for amazing prizes and recognition in our annual competitions.
          </p>
        </div>
      </section>

      {/* Competition Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-forest-900 mb-4">
              COMPETITION <span className="text-nature-600">CATEGORIES</span>
            </h2>
            <p className="text-lg text-forest-700">Choose from four exciting categories to showcase your talents</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {competitionCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <Trophy className="h-8 w-8 text-camp-500" />
                  <h3 className="text-2xl font-bold text-forest-900">{category.title}</h3>
                </div>
                <p className="text-forest-700 mb-6">{category.description}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-forest-600">Prize:</span>
                    <span className="text-sm font-semibold text-camp-600">{category.prize}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-forest-600">Deadline:</span>
                    <span className="text-sm font-semibold text-forest-900">{category.deadline}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-forest-600">Participants:</span>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-nature-500" />
                      <span className="text-sm font-semibold text-nature-600">{category.participants}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-camp-500 text-white py-3 rounded-lg font-semibold hover:bg-camp-600 transition-colors">
                  ENTER COMPETITION
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join Steps */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-forest-900 mb-4">
              HOW TO <span className="text-nature-600">PARTICIPATE</span>
            </h2>
            <p className="text-lg text-forest-700">Follow these simple steps to enter our competitions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-nature-500 to-camp-600 rounded-2xl p-6 text-white h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center">
                      <span className="text-lg font-bold">{step.number}</span>
                    </div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                  </div>
                  <p className="text-white/90">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-nature-200"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Judging Criteria */}
      <section className="py-20 bg-gradient-to-br from-forest-50 to-nature-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-forest-900 mb-4">
              JUDGING <span className="text-nature-600">CRITERIA</span>
            </h2>
            <p className="text-lg text-forest-700">Understanding how entries are evaluated by our expert panel</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
                {judgingCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-nature-500" />
                      <span className="font-medium text-forest-900">{criteria.criterion}</span>
                    </div>
                    <span className="text-lg font-bold text-camp-600">{criteria.weight}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-nature-50 rounded-lg">
                <h3 className="text-lg font-semibold text-forest-900 mb-2">Additional Information</h3>
                <p className="text-forest-700">
                  All entries are reviewed by a panel of tourism industry experts, cultural ambassadors, and creative professionals. 
                  The judging process is transparent and fair, with detailed feedback provided to all participants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Winners */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-forest-900 mb-4">
              PAST <span className="text-nature-600">WINNERS</span>
            </h2>
            <p className="text-lg text-forest-700">Celebrating our talented Tourism Ambassadors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastWinners.map((winner, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img src={winner.image} alt={winner.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-camp-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {winner.year} Winner
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-forest-900 mb-1">{winner.name}</h3>
                  <p className="text-nature-600 font-medium mb-2">{winner.category}</p>
                  <p className="text-gray-600 italic">"{winner.title}"</p>
                  <div className="flex items-center space-x-1 mt-3">
                    <Award className="h-4 w-4 text-camp-500" />
                    <span className="text-sm text-forest-700">First Place</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-20 bg-gradient-to-br from-camp-600 to-forest-700">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            READY TO <span className="text-camp-200">COMPETE?</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join hundreds of creative Tourism Ambassadors in showcasing the beauty and culture of Kenya. 
            Your story could be the next to inspire the world through #TembeaKenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-camp-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-camp-50 transition-colors">
              VIEW ALL COMPETITIONS
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-camp-700 transition-colors">
              COMPETITION GUIDELINES
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CompetitionPage;
