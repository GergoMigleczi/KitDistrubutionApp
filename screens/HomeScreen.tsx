import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useThemeColor } from '../hooks/useThemeColor';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tileBackgroundColor = useThemeColor({}, 'secondaryBackground') || '#f0f0f0';

console.log(tileBackgroundColor);
  const handleLoadKit = () => {
    router.push('/load-kit');
  };

  const handleUnloadKit = () => {
    router.push('/unload-kit');
  };

  const handleLogout = () => {
    // Clear any stored auth tokens here if needed
    // await AsyncStorage.removeItem('token');
    router.replace('/'); // Go back to login (assuming login is your index route)
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Kit Management</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={[styles.logoutText, { color: textColor }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tilesContainer}>
        <TouchableOpacity
          style={[styles.tile, { backgroundColor: tileBackgroundColor }]}
          onPress={handleLoadKit}
          activeOpacity={0.7}
        >
          <Text style={[styles.tileText, { color: textColor }]}>Load Kit</Text>
          <Text style={[styles.tileSubtext, { color: textColor + '99' }]}>
            Load equipment into kit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tile, { backgroundColor: tileBackgroundColor }]}
          onPress={handleUnloadKit}
          activeOpacity={0.7}
        >
          <Text style={[styles.tileText, { color: textColor }]}>Unload Kit</Text>
          <Text style={[styles.tileSubtext, { color: textColor + '99' }]}>
            Remove equipment from kit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
    position: 'absolute',
    top: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
  },
  tilesContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 20,
  },
  tile: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  tileText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  tileSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});