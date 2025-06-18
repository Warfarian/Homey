import { useState, useEffect } from 'react';
import localApi from '@/integrations/local-api/client';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          localApi.setToken(token);
          const response = await localApi.getUser();
          setUser(response.user);
        }
      } catch (error) {
        console.error("Error getting user:", error);
        // Clear invalid token
        localApi.setToken(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await localApi.signIn(email, password);
      localApi.setToken(response.access_token);
      setUser(response.user);
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  };

  const signUp = async (email: string, password: string, full_name?: string) => {
    try {
      const response = await localApi.signUp(email, password, full_name);
      localApi.setToken(response.access_token);
      setUser(response.user);
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  };

  const signOut = () => {
    localApi.setToken(null);
    setUser(null);
  };

  return { 
    user, 
    loading, 
    signIn, 
    signUp, 
    signOut,
    // Legacy compatibility
    session: user ? { user } : null
  };
}
