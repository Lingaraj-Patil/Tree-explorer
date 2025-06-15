import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { MapPin, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { useMapPins } from '../hooks/useQueries';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for completed and incomplete stories
const completedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const incompleteIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map: React.FC = () => {
  const { data: mapPins, isLoading, isError, error } = useMapPins();

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : 'Failed to load map data. Please try again.'}
          </p>
          <Button onClick={() => window.location.reload()} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading story locations...</p>
        </div>
      </div>
    );
  }

  const completedStories = mapPins?.filter(pin => pin.completed) || [];
  const incompleteStories = mapPins?.filter(pin => !pin.completed) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Story{' '}
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Map
                  </span>
                </h1>
                <p className="text-gray-600 mt-1">
                  Explore tree stories from around the world
                </p>
              </div>
            </div>
            
            {/* Legend */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Completed ({completedStories.length})</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Available ({incompleteStories.length})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div className="h-[600px] w-full">
          {mapPins && mapPins.length > 0 ? (
            <MapContainer
              center={[39.8283, -98.5795]} // Center of USA
              zoom={4}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {mapPins.map((pin) => (
                <Marker
                  key={pin.id}
                  position={[pin.lat, pin.lng]}
                  icon={pin.completed ? completedIcon : incompleteIcon}
                >
                  <Popup className="custom-popup">
                    <div className="p-2 min-w-[200px]">
                      <div className="flex items-center mb-2">
                        {pin.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <Clock className="h-5 w-5 text-red-500 mr-2" />
                        )}
                        <Badge 
                          variant={pin.completed ? 'success' : 'warning'} 
                          size="sm"
                        >
                          {pin.completed ? 'Completed' : 'Available'}
                        </Badge>
                      </div>
                      
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                        {pin.title}
                      </h3>
                      
                      <div className="flex flex-col gap-2">
                        <Link to={`/stories/${pin.storyId}`}>
                          <Button variant="primary" size="sm" className="w-full">
                            <BookOpen className="h-4 w-4" />
                            {pin.completed ? 'Read Again' : 'Read Story'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Story Locations Available</h3>
                <p className="text-gray-500">Story locations will appear here as you explore!</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Legend */}
        <div className="md:hidden absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-10">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {completedStories.length}
              </div>
              <div className="text-gray-600">Stories Completed</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {incompleteStories.length}
              </div>
              <div className="text-gray-600">Stories Available</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {mapPins?.length || 0}
              </div>
              <div className="text-gray-600">Total Locations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 py-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Explore More Stories?
          </h2>
          <p className="text-gray-600 mb-6">
            Discover fascinating tree stories from around the world and mark your progress on the map!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/stories">
              <Button size="lg" className="w-full sm:w-auto">
                <BookOpen className="h-5 w-5" />
                Browse All Stories
              </Button>
            </Link>
            <Link to="/task">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <MapPin className="h-5 w-5" />
                Identify Trees Nearby
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;