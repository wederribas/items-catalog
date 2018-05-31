import React from 'react'

// Create context to handle user authentication state accross the applicatoin
export const AuthedUserContext = React.createContext({
  isAuthed: false,
  unAuthUser: () => {},
})
