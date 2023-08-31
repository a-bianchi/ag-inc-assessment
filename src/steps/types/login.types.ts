export interface LoginResponse {
  success: boolean;
  data: Data;
}

export interface Data {
  Data: DataClass;
  access_token: string;
}

export interface DataClass {
  user_id: number;
  username: string;
  active_email: number;
  active_phone: number;
  vendoo_user_id: null;
  livo_user_id: null;
  gender_id: number;
  birth_year: number;
  birth_date: null;
  phone: string;
  user_name: string;
  user_surname: string;
  type_id: number;
  phone_activation: number;
  session_id: string;
}
