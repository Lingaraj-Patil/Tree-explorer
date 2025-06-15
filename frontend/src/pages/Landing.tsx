import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Award, Users, Share2, BookOpen, Camera, Star, Zap } from 'lucide-react';
import Button from '../components/ui/Button';

const Landing: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Stories',
      description: 'Immerse yourself in captivating tales about trees and their ecosystems',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Camera,
      title: 'AI Tree Identification',
      description: 'Use your camera to identify trees instantly with cutting-edge AI technology',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Award,
      title: 'Earn Badges',
      description: 'Collect unique badges and achievements as you explore and learn',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Users,
      title: 'Compete & Learn',
      description: 'Join a community of nature enthusiasts and climb the leaderboard',
      color: 'text-orange-600 bg-orange-100'
    },
    {
      icon: Share2,
      title: 'Share Discoveries',
      description: 'Share your tree discoveries and achievements with friends and family',
      color: 'text-pink-600 bg-pink-100'
    },
    {
      icon: Zap,
      title: 'Gamified Learning',
      description: 'Earn XP, maintain streaks, and unlock new content as you progress',
      color: 'text-yellow-600 bg-yellow-100'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover the World of{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Trees
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Learn, explore, and connect with nature through interactive stories, 
              AI-powered tree identification, and gamified learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/stories">
                <Button size="lg" className="w-full sm:w-auto">
                  <Play className="h-5 w-5" />
                  Start Exploring
                </Button>
              </Link>
              <Link to="/task">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Camera className="h-5 w-5" />
                  Identify a Tree
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TreeQuest?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience nature education like never before with our innovative blend of 
              storytelling, technology, and gamification.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">10K+</div>
              <div className="text-green-100">Trees Identified</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">50+</div>
              <div className="text-green-100">Interactive Stories</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">5K+</div>
              <div className="text-green-100">Active Learners</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">100+</div>
              <div className="text-green-100">Badges Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Tree Discovery Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of nature enthusiasts and start exploring the fascinating world of trees today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/stories">
              <Button size="lg" className="w-full sm:w-auto">
                <Star className="h-5 w-5" />
                Explore Stories
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <Users className="h-5 w-5" />
                View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;