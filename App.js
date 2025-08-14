import React, { useState } from 'react';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const MurshidApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [language, setLanguage] = useState('english');

  const handleLanguageChange = () => {
    setLanguage(language === 'english' ? 'arabic' : 'english');
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setCurrentScreen('details');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedCourse(null);
  };

  return currentScreen === 'home' ? (
    <HomeScreen
      language={language}
      onLanguageChange={handleLanguageChange}
      onCourseSelect={handleCourseSelect}
    />
  ) : (
    <DetailsScreen
      language={language}
      onLanguageChange={handleLanguageChange}
      onBack={handleBackToHome}
      selectedCourse={selectedCourse}
    />
  );
};

export default MurshidApp;
