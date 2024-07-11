//import { FC } from "react";

import React, { useEffect, useState } from "react";
import { IUser } from "../../types/User";
import { getRandomUsers } from "../../API/RandomUser";
import User from "../../Components/User";

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
const UserPage = ({ title }: { title: string }) => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showUsers, setShowUsers] = useState<boolean>(false);

    const [username, setUsername] = useState('');

    useEffect(() => {
        setIsLoading(true);
        getRandomUsers().then((users) => {
            setUsers(users);
            setIsLoading(false);
        });
    }, []);

    const handleClick = () => {
        setShowUsers(true);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    return (
        <>
            <h1>Test App - {title}</h1>

            <h3>Users List</h3>

            <input type="text" onChange={handleChange} /> : <div>{username}</div>

            <br />
            <button onClick={handleClick}>Show Users</button>

            {isLoading && <p>Loading users...</p>}

            {showUsers && <ul>
                {users && users.map((user, index) => {
                    return <User key={index} user={user} />
                })}
            </ul>}
        </>
    )
}

export default UserPage;
