import {firebaseAuth, provider} from 'config/constants'

export default function auth() {
  return firebaseAuth.signInWithPopup(provider)
}

export function logout() {
  return firebaseAuth.signOut()
}
