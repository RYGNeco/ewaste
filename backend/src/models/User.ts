export interface User {
  id: string;
  username: string;
  password: string;
  role: string;
}

// Example in-memory users (replace with DB in production)
export const users: User[] = [
  { id: '1', username: 'admin', password: 'adminpass', role: 'admin' },
  { id: '2', username: 'user', password: 'userpass', role: 'user' },
];
