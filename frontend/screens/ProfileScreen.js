import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  ScrollView, Image, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => phone.length >= 10;
  const validateName = (name) => name.length >= 3;
  const validatePassword = (password) =>
    password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    if (!validateName(profile.name)) {
      Alert.alert('Invalid Name', 'Name must be at least 3 characters.');
      return;
    }

    if (!validateEmail(profile.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!validatePhone(profile.phone)) {
      Alert.alert('Invalid Phone', 'Phone number must be at least 10 digits.');
      return;
    }

    if (!validatePassword(profile.password)) {
      Alert.alert('Weak Password', 'Password must be at least 8 characters with letters and numbers.');
      return;
    }

    setIsEditing(false);
    Alert.alert('Success', 'Profile saved successfully!');
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

  const removeDisease = (index) => {
    const updated = [...profile.diseases];
    updated.splice(index, 1);
    setProfile({ ...profile, diseases: updated });
  };

  const removeAllergy = (index) => {
    const updated = [...profile.allergies];
    updated.splice(index, 1);
    setProfile({ ...profile, allergies: updated });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.card}>
        <TouchableOpacity onPress={isEditing ? pickImage : null} style={styles.avatarWrapper}>
          <Image source={{ uri: profile.photo }} style={styles.avatar} />
          {isEditing && (
            <View style={styles.cameraOverlay}>
              <Ionicons name="camera-outline" size={20} color="#fff" />
            </View>
          )}
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

        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            editable={isEditing}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={profile.password}
            onChangeText={(text) => handleChange('password', text)}
          />
          {isEditing && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} style={styles.eyeIcon} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.sectionTitle}>Diseases</Text>
        {profile.diseases.map((disease, index) => (
          <View key={index} style={styles.listRow}>
            <Text style={styles.listItem}>- {disease}</Text>
            {isEditing && (
              <TouchableOpacity onPress={() => removeDisease(index)}>
                <Ionicons name="close-circle" size={18} color="#e60023" />
              </TouchableOpacity>
            )}
          </View>
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

        <Text style={styles.sectionTitle}>Allergies</Text>
        {profile.allergies.map((allergy, index) => (
          <View key={index} style={styles.listRow}>
            <Text style={styles.listItem}>- {allergy}</Text>
            {isEditing && (
              <TouchableOpacity onPress={() => removeAllergy(index)}>
                <Ionicons name="close-circle" size={18} color="#e60023" />
              </TouchableOpacity>
            )}
          </View>
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
  avatarWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0007',
    padding: 5,
    borderRadius: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    marginLeft: 10,
    marginBottom: 15,
    color: '#999',
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
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 3,
  },
  listItem: {
    fontSize: 14,
    color: '#555',
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
