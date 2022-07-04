export interface EmailInfo {
  name: string;
  avatar: string;
  subject: string;
  message: string;
  date: string;
  marked: boolean;
  type: string;
  unread?: boolean;
}

const DummyData: Array<EmailInfo> = [
  {
    name: "Melody Macy",
    avatar: "",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "8:30 PM",
    marked: false,
    type: "inbox",
    unread: true,
  },
  {
    name: "Max Smith",
    avatar: "/media/avatars/300-1.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "day ago",
    marked: false,
    type: "inbox",
    unread: true,
  },
  {
    name: "Sean Bean",
    avatar: "/media/avatars/300-2.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "11:20 PM",
    marked: false,
    type: "inbox",
    unread: true,
  },
  {
    name: "Olivia Wild",
    avatar: "",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "8:30 PM",
    marked: false,
    type: "inbox",
  },
  {
    name: "Neil Owen",
    avatar: "/media/avatars/300-3.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "day ago",
    marked: false,
    type: "inbox",
  },
  {
    name: "Dan Wilson",
    avatar: "/media/avatars/300-4.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "11:20 PM",
    marked: false,
    type: "inbox",
  },
  {
    name: "Emma Bold",
    avatar: "",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "8:30 PM",
    marked: false,
    type: "inbox",
  },
  {
    name: "Ana Crown",
    avatar: "/media/avatars/300-5.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "day ago",
    marked: false,
    type: "inbox",
  },
  {
    name: "Robert Doe",
    avatar: "/media/avatars/300-6.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "11:20 PM",
    marked: false,
    type: "inbox",
  },
  {
    name: "Brian Cox",
    avatar: "",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "8:30 PM",
    marked: false,
    type: "inbox",
  },
  {
    name: "Mikaela Collins",
    avatar: "/media/avatars/300-7.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "day ago",
    marked: false,
    type: "inbox",
  },
  {
    name: "Francis Mitcham",
    avatar: "/media/avatars/300-8.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "11:20 PM",
    marked: false,
    type: "inbox",
  },
  {
    name: "Brian Cox",
    avatar: "",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "8:30 PM",
    marked: true,
    type: "inbox",
  },
  {
    name: "Mikaela Collins",
    avatar: "/media/avatars/300-7.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "day ago",
    marked: true,
    type: "inbox",
  },
  {
    name: "Francis Mitcham",
    avatar: "/media/avatars/300-8.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "11:20 PM",
    marked: true,
    type: "inbox",
  },
  {
    name: "Mikaela Collins",
    avatar: "/media/avatars/300-7.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "day ago",
    marked: false,
    type: "sent",
  },
  {
    name: "Francis Mitcham",
    avatar: "/media/avatars/300-8.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "11:20 PM",
    marked: true,
    type: "sent",
  },
  {
    name: "Brian Cox",
    avatar: "",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "8:30 PM",
    marked: false,
    type: "sent",
  },
  {
    name: "Mikaela Collins",
    avatar: "/media/avatars/300-7.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "day ago",
    marked: false,
    type: "trash",
  },
  {
    name: "Francis Mitcham",
    avatar: "/media/avatars/300-8.jpg",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "11:20 PM",
    marked: false,
    type: "trash",
  },
  {
    name: "Brian Cox",
    avatar: "",
    subject: "Digital PPV Customer Confirmation",
    message:
      "Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. It originally comes from a Latin text, but to today's reader, it's seen as gibberish.",
    date: "8:30 PM",
    marked: true,
    type: "trash",
  },
];

export default DummyData;
