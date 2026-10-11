import dotenv from 'dotenv';
import path from 'node:path';

const environment = process.env.ENV ?? 'qa';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${environment}`) });

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable ${name} en .env.${environment}`);
  return value;
}

export const env = {
  baseUrl: required('BASE_URL'),
  apiUrl: required('API_URL').replace(/\/?$/, '/'),   // fuerza una barra final
  userEmail: process.env.USER_EMAIL ?? '',
  userPassword: process.env.USER_PASSWORD ?? '',
};