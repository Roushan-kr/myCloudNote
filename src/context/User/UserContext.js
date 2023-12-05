import { createContext, useState } from "react";

// const host = process.env.REACT_APP_HOST;
// i used localhost to set authtoken  but for this i also able to use this
const UserContext = createContext();
const UserState = (props) => {
  const [User, setUser] = useState(null); // TODO: use it like a user object

  return (
    <UserContext.Provider value={{ User, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserState };
