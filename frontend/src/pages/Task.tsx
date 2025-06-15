import React, { useState, useRef } from 'react';
import { Camera, Upload, Zap, Share2, ArrowRight } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { useApp } from '../context/AppContext';
import { TaskResult } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const Task: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<TaskResult | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { identifyTree, shareTaskCompletion, loading } = useApi();
  const { addTaskResult, currentStory, user } = useApp();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResult(null);
    }
  };

  const handleIdentify = async () => {
    if (!selectedImage) return;
    
    try {
      const taskResult = await identifyTree(selectedImage);
      setResult(taskResult);
      addTaskResult(taskResult);
      setShowShareModal(true);
    } catch (error) {
      console.error('Error identifying tree:', error);
    }
  };

  const handleShare = async () => {
    if (!result || !currentStory) return;
    
    await shareTaskCompletion({
      species: result.species,
      xp: result.xpEarned,
      storyTitle: currentStory.title
    });
    setShowShareModal(false);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResult(null);
    setShowShareModal(false);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Tree{' '}
            <span className="text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
              Identification
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Use AI to identify trees and earn XP points for your discoveries!
          </p>
        </div>

        <div className="overflow-hidden bg-white shadow-lg rounded-xl">
          {/* Upload Section */}
          {!selectedImage && (
            <div className="p-8">
              <div 
                className="p-12 text-center transition-colors border-2 border-gray-300 border-dashed cursor-pointer rounded-xl hover:border-green-500"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Upload a Tree Photo
                </h3>
                <p className="mb-6 text-gray-500">
                  Take a photo or upload an image of a tree to identify its species
                </p>
                <Button variant="primary" size="lg">
                  <Upload className="w-5 h-5" />
                  Choose Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* Preview & Identify */}
          {selectedImage && !result && (
            <div className="p-8">
              <div className="mb-6">
                <img 
                  src={previewUrl!} 
                  alt="Tree to identify"
                  className="object-scale-down w-full rounded-lg shadow-md max-h-96"
                />
              </div>
              <div className="flex justify-center gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={handleIdentify}
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : <Zap className="w-5 h-5" />}
                  {loading ? 'Analyzing...' : 'Identify Tree'}
                </Button>
                <Button variant="secondary" size="lg" onClick={handleReset}>
                  Choose Different Photo
                </Button>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="p-8">
              <div className="mb-6">
                <img 
                  src={previewUrl!} 
                  alt="Identified tree"
                  className="object-scale-down w-full rounded-lg shadow-md max-h-96"
                />
              </div>
              
              <div className="p-6 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <div className="text-center">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    Identification Complete! 🎉
                  </h3>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Badge variant="success" size="lg">
                      {result.species}
                    </Badge>
                    <Badge variant="primary" size="lg">
                      {Math.round(result.confidence)}% confidence
                    </Badge>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xl font-semibold text-green-600">
                    <Zap className="w-6 h-6" />
                    +{result.xpEarned} XP Earned!
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="success" size="lg" onClick={() => setShowShareModal(true)}>
                  <Share2 className="w-5 h-5" />
                  Share Achievement
                </Button>
                <Button variant="secondary" size="lg" onClick={handleReset}>
                  Identify Another Tree
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        {user && (
          <div className="p-6 mt-8 bg-white shadow-lg rounded-xl">
            <h3 className="mb-4 text-xl font-bold text-center text-gray-900">Your Progress</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{user.xp}</div>
                <div className="text-gray-500">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{user.badges.length}</div>
                <div className="text-gray-500">Badges Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{user.streak}</div>
                <div className="text-gray-500">Day Streak</div>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && result && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl">
              <h3 className="mb-4 text-xl font-bold text-center text-gray-900">
                Share Your Discovery!
              </h3>
              <div className="mb-6 text-center">
                <div className="mb-2 text-lg font-semibold text-gray-700">
                  You identified: <span className="text-green-600">{result.species}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Earned {result.xpEarned} XP • {Math.round(result.confidence)}% confidence
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="primary" onClick={handleShare} className="flex-1">
                  <Share2 className="w-4 h-4" />
                  Share Now
                </Button>
                <Button variant="secondary" onClick={() => setShowShareModal(false)} className="flex-1">
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;