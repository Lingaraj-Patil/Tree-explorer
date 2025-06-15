import { useState } from 'react';
import { Story, User, LeaderboardEntry, TaskResult } from '../types';

// Mock data for stories
const mockStories: Story[] = [
  {
    id: '1',
    title: 'The Ancient Oak Chronicles',
    blurb: 'Discover the secrets of the mighty oak tree and learn about its incredible ecosystem.',
    thumbnail: 'https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'The oak tree stands as one of nature\'s most magnificent creations, serving as a cornerstone of forest ecosystems worldwide. These ancient giants can live for hundreds of years, growing slowly but steadily into towering monuments of natural resilience.\n\nOak trees are easily recognizable by their distinctive lobed leaves and acorns. They belong to the genus Quercus and comprise over 600 species worldwide. From the English oak of Europe to the mighty coast live oak of California, each species has adapted to its unique environment while maintaining the characteristic strength and longevity that defines the oak family.\n\nWhat makes oak trees truly special is their role as keystone species. A single mature oak can support over 500 species of insects, which in turn feed countless birds, bats, and other wildlife. The acorns provide food for squirrels, deer, and many other animals, making the oak tree a vital food source in forest ecosystems.',
    bannerImage: 'https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=800',
    xpReward: 100
  },
  {
    id: '2',
    title: 'Maple Syrup Adventures',
    blurb: 'Journey into the world of maple trees and discover how they create nature\'s sweetest gift.',
    thumbnail: 'https://images.pexels.com/photos/56875/tree-dawn-nature-buckets.jpg?auto=compress&cs=tinysrgb&w=400',
    content: 'Maple trees are among the most beloved trees in North America, famous for their spectacular fall colors and their role in producing maple syrup. These deciduous trees belong to the genus Acer and include over 100 species worldwide.\n\nThe sugar maple (Acer saccharum) is the star of maple syrup production. During late winter and early spring, these trees experience dramatic temperature swings that cause sap to flow up and down the trunk. This sap, which contains about 2-3% sugar, is collected by tapping the trees.\n\nMaple trees are also prized for their incredible autumn display. As chlorophyll breaks down in the fall, other pigments become visible, creating the stunning reds, oranges, and yellows that make maple forests so spectacular. The shape of maple leaves, with their distinctive lobes and pointed tips, makes them instantly recognizable.',
    bannerImage: 'https://images.pexels.com/photos/56875/tree-dawn-nature-buckets.jpg?auto=compress&cs=tinysrgb&w=800',
    xpReward: 150
  },
  {
    id: '3',
    title: 'Pine Forest Mysteries',
    blurb: 'Explore the evergreen world of pine trees and their remarkable survival strategies.',
    thumbnail: 'https://images.pexels.com/photos/816401/pexels-photo-816401.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Pine trees are among the most recognizable conifers in the world, known for their evergreen needles, distinctive pine cones, and ability to thrive in challenging environments. These remarkable trees belong to the genus Pinus and include over 120 species globally.\n\nWhat makes pine trees so successful is their adaptation to harsh conditions. Their needle-shaped leaves reduce water loss, while their thick bark protects them from fire and extreme temperatures. Pine trees are often the first to colonize areas after disturbances like fires or landslides.\n\nPine forests create unique ecosystems that support specialized wildlife. Many animals, from red squirrels to crossbills, have evolved specifically to take advantage of pine nuts and the shelter these forests provide. The scent of pine, caused by compounds called terpenes, not only smells wonderful but also has antimicrobial properties that help protect the tree.',
    bannerImage: 'https://images.pexels.com/photos/816401/pexels-photo-816401.jpeg?auto=compress&cs=tinysrgb&w=800',
    xpReward: 125
  }
];

const mockLeaderboard: LeaderboardEntry[] = [
  { user: { id: '1', name: 'Nature Explorer', avatar: '🌲', xp: 1250, badges: [], streak: 7, rank: 1 }, position: 1 },
  { user: { id: '2', name: 'Tree Whisperer', avatar: '🍃', xp: 1100, badges: [], streak: 5, rank: 2 }, position: 2 },
  { user: { id: '3', name: 'Forest Guardian', avatar: '🌳', xp: 950, badges: [], streak: 12, rank: 3 }, position: 3 },
  { user: { id: '4', name: 'Leaf Collector', avatar: '🍂', xp: 825, badges: [], streak: 3, rank: 4 }, position: 4 },
  { user: { id: '5', name: 'Branch Manager', avatar: '🌿', xp: 740, badges: [], streak: 8, rank: 5 }, position: 5 }
];

export const useApi = () => {
  const [loading, setLoading] = useState(false);

  const fetchStories = async (): Promise<Story[]> => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockStories;
    } catch (error) {
      console.error('Error fetching stories:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchStory = async (id: string): Promise<Story | null> => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const story = mockStories.find(story => story.id === id) || null;
      return story;
    } catch (error) {
      console.error('Error fetching story:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

   const identifyTree = async (image: File): Promise<TaskResult> => {
  setLoading(true);
  try {
    // Prepare form data for the API request
    const formData = new FormData();
    formData.append('image', image);

    // Make API request to backend
    const response = await fetch('http://localhost:3000/identify', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    // Extract the species with the highest score
    const { species, confidence, xpEarned } = data;

    return {
      species,
      confidence,
      xpEarned,
      // commonNames: commonNames || [],
      storyId: mockStories[Math.floor(Math.random() * mockStories.length)].id, // Retain mock storyId if needed
    };
  } catch (error) {
    console.error('Error identifying tree:', error);
    throw error;
  } finally {
    setLoading(false);
  }
};

  const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockLeaderboard;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const shareTaskCompletion = async (data: { species: string; xp: number; storyTitle: string }) => {
    try {
      // Mock sharing functionality
      const shareText = `🌲 Just identified a ${data.species} and earned ${data.xp} XP in TreeQuest! 🎯 Story: "${data.storyTitle}" #TreeQuest #NatureExplorer`;
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'TreeQuest Achievement',
            text: shareText,
            url: window.location.origin
          });
        } catch (error) {
          console.log('Share cancelled');
        }
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareText);
        alert('Achievement copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return {
    fetchStories,
    fetchStory,
    identifyTree,
    fetchLeaderboard,
    shareTaskCompletion,
    loading
  };
};