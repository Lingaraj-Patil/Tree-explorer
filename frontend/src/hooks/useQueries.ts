import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { Story, LeaderboardEntry, MapPin } from '../types';

// Mock data for stories with progression system
const mockStories: Story[] = [
  {
    id: '1',
    title: 'The Ancient Oak Chronicles',
    blurb: 'Discover the secrets of the mighty oak tree and learn about its incredible ecosystem.',
    thumbnail: 'https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'The oak tree stands as one of nature\'s most magnificent creations, serving as a cornerstone of forest ecosystems worldwide. These ancient giants can live for hundreds of years, growing slowly but steadily into towering monuments of natural resilience.\n\nOak trees are easily recognizable by their distinctive lobed leaves and acorns. They belong to the genus Quercus and comprise over 600 species worldwide. From the English oak of Europe to the mighty coast live oak of California, each species has adapted to its unique environment while maintaining the characteristic strength and longevity that defines the oak family.\n\nWhat makes oak trees truly special is their role as keystone species. A single mature oak can support over 500 species of insects, which in turn feed countless birds, bats, and other wildlife. The acorns provide food for squirrels, deer, and many other animals, making the oak tree a vital food source in forest ecosystems.',
    bannerImage: 'https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=800',
    xpReward: 100,
    section: 'Forest Foundations',
    unit: 1,
    order: 1,
    isLocked: false,
    type: 'story'
  },
  {
    id: '2',
    title: 'Oak Tree Identification',
    blurb: 'Practice identifying oak trees in the wild using your camera.',
    thumbnail: 'https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Time to put your oak knowledge to the test! Use your camera to identify oak trees in your area.',
    bannerImage: 'https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=800',
    xpReward: 75,
    section: 'Forest Foundations',
    unit: 1,
    order: 2,
    isLocked: false,
    type: 'task'
  },
  {
    id: '3',
    title: 'Maple Syrup Adventures',
    blurb: 'Journey into the world of maple trees and discover how they create nature\'s sweetest gift.',
    thumbnail: 'https://images.pexels.com/photos/56875/tree-dawn-nature-buckets.jpg?auto=compress&cs=tinysrgb&w=400',
    content: 'Maple trees are among the most beloved trees in North America, famous for their spectacular fall colors and their role in producing maple syrup. These deciduous trees belong to the genus Acer and include over 100 species worldwide.\n\nThe sugar maple (Acer saccharum) is the star of maple syrup production. During late winter and early spring, these trees experience dramatic temperature swings that cause sap to flow up and down the trunk. This sap, which contains about 2-3% sugar, is collected by tapping the trees.\n\nMaple trees are also prized for their incredible autumn display. As chlorophyll breaks down in the fall, other pigments become visible, creating the stunning reds, oranges, and yellows that make maple forests so spectacular. The shape of maple leaves, with their distinctive lobes and pointed tips, makes them instantly recognizable.',
    bannerImage: 'https://images.pexels.com/photos/56875/tree-dawn-nature-buckets.jpg?auto=compress&cs=tinysrgb&w=800',
    xpReward: 150,
    section: 'Forest Foundations',
    unit: 1,
    order: 3,
    isLocked: true,
    type: 'story'
  },
  {
    id: '4',
    title: 'Maple Leaf Quiz',
    blurb: 'Test your knowledge about maple trees with this interactive quiz.',
    thumbnail: 'https://images.pexels.com/photos/56875/tree-dawn-nature-buckets.jpg?auto=compress&cs=tinysrgb&w=400',
    content: 'Challenge yourself with questions about maple trees and their characteristics.',
    bannerImage: 'https://images.pexels.com/photos/56875/tree-dawn-nature-buckets.jpg?auto=compress&cs=tinysrgb&w=800',
    xpReward: 50,
    section: 'Forest Foundations',
    unit: 1,
    order: 4,
    isLocked: true,
    type: 'quiz'
  },
  {
    id: '5',
    title: 'Pine Forest Mysteries',
    blurb: 'Explore the evergreen world of pine trees and their remarkable survival strategies.',
    thumbnail: 'https://images.pexels.com/photos/816401/pexels-photo-816401.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Pine trees are among the most recognizable conifers in the world, known for their evergreen needles, distinctive pine cones, and ability to thrive in challenging environments. These remarkable trees belong to the genus Pinus and include over 120 species globally.\n\nWhat makes pine trees so successful is their adaptation to harsh conditions. Their needle-shaped leaves reduce water loss, while their thick bark protects them from fire and extreme temperatures. Pine trees are often the first to colonize areas after disturbances like fires or landslides.\n\nPine forests create unique ecosystems that support specialized wildlife. Many animals, from red squirrels to crossbills, have evolved specifically to take advantage of pine nuts and the shelter these forests provide. The scent of pine, caused by compounds called terpenes, not only smells wonderful but also has antimicrobial properties that help protect the tree.',
    bannerImage: 'https://images.pexels.com/photos/816401/pexels-photo-816401.jpeg?auto=compress&cs=tinysrgb&w=800',
    xpReward: 125,
    section: 'Conifer Kingdom',
    unit: 2,
    order: 5,
    isLocked: true,
    type: 'story'
  },
  {
    id: '6',
    title: 'Pine Cone Collection',
    blurb: 'Bonus challenge: Find and photograph different types of pine cones.',
    thumbnail: 'https://images.pexels.com/photos/816401/pexels-photo-816401.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Special bonus mission to collect photos of various pine cone types.',
    bannerImage: 'https://images.pexels.com/photos/816401/pexels-photo-816401.jpeg?auto=compress&cs=tinysrgb&w=800',
    xpReward: 200,
    section: 'Conifer Kingdom',
    unit: 2,
    order: 6,
    isLocked: true,
    type: 'bonus'
  }
];

