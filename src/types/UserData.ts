
export interface UserData {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  age: number | null;
  nin: string | null; // National Identification Number
  driving_license: string | null;
  residence_address: string | null;
  photo?: string | null;
  created_at: string;
  updated_at: string;
}
