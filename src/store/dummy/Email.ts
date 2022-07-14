export interface IEmail {
  id: number;
  name: string;
  avatar: string;
  subject: string;
  message: string;
  date: number;
  marked: boolean;
  type: string;
  unread: number;
}

const DummyData: Array<IEmail> = [
  {
    id: 0,
    name: "Melody Macy",
    avatar: "",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656920079,
    marked: false,
    type: "inbox",
    unread: 1,
  },
  {
    id: 1,
    name: "Olivia Wild",
    avatar: "",
    subject: "Payment Notification DLOP2329KD",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656890079,
    marked: false,
    type: "inbox",
    unread: 0,
  },
  {
    id: 2,
    name: "Max Smith",
    avatar: "/media/avatars/300-1.jpg",
    subject: "Your iBuy.com grocery shopping confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656910079,
    marked: false,
    type: "inbox",
    unread: 1,
  },
  {
    id: 3,
    name: "Neil Owen",
    avatar: "/media/avatars/300-3.jpg",
    subject: "Congratulations on your iRun Coach subscription",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656920079,
    marked: false,
    type: "inbox",
    unread: 0,
  },
  {
    id: 4,
    name: "Sean Bean",
    avatar: "/media/avatars/300-2.jpg",
    subject: "Your Order #224820998666029 has been Confirmed",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656900079,
    marked: false,
    type: "inbox",
    unread: 1,
  },
  {
    id: 5,
    name: "Dan Wilson",
    avatar: "/media/avatars/300-4.jpg",
    subject: "Pay bills & win up to 600$ Cashback!",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656880079,
    marked: false,
    type: "inbox",
    unread: 0,
  },
  {
    id: 6,
    name: "Emma Bold",
    avatar: "",
    subject: "Activate your LIPO Account today",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656870079,
    marked: false,
    type: "inbox",
    unread: 0,
  },
  {
    id: 7,
    name: "Ana Crown",
    avatar: "/media/avatars/300-5.jpg",
    subject: "About your request for PalmLake",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656860079,
    marked: false,
    type: "inbox",
    unread: 0,
  },
  {
    id: 8,
    name: "Robert Doe",
    avatar: "/media/avatars/300-6.jpg",
    subject: "Welcome, Patty",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656850079,
    marked: false,
    type: "inbox",
    unread: 0,
  },
  {
    id: 9,
    name: "Brian Cox",
    avatar: "",
    subject: "Free Video Marketing Guide",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656840079,
    marked: false,
    type: "inbox",
    unread: 0,
  },
  {
    id: 10,
    name: "Mikaela Collins",
    avatar: "/media/avatars/300-7.jpg",
    subject: "Your iBuy.com grocery shopping confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656830079,
    marked: false,
    type: "inbox",
    unread: 0,
  },
  {
    id: 11,
    name: "Francis Mitcham",
    avatar: "/media/avatars/300-8.jpg",
    subject: "Your Order #224820998666029 has been Confirmed",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656820079,
    marked: false,
    type: "inbox",
    unread: 0,
  },
  {
    id: 12,
    name: "Brian Cox",
    avatar: "",
    subject: "Payment Notification DLOP2329KD",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656810079,
    marked: true,
    type: "inbox",
    unread: 0,
  },
  {
    id: 13,
    name: "Mikaela Collins",
    avatar: "/media/avatars/300-7.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656800079,
    marked: true,
    type: "inbox",
    unread: 0,
  },
  {
    id: 14,
    name: "Francis Mitcham",
    avatar: "/media/avatars/300-8.jpg",
    subject: "Your iBuy.com grocery shopping confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656790079,
    marked: true,
    type: "inbox",
    unread: 0,
  },
  {
    id: 15,
    name: "Mikaela Collins",
    avatar: "/media/avatars/300-7.jpg",
    subject: "Your Order #224820998666029 has been Confirmed",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656780079,
    marked: false,
    type: "sent",
    unread: 0,
  },
  {
    id: 16,
    name: "Francis Mitcham",
    avatar: "/media/avatars/300-8.jpg",
    subject: "Payment Notification DLOP2329KD",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656770079,
    marked: true,
    type: "sent",
    unread: 0,
  },
  {
    id: 17,
    name: "Brian Cox",
    avatar: "",
    subject: "Congratulations on your iRun Coach subscription",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656760079,
    marked: false,
    type: "sent",
    unread: 0,
  },
  {
    id: 18,
    name: "Mikaela Collins",
    avatar: "/media/avatars/300-7.jpg",
    subject: "Pay bills & win up to 600$ Cashback!",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656750079,
    marked: false,
    type: "trash",
    unread: 0,
  },
  {
    id: 19,
    name: "Francis Mitcham",
    avatar: "/media/avatars/300-8.jpg",
    subject: "Activate your LIPO Account today",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656740079,
    marked: false,
    type: "trash",
    unread: 0,
  },
  {
    id: 20,
    name: "Brian Cox",
    avatar: "",
    subject: "About your request for PalmLake",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: 1656730079,
    marked: true,
    type: "trash",
    unread: 0,
  },
];

export default DummyData;
