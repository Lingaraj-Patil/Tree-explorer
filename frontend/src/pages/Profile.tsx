import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Zap, Calendar, Star, ArrowRight, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const Profile: React.FC = () => {
  const { user } = useApp();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12">
            <div className="flex items-center">
              <div className="text-6xl mr-6">{user.avatar}</div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                <div className="flex items-center space-x-6 text-white/90">
                  <div className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    <span>Rank #{user.rank}</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    <span>{user.xp} XP</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{user.streak} day streak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* XP Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Experience Progress</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Current Level: Expert Explorer</span>
                  <span>{user.xp} / 1500 XP</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(user.xp / 1500) * 100}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {1500 - user.xp} XP needed to reach Master Naturalist level
              </p>
            </div>

            {/* Achievement Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Your Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{user.badges.length}</div>
                  <div className="text-sm text-gray-600">Badges</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Trees ID'd</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <div className="text-sm text-gray-600">Stories Read</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{user.streak}</div>
                  <div className="text-sm text-gray-600">Best Streak</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Identified Oak Tree</div>
                      <div className="text-sm text-gray-600">Earned 75 XP</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">2 hours ago</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Earned "Streak Keeper" Badge</div>
                      <div className="text-sm text-gray-600">7-day learning streak</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">1 day ago</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-purple-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Completed "Maple Syrup Adventures"</div>
                      <div className="text-sm text-gray-600">Earned 150 XP</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">2 days ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badge Collection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Badge Collection</h3>
              <div className="grid grid-cols-2 gap-3">
                {user.badges.map((badge) => (
                  <div 
                    key={badge.id}
                    className="p-3 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg text-center group hover:shadow-md transition-shadow"
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-medium text-gray-700 mb-1">{badge.name}</div>
                    <div className="text-xs text-gray-500">{badge.description}</div>
                  </div>
                ))}
                <div className="p-3 bg-gray-50 rounded-lg text-center opacity-60">
                  <div className="text-2xl mb-1">🔒</div>
                  <div className="text-xs text-gray-500">More badges to unlock</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/task" className="block">
                  <Button variant="primary" className="w-full">
                    <Zap className="h-4 w-4" />
                    Identify Tree
                  </Button>
                </Link>
                <Link to="/stories" className="block">
                  <Button variant="secondary" className="w-full">
                    <Star className="h-4 w-4" />
                    Read Stories
                  </Button>
                </Link>
                <Link to="/leaderboard" className="block">
                  <Button variant="secondary" className="w-full">
                    <Trophy className="h-4 w-4" />
                    View Leaderboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Streak Counter */}
            <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-6 text-center">
              <div className="text-4xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{user.streak} Days</div>
              <div className="text-sm text-gray-600 mb-3">Learning Streak</div>
              <div className="text-xs text-gray-500">
                Keep learning daily to maintain your streak!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;