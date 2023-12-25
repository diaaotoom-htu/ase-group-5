import { useState } from "react";

export interface UserToken {
  token: string;
}

export default function UseToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken: UserToken = JSON.parse(tokenString!);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: UserToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
