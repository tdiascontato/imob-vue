// src/interfaces/interface.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  password_digest: string;
  image: string;
  token: string;
  premium: boolean;
}

export interface Work {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  image: string;
  price: string;
}