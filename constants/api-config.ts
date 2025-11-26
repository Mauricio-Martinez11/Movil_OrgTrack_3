// Use your local network IP instead of localhost for mobile device/emulator access
// To find your IP: run "ipconfig" in PowerShell and look for "IPv4 Address" under your active network
// Or check the Expo Metro bundler output which shows: "exp://YOUR_IP:8081"
export const API_BASE = 'http://192.168.0.10:8000/api';
export const AUTH_PATH = '/auth';

export const ENDPOINTS = {
  login: `${API_BASE}${AUTH_PATH}/login`,
  register: `${API_BASE}${AUTH_PATH}/register`,
};
