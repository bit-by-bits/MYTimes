// Mock Google OAuth implementation
// This can be easily replaced with actual OAuth later

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export const signInWithGoogle = async (): Promise<GoogleUser> => {
  // Mock implementation - replace with actual OAuth
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: 'mock-google-user-123',
        email: 'user@gmail.com',
        name: 'John Doe',
        picture: 'https://via.placeholder.com/150',
      });
    }, 1000);
  });
};

export const signUpWithGoogle = async (): Promise<GoogleUser> => {
  // Mock implementation - replace with actual OAuth
  return signInWithGoogle();
};
