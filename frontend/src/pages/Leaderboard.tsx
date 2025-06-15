import React from 'react';
import { Trophy, Medal, Star, Zap, TrendingUp, Users, Crown } from 'lucide-react';
import { useLeaderboard } from '../hooks/useQueries';
import { useApp } from '../context/AppContext';
import SkeletonRow from '../components/ui/SkeletonRow';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Leaderboard: React.FC = () => {
  const { data: leaderboard, isLoading, isError, error } = useLeaderboard();
  const { user } = useApp();

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return (
          <div className="h-6 w-6 flex items-center justify-center text-gray-500 font-bold text-sm">
            #{position}
          </div>
        );
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1:
        return 'from-yellow-50 to-amber-50 border-yellow-200';
      case 2:
        return 'from-gray-50 to-slate-50 border-gray-200';
      case 3:
        return 'from-amber-50 to-orange-50 border-amber-200';
      default:
        return 'from-white to-gray-50 border-gray-200';
    }
  };

  const getPodiumHeight = (position: number) => {
    switch (position) {
      case 1:
        return 'h-32';
      case 2:
        return 'h-24';
      case 3:
        return 'h-20';
      default:
        return 'h-16';
    }
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : 'Failed to load leaderboard. Please try again.'}
          </p>
          <Button onClick={() => window.location.reload()} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              Nature Explorer{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Leaderboard
              </span>
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            See how you rank among fellow tree enthusiasts and nature explorers
          </p>
        </div>

        {/* User's Current Rank (if not in top 10) */}
        {user && leaderboard && !leaderboard.some(entry => entry.user.id === user.id) && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-2xl mr-4">{user.avatar}</div>
                <div>
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-600">That's you!</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end mb-1">
                  <Zap className="h-4 w-4 text-green-600 mr-1" />
                  <span className="font-semibold text-gray-900">{user.xp} XP</span>
                </div>
                <Badge variant="primary" size="sm">
                  Rank #{user.rank}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Top 3 Podium */}
        {leaderboard && leaderboard.length >= 3 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">🏆 Top Champions 🏆</h2>
            <div className="flex items-end justify-center gap-4 mb-8">
              {/* 2nd Place */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-gray-100 to-slate-100 rounded-xl p-4 border-2 border-gray-200 mb-2">
                  <div className="text-3xl mb-2">{leaderboard[1]?.user.avatar}</div>
                  <Trophy className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <div className="font-bold text-gray-900 text-sm mb-1">{leaderboard[1]?.user.name}</div>
                  <div className="text-lg font-bold text-gray-600">{leaderboard[1]?.user.xp}</div>
                  <div className="text-xs text-gray-500">XP</div>
                </div>
                <div className={`bg-gray-300 rounded-t-lg ${getPodiumHeight(2)} w-20 mx-auto flex items-end justify-center pb-2`}>
                  <span className="text-white font-bold">2nd</span>
                </div>
              </div>

              {/* 1st Place */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl p-6 border-2 border-yellow-200 mb-2 transform scale-110">
                  <div className="text-4xl mb-2">{leaderboard[0]?.user.avatar}</div>
                  <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="font-bold text-gray-900 mb-1">{leaderboard[0]?.user.name}</div>
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{leaderboard[0]?.user.xp}</div>
                  <div className="text-sm text-gray-600">XP</div>
                  <Badge variant="warning" size="sm" className="mt-2">
                    👑 Champion
                  </Badge>
                </div>
                <div className={`bg-yellow-400 rounded-t-lg ${getPodiumHeight(1)} w-20 mx-auto flex items-end justify-center pb-2`}>
                  <span className="text-white font-bold">1st</span>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-4 border-2 border-amber-200 mb-2">
                  <div className="text-3xl mb-2">{leaderboard[2]?.user.avatar}</div>
                  <Medal className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                  <div className="font-bold text-gray-900 text-sm mb-1">{leaderboard[2]?.user.name}</div>
                  <div className="text-lg font-bold text-amber-600">{leaderboard[2]?.user.xp}</div>
                  <div className="text-xs text-gray-500">XP</div>
                </div>
                <div className={`bg-amber-500 rounded-t-lg ${getPodiumHeight(3)} w-20 mx-auto flex items-end justify-center pb-2`}>
                  <span className="text-white font-bold">3rd</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600">
            <h2 className="text-xl font-bold text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Complete Rankings
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {isLoading ? (
              // Show skeleton rows while loading
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : leaderboard && leaderboard.length > 0 ? (
              leaderboard.map((entry) => (
                <div 
                  key={entry.user.id}
                  className={`p-6 bg-gradient-to-r border-l-4 ${
                    user && entry.user.id === user.id 
                      ? 'border-green-500 bg-green-50' 
                      : getRankColor(entry.position)
                  } hover:shadow-md transition-all duration-200`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 flex-shrink-0">
                        {getRankIcon(entry.position)}
                      </div>
                      <div className="text-3xl mr-4 flex-shrink-0">{entry.user.avatar}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <div className="font-semibold text-gray-900 truncate">{entry.user.name}</div>
                          {user && entry.user.id === user.id && (
                            <Badge variant="success" size="sm">You</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.user.badges.length} badges • {entry.user.streak} day streak
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center justify-end mb-1">
                        <Zap className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-xl font-bold text-gray-900">{entry.user.xp}</span>
                        <span className="text-sm text-gray-500 ml-1">XP</span>
                      </div>
                      {entry.position <= 3 && (
                        <div className="flex justify-end">
                          <Badge 
                            variant={entry.position === 1 ? 'warning' : entry.position === 2 ? 'secondary' : 'success'} 
                            size="sm"
                          >
                            {entry.position === 1 ? '🥇' : entry.position === 2 ? '🥈' : '🥉'} Top {entry.position}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Rankings Available</h3>
                <p className="text-gray-500">Be the first to start exploring and earning XP!</p>
              </div>
            )}
          </div>
        </div>

        {/* Motivation Section */}
        <div className="mt-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 text-center">
          <Star className="h-8 w-8 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Ready to Climb the Ranks?
          </h3>
          <p className="text-gray-600 mb-4">
            Complete more tree identification tasks and read stories to earn XP and improve your ranking!
          </p>
          <div className="text-sm text-gray-500">
            Leaderboard updates in real-time • Keep exploring to stay on top! 🌲
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;