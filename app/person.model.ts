export interface Person {
  id: number | null;
  firstName: string;
  lastName: string;
  personAge: string | null;
  personGender: string | null;
  personEmail: string | null;
}

export interface User {
  id: number | null;
  username: string;
  password: string;
  email: string;
}