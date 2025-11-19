import { createContext } from "react";

export const AuthContext = createContext(null)

/* 

Here we created a **React Context** called `AuthContext` using `createContext(null)`.
This context will be used to **store and share authentication-related data** (like the logged-in user, login/logout functions) across the whole application.
By exporting it, other components can **access or provide** this shared auth data without passing props manually.

*/