import React from 'react'

export const AuthedUserContext = React.createContext({
  isAuthed: false,
  unAuthUser: () => {},
})
