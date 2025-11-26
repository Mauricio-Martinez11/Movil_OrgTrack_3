import { ENDPOINTS } from '../../constants/api-config';

export type ApiResponse<T> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: any;
};

async function request<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const bodyString = options.body ? JSON.stringify(options.body) : undefined;
    console.log('API Request:', { url, method: options.method, body: bodyString });
    
    const res = await fetch(url, {
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers || {}) 
      },
      ...options,
      body: bodyString,
    });

    const text = await res.text();
    console.log('API Response:', { status: res.status, body: text });
    
    let json: any = undefined;
    try {
      json = text ? JSON.parse(text) : undefined;
    } catch (e) {
      json = text;
    }

    if (!res.ok) return { ok: false, status: res.status, error: json };
    return { ok: true, status: res.status, data: json };
  } catch (error) {
    console.log('API Error:', error);
    return { ok: false, status: 0, error };
  }
}

export async function post<T>(url: string, body: any): Promise<ApiResponse<T>> {
  return request<T>(url, { method: 'POST', body });
}

export default { post, request, ENDPOINTS };
