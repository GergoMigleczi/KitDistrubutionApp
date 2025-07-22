import React from 'react';
import { View, StyleSheet, Text, TextInput, Button, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useThemeColor } from '../hooks/useThemeColor';
import { useLogin } from '../hooks/useLogin';

const { width: screenWidth } = Dimensions.get('window');

export default function LoginScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isLoading,
    validateAndLogin
  } = useLogin();

  const handleLoginPress = async () => {
    const success = await validateAndLogin();
    if (success) {
      router.replace('/home'); // Use replace to prevent going back to login
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        style={[styles.input, { color: textColor, borderColor: textColor }]}
        placeholder="Email"
        placeholderTextColor={textColor + '99'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, { color: textColor, borderColor: textColor }]}
        placeholder="Password"
        placeholderTextColor={textColor + '99'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

      <Button
        title={isLoading ? "Signing In..." : "Sign In"}
        onPress={handleLoginPress}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    padding: 20
  },
  logo: {
    width: screenWidth * 0.8,
    height: undefined,
    aspectRatio: 1,
    marginBottom: 0
  },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
});