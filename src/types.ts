 export interface Guarantor {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    relationship: string;
  }
  
  export interface User {
    _id: string;
    index: number;
    organization: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateJoined: string;
    status: string;
    fullName: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: string | number;
    typeOfResidence: string;
    levelOfEducation: string;
    employmentStatus: string;
    sectorOfEmployment: string;
    durationOfEmployment: string;
    officeEmail: string;
    monthlyIncome: string;
    loanRepayment: string;
    twitter: string;
    facebook: string;
    instagram: string;
    guarantor: Guarantor[];
  }
  
  export interface UserData {
    user: User;
  }
  
  export interface UserList {
    users: User[];
  }
  