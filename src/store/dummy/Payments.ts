export interface IPayment {
  id: number;
  clinic_id: number;
  time: string;
  patient_name: string;
  attendance_status: string;
  apt_date: string;
  outstanding_balance: number;
}

const PaymentList: Array<IPayment> = [
  {
    id: 0,
    clinic_id: 1,
    time: "09:45 AM - 10:00 AM",
    patient_name: "MONICA BADOV",
    attendance_status: "checked_out",
    apt_date: "30/06/2022",
    outstanding_balance: 0,
  },
  {
    id: 1,
    clinic_id: 2,
    time: "12:00 PM - 12:30 PM",
    patient_name: "JOE SMITH",
    attendance_status: "checked_in",
    apt_date: "27/06/2022",
    outstanding_balance: 2,
  },
  {
    id: 2,
    clinic_id: 3,
    time: "10:15 AM - 10:30 AM",
    patient_name: "FABIAN AZIZI",
    attendance_status: "waiting",
    apt_date: "21/02/2022",
    outstanding_balance: 0,
  },
  {
    id: 3,
    clinic_id: 1,
    time: "09:45 AM - 10:00 AM",
    patient_name: "HARPER CARLSON",
    attendance_status: "not_present",
    apt_date: "21/02/2022",
    outstanding_balance: 4,
  },
  {
    id: 4,
    clinic_id: 2,
    time: "10:00 AM - 10:15 AM",
    patient_name: "ARIA HARDISON",
    attendance_status: "checked_out",
    apt_date: "21/02/2022",
    outstanding_balance: 5,
  },
];

export default PaymentList;
