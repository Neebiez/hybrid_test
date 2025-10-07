import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

// Types
interface Member {
  id: number;
  name: string;
  major: string;
  avatar: string;
}

interface MembersByYear {
  [key: string]: Member[];
}

// Mock data for members by year
const membersByYear: MembersByYear = {
  '2024': [
    { id: 1, name: 'สมชาย ใจดี', major: 'วิศวกรรมคอมพิวเตอร์', avatar: '👨‍💻' },
    { id: 2, name: 'สมหญิง สวยงาม', major: 'วิทยาการคอมพิวเตอร์', avatar: '👩‍💻' },
    { id: 3, name: 'วิชัย เก่งมาก', major: 'วิศวกรรมซอฟต์แวร์', avatar: '👨‍🎓' },
  ],
  '2023': [
    { id: 4, name: 'น้องใหม่ ใจดี', major: 'วิศวกรรมคอมพิวเตอร์', avatar: '👨‍🎓' },
    { id: 5, name: 'น้องสาว สวย', major: 'วิทยาการคอมพิวเตอร์', avatar: '👩‍🎓' },
    { id: 6, name: 'พี่ชาย เก่ง', major: 'วิศวกรรมซอฟต์แวร์', avatar: '👨‍💼' },
    { id: 7, name: 'พี่สาว ดี', major: 'วิศวกรรมคอมพิวเตอร์', avatar: '👩‍💼' },
  ],
  '2022': [
    { id: 8, name: 'รุ่นพี่ เก่า', major: 'วิศวกรรมคอมพิวเตอร์', avatar: '👨‍🏫' },
    { id: 9, name: 'รุ่นพี่ สาว', major: 'วิทยาการคอมพิวเตอร์', avatar: '👩‍🏫' },
  ],
  '2021': [
    { id: 10, name: 'รุ่นใหญ่ มาก', major: 'วิศวกรรมคอมพิวเตอร์', avatar: '👴' },
    { id: 11, name: 'รุ่นใหญ่ สาว', major: 'วิทยาการคอมพิวเตอร์', avatar: '👵' },
  ],
  '2020': [
    { id: 12, name: 'รุ่นเก่า มาก', major: 'วิศวกรรมคอมพิวเตอร์', avatar: '🧓' },
  ]
};

export default function MembersScreen() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [searchQuery, setSearchQuery] = useState('');

  const years = Object.keys(membersByYear).sort((a, b) => b.localeCompare(a));
  const filteredMembers = membersByYear[selectedYear]?.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.major.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const MemberCard = ({ member }: { member: Member }) => (
    <ThemedView style={styles.memberCard}>
      <View style={styles.memberInfo}>
        <Text style={styles.avatar}>{member.avatar}</Text>
        <View style={styles.memberDetails}>
          <Text style={styles.memberName}>{member.name}</Text>
          <Text style={styles.memberMajor}>{member.major}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.messageButton}>
        <Ionicons name="chatbubble-outline" size={20} color="#007AFF" />
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>สมาชิกในชั้นปี</Text>
        <Text style={styles.headerSubtitle}>ค้นหาเพื่อนร่วมชั้นเรียน</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="ค้นหาตามชื่อหรือสาขา..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Year Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.yearFilter}
        contentContainerStyle={styles.yearFilterContent}
      >
        {years.map((year) => (
          <TouchableOpacity
            key={year}
            style={[
              styles.yearButton,
              selectedYear === year && styles.yearButtonActive
            ]}
            onPress={() => setSelectedYear(year)}
          >
            <Text style={[
              styles.yearButtonText,
              selectedYear === year && styles.yearButtonTextActive
            ]}>
              {year}
            </Text>
            <Text style={[
              styles.yearCount,
              selectedYear === year && styles.yearCountActive
            ]}>
              ({membersByYear[year]?.length || 0})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Members List */}
      <View style={styles.membersContainer}>
        <Text style={styles.sectionTitle}>
          ชั้นปี {selectedYear} ({filteredMembers.length} คน)
        </Text>
        
        {filteredMembers.length > 0 ? (
          <FlatList
            data={filteredMembers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MemberCard member={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.membersList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>ไม่พบสมาชิกในชั้นปีนี้</Text>
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  yearFilter: {
    marginBottom: 16,
  },
  yearFilterContent: {
    paddingHorizontal: 16,
  },
  yearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  yearButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  yearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  yearButtonTextActive: {
    color: 'white',
  },
  yearCount: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  yearCountActive: {
    color: 'rgba(255,255,255,0.8)',
  },
  membersContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  membersList: {
    paddingBottom: 20,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    fontSize: 32,
    marginRight: 12,
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  memberMajor: {
    fontSize: 14,
    color: '#666',
  },
  messageButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
});