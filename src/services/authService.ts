import { User } from '../types';

// Mock user data for demo
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    password: 'password123',
    plan: 'free',
    signalsRemaining: 3,
  },
  {
    id: '2',
    email: 'premium@example.com',
    name: 'Premium User',
    password: 'password123',
    plan: 'premium',
    signalsRemaining: 999,
  },
];

// Simulated delay to mimic API requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Store the current user in localStorage
const storeUser = (user: User) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Get the current user from localStorage
const getStoredUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
};

// Remove the current user from localStorage
const removeStoredUser = () => {
  localStorage.removeItem('currentUser');
};

// Mock login service
export const mockLogin = async (email: string, password: string): Promise<User> => {
  await delay(1000); // Simulate API delay
  
  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Omit password from returned user object
  const { password: _, ...userWithoutPassword } = user;
  const typedUser = userWithoutPassword as User;
  
  storeUser(typedUser);
  return typedUser;
};

// Mock register service
export const mockRegister = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  await delay(1000); // Simulate API delay
  
  // Check if user with email already exists
  if (MOCK_USERS.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user
  const newUser: User = {
    id: `${MOCK_USERS.length + 1}`,
    email,
    name,
    plan: 'free',
    signalsRemaining: 3,
  };
  
  // In a real app, we would save this user to a database
  // Here we're just simulating that
  
  storeUser(newUser);
  return newUser;
};

// Mock logout service
export const mockLogout = async (): Promise<void> => {
  await delay(500); // Simulate API delay
  removeStoredUser();
};

// Mock get current user service
export const mockGetCurrentUser = async (): Promise<User | null> => {
  await delay(500); // Simulate API delay
  return getStoredUser();
};

// Mock decrease signal count service
export const decreaseSignalCount = async (): Promise<User | null> => {
  await delay(300);
  const user = getStoredUser();
  
  if (!user) return null;
  
  // Only decrease for free users with signals remaining
  if (user.plan === 'free' && user.signalsRemaining > 0) {
    const updatedUser = {
      ...user,
      signalsRemaining: user.signalsRemaining - 1,
    };
    storeUser(updatedUser);
    return updatedUser;
  }
  
  return user;
};