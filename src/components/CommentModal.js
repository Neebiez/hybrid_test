import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS } from '../utils/constants';

export default function CommentModal({ visible, onClose, comments, onComment }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onComment(newComment);
      setNewComment('');
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.comment}>
      <Text style={styles.commentAuthor}>{item.author?.name || 'Anonymous'}</Text>
      <Text style={styles.commentContent}>{item.content}</Text>
      <Text style={styles.commentTime}>{formatTime(item.createdAt)}</Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Comments</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.dark} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={comments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderComment}
            style={styles.commentsList}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No comments yet</Text>
            }
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              placeholderTextColor={COLORS.gray}
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSubmit}
            >
              <Ionicons name="send" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  comment: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  commentAuthor: {
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 5,
  },
  commentContent: {
    color: COLORS.dark,
    fontSize: 15,
    lineHeight: 20,
  },
  commentTime: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.gray,
    marginTop: 50,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.light,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.light,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    color: COLORS.dark,
  },
  sendButton: {
    padding: 10,
  },
});
