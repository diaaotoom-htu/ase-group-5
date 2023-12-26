import { useState } from "react";

export interface UserRegistration {
  registration: number[];
}

export default function UseRegistration() {
  const getRegistration = () => {
    const registrationString = localStorage.getItem("registration");
    const userRegistration: UserRegistration = JSON.parse(registrationString!);
    return userRegistration?.registration;
  };

  const [registration, setRegistration] = useState(getRegistration());

  const saveRegistration = (userRegistration: UserRegistration) => {
    localStorage.setItem("registration", JSON.stringify(userRegistration));
    setRegistration(userRegistration.registration);
  };

  return {
    setRegistration: saveRegistration,
    registration,
  };
}
