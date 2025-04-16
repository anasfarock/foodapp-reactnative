import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  ScrollView, Image, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '+92 300 0000000',
    password: '',
    photo: 'https://i.pravatar.cc/100',
    diseases: [],
    allergies: [],
  });

  const [newDisease, setNewDisease] = useState('');
  const [newAllergy, setNewAllergy] = useState('');

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile saved:', profile);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile({ ...profile, photo: result.assets[0].uri });
    }
  };

  const addDisease = () => {
    if (newDisease.trim() !== '') {
      setProfile({ ...profile, diseases: [...profile.diseases, newDisease.trim()] });
      setNewDisease('');
    }
  };

  const addAllergy = () => {
    if (newAllergy.trim() !== '') {
      setProfile({ ...profile, allergies: [...profile.allergies, newAllergy.trim()] });
      setNewAllergy('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.card}>
        <TouchableOpacity onPress={isEditing ? pickImage : null}>
          <Image
            source={{ uri: profile.photo }}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          editable={isEditing}
          placeholder="Full Name"
          value={profile.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        <TextInput
          style={styles.input}
          editable={isEditing}
          placeholder="Email"
          value={profile.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <TextInput
          style={styles.input}
          editable={isEditing}
          placeholder="Phone Number"
          value={profile.phone}
          onChangeText={(text) => handleChange('phone', text)}
        />
        <TextInput
          style={styles.input}
          editable={isEditing}
          placeholder="Password"
          secureTextEntry
          value={profile.password}
          onChangeText={(text) => handleChange('password', text)}
        />

        {/* Diseases Section */}
        <Text style={styles.sectionTitle}>Diseases</Text>
        {profile.diseases.map((disease, index) => (
          <Text key={index} style={styles.listItem}>- {disease}</Text>
        ))}
        {isEditing && (
          <View style={styles.row}>
            <TextInput
              style={styles.inputFlex}
              placeholder="Add Disease"
              value={newDisease}
              onChangeText={setNewDisease}
            />
            <TouchableOpacity style={styles.addBtn} onPress={addDisease}>
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Allergies Section */}
        <Text style={styles.sectionTitle}>Allergies</Text>
        {profile.allergies.map((allergy, index) => (
          <Text key={index} style={styles.listItem}>- {allergy}</Text>
        ))}
        {isEditing && (
          <View style={styles.row}>
            <TextInput
              style={styles.inputFlex}
              placeholder="Add Allergy"
              value={newAllergy}
              onChangeText={setNewAllergy}
            />
            <TouchableOpacity style={styles.addBtn} onPress={addAllergy}>
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Text style={styles.buttonText}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111',
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#e60023',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#222',
  },
  listItem: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    marginBottom: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputFlex: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
  },
  addBtn: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});