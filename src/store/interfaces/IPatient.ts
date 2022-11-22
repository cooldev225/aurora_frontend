import IAppointment from "./IAppointment";
import IPatientAlert from "./IPatientAlert";

export default interface IPatient {
  id: number;
  title: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  contact_number: string;
  date_of_birth: string;
  address: string;
  suburb: string;
  postcode: string;
  country: string;
  marital_status: string;
  birth_place_code: string;
  birth_state: string;
  occupation: string;
  height: string;
  weight: string;
  race: string;
  preferred_contact_method: string;
  appointment_confirm_method: string;
  send_recall_method: string;
  kin_name: string;
  kin_relationship: string;
  kin_email: string;
  alerts: Array<IPatientAlert>;
  appointments: Array<IAppointment>;
}
