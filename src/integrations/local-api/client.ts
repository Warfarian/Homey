const API_BASE_URL = import.meta.env.VITE_LOCAL_BACKEND_URL || 'http://localhost:3002/api';

class LocalApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Get token from localStorage on initialization
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async signUp(email: string, password: string, full_name?: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name }),
    });
  }

  async signIn(email: string, password: string) {
    return this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getUser() {
    return this.request('/auth/user');
  }

  // Profile methods
  async getProfile() {
    return this.request('/profiles');
  }

  async updateProfile(updates: any) {
    return this.request('/profiles', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Onboarding methods
  async getOnboarding() {
    return this.request('/onboarding');
  }

  async saveOnboarding(data: any) {
    return this.request('/onboarding', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Recommendations methods
  async getRecommendations() {
    return this.request('/recommendations');
  }

  async generateRecommendations() {
    return this.request('/recommendations/generate', {
      method: 'POST',
    });
  }

  // Saved places methods
  async getSavedPlaces() {
    return this.request('/saved-places');
  }

  async savePlace(place: any) {
    return this.request('/saved-places', {
      method: 'POST',
      body: JSON.stringify(place),
    });
  }

  async deletePlace(placeId: string) {
    return this.request(`/saved-places/${placeId}`, {
      method: 'DELETE',
    });
  }

  // Chat methods
  async chatCompletion(messages: any[]) {
    return this.request('/chat/completion', {
      method: 'POST',
      body: JSON.stringify({ messages }),
    });
  }

  // Retell methods
  async createRetellCall(to_number: string) {
    return this.request('/retell/create-call', {
      method: 'POST',
      body: JSON.stringify({ to_number }),
    });
  }
}

export const localApi = new LocalApiClient(API_BASE_URL);
export default localApi;