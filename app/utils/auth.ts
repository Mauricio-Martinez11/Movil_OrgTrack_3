// Simple role persistence helper used for local prototyping.
// WARNING: This is intentionally minimal and only intended for development/demo.
// Replace with secure auth token handling and server-validated roles/permissions
// before shipping (e.g. store role in JWT claims or fetch from authenticated
// user endpoint).
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINTS } from '../../constants/api-config';
import { post } from './api';

const ROLE_KEY = 'user_role';
const TOKEN_KEY = 'auth_token';

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

export async function saveToken(token: string) {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.warn('saveToken error', e);
  }
}

export async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.warn('getToken error', e);
    return null;
  }
}

export async function clearAuth() {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, ROLE_KEY]);
  } catch (e) {
    console.warn('clearAuth error', e);
  }
}

// Attempt login against backend. Expects server to return { token, usuario: { rol } }
export async function login(email: string, password: string) {
  console.log('Login attempt:', { email, password: password ? '***' : '(empty)' });
  // Laravel API expects 'correo' and 'contrasena'
  const res = await post<any>(ENDPOINTS.login, { correo: email, contrasena: password });
  console.log('Login response:', res);
  if (!res.ok) throw res.error || new Error('Login failed');

  const payload = res.data || {};
  const token = payload.token;
  const role = payload.usuario?.rol; // Laravel returns role in usuario.rol

  if (token) await saveToken(token);
  if (role === 'cliente' || role === 'transportista') await setRole(role);

  return { token, role, raw: payload };
}

export async function register(payload: { firstName: string; lastName: string; email: string; password: string; ci?: string; telefono?: string; rol?: 'cliente' | 'transportista' }) {
  // Laravel API expects: nombre, apellido, ci, correo, contrasena, telefono (optional), rol (optional)
  const body = {
    nombre: payload.firstName,
    apellido: payload.lastName,
    ci: payload.ci || '0000000', // CI requerido, usar default si no se proporciona
    correo: payload.email,
    contrasena: payload.password,
    telefono: payload.telefono || '',
    rol: payload.rol || 'cliente', // Por defecto cliente
  };
  const res = await post<any>(ENDPOINTS.register, body);
  if (!res.ok) throw res.error || new Error('Register failed');

  const data = res.data || {};
  const role = data.usuario?.rol || 'cliente'; // Laravel returns role in usuario.rol
  // Note: Register doesn't return token, user needs to login after registration
  
  if (role === 'cliente' || role === 'transportista') await setRole(role);

  return { token: null, role, raw: data };
}
