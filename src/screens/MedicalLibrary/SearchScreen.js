import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const navigation = useNavigation();

  // Sample categories for health library (same as in your HealthLibraryScreen)
  const categories = [
    {
      title: 'General Health & Wellness',
      description: 'Healthy habits, exercise, sleep hygiene, and stress management.',
      link: 'GeneralHealth',
    },
    {
      title: 'Mental Health',
      description: 'Understand mental health, coping with anxiety, and depression.',
      link: 'MentalHealth',
    },
    {
      title: 'Nutrition & Diet',
      description: 'Balanced diet, nutrients, weight loss, and diet myths debunked.',
      link: 'Nutrition',
    },
    {
      title: 'Fitness & Exercise',
      description: 'Personalized fitness plans, benefits of regular exercise.',
      link: 'Fitness',
    },
    {
      title: 'Drug Information',
      description: 'Get detailed information on various drugs and medications.',
      link: 'Drugs',
    },
    {
      title: 'Disease Management',
      description: 'Learn how to manage and prevent chronic diseases.',
      link: 'DiseaseManagement',
    },
    {
      title: 'Health News & Trends',
      description: 'Stay updated with the latest health research, news, and innovations.',
      link: 'HealthNews',
    },
    {
      title: 'Parenting & Child Health',
      description: 'Nutrition, vaccinations, and parenting tips for children’s health.',
      link: 'Parenting',
    },
    {
      title: 'Women\'s Health',
      description: 'Pregnancy, reproductive health, and bone health for women.',
      link: 'WomensHealth',
    },
    {
      title: 'Men\'s Health',
      description: 'Focus on fitness, mental health, and prostate care for men.',
      link: 'MensHealth',
    },
    {
      title: 'Aging & Senior Health',
      description: 'Health tips for seniors, including mobility, nutrition, and aging with grace.',
      link: 'SeniorHealth',
    },
    {
      title: 'Alternative Medicine & Natural Healing',
      description: 'Explore acupuncture, herbal medicine, and other alternative healing practices.',
      link: 'AlternativeMedicine',
    },
    {
      title: 'Breathing & Heart Health',
      description: 'Breathing exercises, heart health tips, and cardiovascular prevention.',
      link: 'BreathingHeartHealth',
    },
    {
      title: 'Teeth & Oral Health',
      description: 'Maintaining good oral hygiene, preventing dental issues, and more.',
      link: 'TeethOralHealth',
    },
    {
      title: 'Environmental Health',
      description: 'The impact of pollution, climate change, and eco-friendly living.',
      link: 'EnvironmentalHealth',
    },
    {
      title: 'Sex & Emotional Health',
      description: 'Managing sexual health, emotional intimacy, and relationships.',
      link: 'SexEmotionalHealth',
    },
    {
      title: 'Telemedicine & Telehealth',
      description: 'Understanding telehealth, virtual doctor visits, and remote healthcare.',
      link: 'TelemedicineTelehealth',
    },
    {
      title: 'Immune System & Infectious Diseases',
      description: 'Boosting immunity, preventing infections, and understanding diseases.',
      link: 'ImmuneInfectiousDiseases',
    },
    {
      title: 'Sleep Health & Disorders',
      description: 'Improving sleep quality, managing disorders like insomnia.',
      link: 'SleepHealth',
    },
    {
      title: 'Addiction & Recovery',
      description: 'Overcoming addiction, understanding recovery processes, and support.',
      link: 'AddictionRecovery',
    },
    {
      title: 'Genetics & Personalized Medicine',
      description: 'How genetics shape your health and personalized treatment options.',
      link: 'GeneticsMedicine',
    },
    {
      title: 'Workplace Health & Ergonomics',
      description: 'Improving posture, ergonomics, and managing work stress.',
      link: 'WorkplaceHealth',
    },
    {
      title: 'Alternative Therapies',
      description: 'Exploring acupuncture, reflexology, herbal remedies, and more.',
      link: 'AlternativeTherapies',
    },
    {
      title: 'Healthy Aging & Longevity',
      description: 'Tips for aging gracefully and living a longer, healthier life.',
      link: 'HealthyAging',
    },
  ];

  // Handle search input
  const handleSearch = (text) => {
    setQuery(text);
    
    // Filter categories based on the query
    const results = categories.filter(category => 
      category.title.toLowerCase().includes(text.toLowerCase()) ||
      category.description.toLowerCase().includes(text.toLowerCase())
    );
    
    setFilteredCategories(results);
  };

  // Render a list of search results
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate(item.link)}>
      <View style={styles.resultItem}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for health topics..."
        value={query}
        onChangeText={handleSearch}
      />

      {/* Display Search Results */}
      {query && (
        <FlatList
          data={filteredCategories}
          renderItem={renderItem}
          keyExtractor={(item) => item.link}
        />
      )}

      {/* If no results, show a message */}
      {query && filteredCategories.length === 0 && (
        <Text style={styles.noResults}>No results found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resultTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  noResults: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default SearchScreen;
