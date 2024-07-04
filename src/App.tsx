//import { FC } from "react";

import { useEffect, useState } from "react";
import { getRandomUsers } from "./API/RandomUser";

// way 1- Declare types using interface (most popular way)
/*interface Props {
  title: string;
}*/

// way 2- Declare types using type keyword
type Props = {
  title: string;
}

/**
 * FC - react use FC to define function component, always implicitly include children in the props
 * sometimes, you don't need to pass children, so that time this can be unwanted rendering
 * @returns 
 */

//const App: FC<Props> = () => {
//const App = (props: Props) => {
// way 3 - Declare types using inline declaration
const App = ({ title }: { title: string }) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getRandomUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <>
      <h1>Test App - {title}</h1>

      <h3>Users List</h3>
      <ul>
        {users && users.map(({ login, name, email, gender }) => {
          return (
            <li key={login.uuid}>
              <div>
                Name: {name.first} {name.last}
              </div>
              <div>
                Email: {email}
              </div>
              <div>
                Gender: {gender}
              </div>
              <hr />
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App;
