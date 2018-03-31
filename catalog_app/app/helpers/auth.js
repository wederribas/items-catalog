import {firebaseAuth, provider} from 'config/constants'

export default function auth() {
  return firebaseAuth.signInWithPopup(provider)
}

export function logout() {
  return firebaseAuth.signOut()
}

export function registerUser({email, uid, photoURL}) {
  const url = 'http://127.0.0.1:8000/users'
  return fetch(url, {
    body: JSON.stringify({
      email: email,
      uid: uid,
      avatar: photoURL,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referer',
  }).then(resp => resp.json())
}
