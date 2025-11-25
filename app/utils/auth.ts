// Simple role persistence helper used for local prototyping.
// WARNING: This is intentionally minimal and only intended for development/demo.
// Replace with secure auth token handling and server-validated roles/permissions
// before shipping (e.g. store role in JWT claims or fetch from authenticated
// user endpoint).
import AsyncStorage from '@react-native-async-storage/async-storage';

const ROLE_KEY = 'user_role';

export type UserRole = 'cliente' | 'transportista' | null;

export async function setRole(role: Exclude<UserRole, null>) {
  try {
    await AsyncStorage.setItem(ROLE_KEY, role);
  } catch (e) {
    console.warn('setRole error', e);
  }
}

export async function getRole(): Promise<UserRole> {
  try {
    const r = await AsyncStorage.getItem(ROLE_KEY);
    if (r === 'cliente' || r === 'transportista') return r;
    return null;
  } catch (e) {
    console.warn('getRole error', e);
    return null;
  }
}

export async function clearRole() {
  try {
    await AsyncStorage.removeItem(ROLE_KEY);
  } catch (e) {
    console.warn('clearRole error', e);
  }
}
