const apiUrl = 'http://127.0.0.1:8000/'

export function fetchCategories() {
  const url = apiUrl + 'categories'
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${window.localStorage.authToken}`,
    },
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referer',
  }).then(resp => resp.json())
}

export function fetchLatestItems() {
  const url = apiUrl + 'items?limit=8'
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referer',
  }).then(resp => resp.json())
}

export function fetchItem(id) {
  const url = apiUrl + `items/${id}`
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referer',
  }).then(resp => resp.json())
}
