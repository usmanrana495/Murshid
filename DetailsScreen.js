import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Linking,
  Alert,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { translations } from './translations';

// Import all detail images
const detailImages = {
  'presentation.png': require('./images/details/presentation.jpg'),
  'research.png': require('./images/details/research.jpg'),
  'summary.png': require('./images/details/summary.jpg'),
  'assigment.png': require('./images/details/assigment.jpg'),
  'data.png': require('./images/details/data.jpg'),
  'english.png': require('./images/details/english.jpg'),
  'paraphrasing.png': require('./images/details/paraphrasing.jpg'),
};

// Back arrow image URL
const BACK_ARROW_URL = 'https://img.icons8.com/ios-filled/50/ffffff/back.png';

const DetailsScreen = ({ language, onLanguageChange, onBack, selectedCourse }) => {
  const currentLang = translations[language];
  const isRTL = language === 'arabic';

  const openWhatsApp = (courseName) => {
    const phoneNumber = '447455578878'; // Replace with actual WhatsApp number
    const message = `Hello! I'm interested in the ${courseName} course. Can you provide more information?`;
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(whatsappUrl);
        } else {
          Alert.alert('WhatsApp not installed', 'Please install WhatsApp to continue');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <SafeAreaView style={[styles.container, isRTL && styles.rtlContainer]}>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        {/* Blue Header with Image */}
        <View style={styles.blueHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.8}
          >
            {Platform.OS === 'ios' ? (
              <Image
                source={{ uri: BACK_ARROW_URL }}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            ) : (
              <Icon name="arrow-left" size={24} color="white" />
            )}
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isRTL && styles.rtlText]}>{selectedCourse?.title}</Text>
          <View style={styles.imageWrapper}>
            <Image
              source={detailImages[selectedCourse?.image]}
              style={styles.courseDetailImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Card Content */}
        <View style={styles.card}>
          <Text style={[styles.cardSubtitle, isRTL && styles.rtlText]}>{currentLang.qualitativeQuantitative}</Text>
          {selectedCourse?.details.map((detail, index) => (
            <View key={index} style={[styles.detailItem, isRTL && styles.rtlDetailItem]}>
              <View style={styles.bullet} />
              <Text style={[styles.detailText, isRTL && styles.rtlText]}>{detail}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* WhatsApp Button fixed at bottom */}
      <View style={styles.whatsappButtonContainer}>
        <TouchableOpacity 
          style={styles.whatsappButton}
          onPress={() => openWhatsApp(selectedCourse?.title)}
        >
          <Icon name="whatsapp" size={24} color="white" />
          <Text style={styles.whatsappText}>{currentLang.askQuestions}</Text>
        </TouchableOpacity>
      </View>
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
  blueHeader: {
    backgroundColor: '#0a2038',
    paddingBottom: 40,
    paddingHorizontal: 0,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 2,
    padding: 10,
  },
  languageButton: {
    position: 'absolute',
    gap: 10,
    top: 20,
    right: 20,
    width: 100,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    borderRadius: 8,
    zIndex: 2,
  },
  languageText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 80,
    marginBottom: 20,
    textAlign: 'center',
  },
  imageWrapper: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '85%',
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: -110,
    overflow: 'hidden',
  },
  courseDetailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  card: {
    backgroundColor: 'white',
    // marginHorizontal: 16,
    marginTop: 70,
    // borderRadius: 20,
    padding: 24,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.08,
    // shadowRadius: 8,
    // elevation: 4,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  rtlDetailItem: {
    flexDirection: 'row-reverse',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4A90E2',
    marginTop: 8,
    marginRight: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  whatsappButton: {
    backgroundColor: '#1a365d',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '94%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 15,
  },
  whatsappText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  whatsappButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 0,
    alignItems: 'center',
    zIndex: 10,
  },
});

export default DetailsScreen;
