// context/UserContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
    userIndex: number | null;
    setUserIndex: (index: number | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userIndex, setUserIndex] = useState<number | null>(null);

    return (
        <UserContext.Provider value={{ userIndex, setUserIndex }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
