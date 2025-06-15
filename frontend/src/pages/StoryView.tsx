import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Star, Clock, Share2, CheckCircle } from 'lucide-react';
import { useStory } from '../hooks/useQueries';
import { useApp } from '../context/AppContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

const StoryView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: story, isLoading, isError } = useStory(id!);
  const { setCurrentStory, user, completeStory } = useApp();

  const isCompleted = user?.completedStories?.includes(id!) || false;

  React.useEffect(() => {
    if (story) {
      setCurrentStory(story);
    }
  }, [story, setCurrentStory]);

  const handleComplete = () => {
    if (id) {
      completeStory(id);
      // Add XP to user
      if (user && story) {
        // This would typically be handled by the backend
        console.log(`Story completed! Earned ${story.xpReward} XP`);
      }
      navigate('/stories');
    }
  };

  const handleShare = async () => {
    if (!story) return;
    
    const shareData = {
      title: story.title,
      text: `Check out this amazing tree story: ${story.title}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
      alert('Story link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h2>
          <Link to="/stories">
            <Button variant="primary">
              <ArrowLeft className="h-4 w-4" />
              Back to Stories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={story.bannerImage} 
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Navigation */}
        <div className="absolute top-6 left-6">
          <Link to="/stories">
            <Button variant="secondary" className="bg-white/90 backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4" />
              Back to Path
            </Button>
          </Link>
        </div>

        {/* Share Button */}
        <div className="absolute top-6 right-6">
          <Button 
            variant="secondary" 
            className="bg-white/90 backdrop-blur-sm"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Story Title */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium mr-3">
              {story.section} - Unit {story.unit}
            </div>
            {isCompleted && (
              <div className="bg-green-500 rounded-full p-2">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {story.title}
          </h1>
          <div className="flex items-center space-x-6 text-white/90">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>5-10 min read</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-400" />
              <span>{story.xpReward} XP Reward</span>
            </div>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            {story.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Completion Section */}
          <div className="mt-12 p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="text-center">
              {isCompleted ? (
                <>
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Lesson Completed!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Great job! You've earned {story.xpReward} XP. Continue your learning journey!
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Link to="/stories">
                      <Button size="lg">
                        Continue Learning Path
                      </Button>
                    </Link>
                    <Link to="/task">
                      <Button variant="secondary" size="lg">
                        <Camera className="h-5 w-5" />
                        Practice Identification
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Complete This Lesson?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You've read about {story.title.toLowerCase()}. Mark this lesson as complete to unlock the next adventure!
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button size="lg" onClick={handleComplete} className="shadow-lg hover:shadow-xl">
                      <CheckCircle className="h-5 w-5" />
                      Complete Lesson (+{story.xpReward} XP)
                    </Button>
                    <Link to="/task">
                      <Button variant="secondary" size="lg">
                        <Camera className="h-5 w-5" />
                        Practice First
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryView;