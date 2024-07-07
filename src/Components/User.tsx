import { useState } from "react";
import { IUser } from "../types/User";

interface Iprops {
    user: IUser;
}

const User = (props: Iprops) => {
    const [user] = useState(props.user);

    return (
        <li key={user.login.uuid}>
            <div>
                Name: {user.name.first} {user.name.last}
            </div>
            <div>
                Email: {user.email}
            </div>
            <div>
                Gender: {user.gender}
            </div>
            <hr />
        </li>
    )
};

export default User;
