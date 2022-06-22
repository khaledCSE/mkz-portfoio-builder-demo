import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface User {
    userId: string;
    profileId: string;
    email: string;
}

interface UserDefinition {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

export const authContext = createContext<UserDefinition | null>(null);

export const AuthProvider = (props: any) => {
    const [user, setUser] = useState<User | null>(null);
    return <authContext.Provider value={{ user, setUser }}>{props.children}</authContext.Provider>;
};
