import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import { translations } from './translations';

// Import all images statically
const images = {
  'summary.png': require('./images/home/summary.png'),
  'paraphrasing.png': require('./images/home/paraphrasing.png'),
  'presentation.png': require('./images/home/presentation.png'),
  'assigment.png': require('./images/home/assigment.png'),
  'data.png': require('./images/home/data.png'),
  'english.png': require('./images/home/english.png'),
  'research.png': require('./images/home/research.png'),
  'logo.png': require('./images/logo/logo.png'),
};

// Chevron down image URL
const CHEVRON_DOWN_URL = 'https://img.icons8.com/ios-filled/50/ffffff/chevron-down.png';

const CourseCard = ({ course, onPress, isRTL }) => (
  <TouchableOpacity
    style={styles.courseCard}
    onPress={onPress}
  >
    <Image
      source={images[course.image]}
      style={styles.courseImage}
      resizeMode="cover"
    />
  </TouchableOpacity>
);

const HomeScreen = ({ language, onLanguageChange, onCourseSelect }) => {
  const currentLang = translations[language];
  const isRTL = language === 'arabic';

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtlContainer]}>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />

      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={onLanguageChange}
          activeOpacity={0.8}
        >
          <Text style={styles.languageText}>
            {language === 'english' ? 'English' : 'العربية'}
          </Text>
          {Platform.OS === 'ios' ? (
            <Image
              source={{ uri: CHEVRON_DOWN_URL }}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ) : (
            <IconFA name="chevron-down" size={24} color="white" />
          )}
        </TouchableOpacity>
        <View style={styles.headerTextGroup}>
          <Image source={images['logo.png']} style={styles.logo} resizeMode="contain" />
          <Text style={styles.sectionTitle}>{currentLang.whatWeDo}</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.courseList}>
          {currentLang.courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isRTL={isRTL}
              onPress={() => onCourseSelect(course)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rtlContainer: {
    direction: 'rtl',
  },
  header: {
    backgroundColor: '#0a2038',
    paddingHorizontal: 0,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height:260,
  },
  headerTextGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 250,
    height: 80,
    marginBottom: 10,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginTop: -110, // Pull the scroll view up to overlap the header
  },
  scrollContent: {
    paddingTop: 40, // Add padding to account for the overlap
    paddingBottom: 30,
  },
  courseList: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  courseCard: {
    padding: 16,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  courseImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  courseTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    lineHeight: 22,
  },
  helpSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  languageButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    width: 100,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    borderRadius: 8,
    zIndex: 2,
    gap: 10,
  },
  languageText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
});

export default HomeScreen;
