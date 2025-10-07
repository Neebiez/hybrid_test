import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// Mock data for posts
const mockPosts = [
  {
    id: 1,
    user: 'John Doe',
    year: '2021',
    content: 'สวัสดีครับ! วันนี้อากาศดีมากเลย',
    likes: 15,
    comments: 3,
    timestamp: '2 ชั่วโมงที่แล้ว',
    liked: false
  },
  {
    id: 2,
    user: 'Jane Smith',
    year: '2022',
    content: 'ใครมีหนังสือ Calculus เก่าๆ ขายบ้างไหม?',
    likes: 8,
    comments: 7,
    timestamp: '4 ชั่วโมงที่แล้ว',
    liked: true
  },
  {
    id: 3,
    user: 'Mike Johnson',
    year: '2020',
    content: 'พรุ่งนี้มีสอบ Final แล้ว เฮ้อ...',
    likes: 22,
    comments: 12,
    timestamp: '6 ชั่วโมงที่แล้ว',
    liked: false
  }
];

export default function HomeScreen() {
  const [posts, setPosts] = useState(mockPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleComment = (postId: number) => {
    Alert.alert('คอมเม้นท์', 'ฟีเจอร์คอมเม้นท์จะเปิดใช้งานเร็วๆ นี้');
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const newPostObj = {
        id: Date.now(),
        user: 'คุณ',
        year: '2024',
        content: newPost,
        likes: 0,
        comments: 0,
        timestamp: 'เมื่อสักครู่',
        liked: false
      };
      setPosts([newPostObj, ...posts]);
      setNewPost('');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const PostCard = ({ post }: { post: any }) => (
    <ThemedView style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.user}</Text>
          <Text style={styles.userYear}>ชั้นปี {post.year}</Text>
        </View>
        <Text style={styles.timestamp}>{post.timestamp}</Text>
      </View>
      
      <Text style={styles.postContent}>{post.content}</Text>
      
      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLike(post.id)}
        >
          <Ionicons 
            name={post.liked ? "heart" : "heart-outline"} 
            size={20} 
            color={post.liked ? "#ff6b6b" : "#666"} 
          />
          <Text style={[styles.actionText, post.liked && styles.likedText]}>
            {post.likes}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleComment(post.id)}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Create Post Section */}
        <ThemedView style={styles.createPostContainer}>
          <TextInput
            style={styles.postInput}
            placeholder="คุณกำลังคิดอะไรอยู่?"
            value={newPost}
            onChangeText={setNewPost}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.postButton, !newPost.trim() && styles.postButtonDisabled]}
            onPress={handleCreatePost}
            disabled={!newPost.trim()}
          >
            <Text style={styles.postButtonText}>โพสต์</Text>
          </TouchableOpacity>
        </ThemedView>

        {/* Posts Feed */}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  createPostContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  postButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  postButtonDisabled: {
    backgroundColor: '#ccc',
  },
  postButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  postCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userYear: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  postContent: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },
  likedText: {
    color: '#ff6b6b',
    fontWeight: '600',
  },
});
