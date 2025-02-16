// This is a mock database for demonstration
// In a real app, you'd use a proper database like MongoDB or PostgreSQL

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: "buyer" | "seller";
}

const users: User[] = [];

export const UsersDB = {
  findByEmail: (email: string) => {
    return users.find((user) => user.email === email);
  },

  create: (userData: Omit<User, "id">) => {
    const newUser = {
      ...userData,
      id: `user_${users.length + 1}`,
    };
    users.push(newUser);
    return newUser;
  },
};
