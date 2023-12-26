import { useState } from "react";

export interface Request {
  courseName: string;
  timeslot: string;
}

export interface UserRequests {
  requests: Request[];
}

export default function UseRequests() {
  const getRequests = () => {
    const requestsString = localStorage.getItem("requests");
    const userRequests: UserRequests = JSON.parse(requestsString!);
    return userRequests?.requests;
  };

  const [requests, setRequests] = useState(getRequests());

  const saveRequests = (userRequests: UserRequests) => {
    localStorage.setItem("requests", JSON.stringify(userRequests));
    setRequests(userRequests.requests);
  };

  return {
    setRequests: saveRequests,
    requests,
  };
}