const mockLeaderboard: LeaderboardEntry[] = [
  { user: { id: '1', name: 'Nature Explorer', avatar: '🌲', xp: 1250, badges: [], streak: 7, rank: 1, completedStories: [] }, position: 1 },
  { user: { id: '2', name: 'Tree Whisperer', avatar: '🍃', xp: 1100, badges: [], streak: 5, rank: 2, completedStories: [] }, position: 2 },
  { user: { id: '3', name: 'Forest Guardian', avatar: '🌳', xp: 950, badges: [], streak: 12, rank: 3, completedStories: [] }, position: 3 },
  { user: { id: '4', name: 'Leaf Collector', avatar: '🍂', xp: 825, badges: [], streak: 3, rank: 4, completedStories: [] }, position: 4 },
  { user: { id: '5', name: 'Branch Manager', avatar: '🌿', xp: 740, badges: [], streak: 8, rank: 5, completedStories: [] }, position: 5 },
  { user: { id: '6', name: 'Bark Identifier', avatar: '🌰', xp: 680, badges: [], streak: 4, rank: 6, completedStories: [] }, position: 6 },
  { user: { id: '7', name: 'Root Seeker', avatar: '🌱', xp: 620, badges: [], streak: 6, rank: 7, completedStories: [] }, position: 7 },
  { user: { id: '8', name: 'Canopy Climber', avatar: '🐿️', xp: 580, badges: [], streak: 2, rank: 8, completedStories: [] }, position: 8 },
  { user: { id: '9', name: 'Seed Spreader', avatar: '🌰', xp: 540, badges: [], streak: 9, rank: 9, completedStories: [] }, position: 9 },
  { user: { id: '10', name: 'Trunk Hugger', avatar: '🤗', xp: 500, badges: [], streak: 1, rank: 10, completedStories: [] }, position: 10 }
];

const mockMapPins: MapPin[] = [
  { id: '1', storyId: '1', title: 'The Ancient Oak Chronicles', lat: 40.7128, lng: -74.0060, completed: true },
  { id: '2', storyId: '2', title: 'Maple Syrup Adventures', lat: 34.0522, lng: -118.2437, completed: true },
  { id: '3', storyId: '3', title: 'Pine Forest Mysteries', lat: 41.8781, lng: -87.6298, completed: false },
  { id: '4', storyId: '4', title: 'Redwood Giants', lat: 37.7749, lng: -122.4194, completed: true },
  { id: '5', storyId: '5', title: 'Cherry Blossom Tales', lat: 47.6062, lng: -122.3321, completed: false },
];

// API functions
const fetchStories = async (completedStories: string[] = []): Promise<Story[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return mockStories.map((story, index) => {
    const isCompleted = completedStories.includes(story.id);
    const previousStoryCompleted = index === 0 || completedStories.includes(mockStories[index - 1].id);
    
    return {
      ...story,
      isLocked: !previousStoryCompleted && !isCompleted
    };
  });
};

const fetchStory = async (id: string): Promise<Story | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockStories.find(story => story.id === id) || null;
};

const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockLeaderboard;
};

const fetchMapPins = async (): Promise<MapPin[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockMapPins;
};

// React Query hooks
export const useStories = (completedStories: string[] = []) => {
  return useQuery({
    queryKey: ['stories', completedStories],
    queryFn: () => fetchStories(completedStories),
  });
};

export const useStory = (id: string) => {
  return useQuery({
    queryKey: ['story', id],
    queryFn: () => fetchStory(id),
    enabled: !!id,
  });
};

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard,
    refetchInterval: 30000,
  });
};

export const useMapPins = () => {
  return useQuery({
    queryKey: ['mapPins'],
    queryFn: fetchMapPins,
  });
};