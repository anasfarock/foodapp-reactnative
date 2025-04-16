import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <ImageBackground
        source={require('../assets/header-background.png')}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>Pizzaria Don Juan</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Food Cards */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Image source={{ uri: 'https://i.imgur.com/jVbZ5ZT.png' }} style={styles.cardImage} />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Pizzas</Text>
            <Text style={styles.cardDesc}>Mais de 50 sabores diferentes.</Text>
            <Text style={styles.cardTime}>30 mins</Text>
          </View>
        </View>

        {/* Repeat for more items... */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 100,
    justifyContent: 'flex-end',
  },
  headerContent: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    elevation: 3,
    marginBottom: 15,
    overflow: 'hidden',
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardText: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDesc: {
    fontSize: 14,
    color: '#777',
  },
  cardTime: {
    marginTop: 5,
    fontSize: 12,
    color: '#999',
  },
});
