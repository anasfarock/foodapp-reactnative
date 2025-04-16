import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, ActivityIndicator, KeyboardAvoidingView, Platform, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AuthScreen = () => {
  const [loginActive, setLoginActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      // simulate server delay
      setLoading(false);
      alert(`${loginActive ? 'Signed in' : 'Account created'} successfully`);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../assets/background.png')} // <- add your image
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', '#000']}
          style={styles.gradient}
        >
          <Image
            source={require('../assets/logo.png')} // <- add your logo
            style={styles.logo}
          />

          {!loginActive && (
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#999"
              style={styles.input}
              autoCapitalize="words"
              onChangeText={setName}
              value={name}
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
          )}

          <TextInput
            ref={emailInputRef}
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
          />

          <TextInput
            ref={passwordInputRef}
            placeholder="Password"
            placeholderTextColor="#999"
            style={styles.input}
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleSubmit}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {loginActive ? 'Sign In' : 'Sign Up'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setLoginActive(!loginActive)}
            activeOpacity={0.7}
          >
            <Text style={styles.switchText}>
              {loginActive ? 'Create an account' : 'Already have an account?'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginVertical: 5,
    width: '100%',
    height: 50,
    borderRadius: 8,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#da2a41',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default AuthScreen;
