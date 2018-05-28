const apiUrl = 'http://127.0.0.1:8000/'

export function fetchCategories() {
  const url = apiUrl + 'categories'
  return fetch(url, {
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
    headers: {
      Authorization: window.localStorage.authToken,
    },
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referer',
  }).then(resp => resp.json())
}

export function fetchCategoryItems(category_id) {
  const url = apiUrl + `categories/${category_id}/items`
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referer',
  }).then(resp => resp.json())
}

export function addItem(data) {
  const url = apiUrl + 'items'
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: window.localStorage.authToken,
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referer',
  }).then(resp => resp.json())
}

export function editItem(data) {
  const url = apiUrl + 'items/' + data.id
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: window.localStorage.authToken,
    },
    method: 'PUT',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referer',
  }).then(resp => resp.json())
}

export function deleteItem(itemId) {
  const url = apiUrl + 'items/' + itemId
  return fetch(url, {
    headers: {
      Authorization: window.localStorage.authToken,
    },
    method: 'DELETE',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referer',
  }).then(resp => resp.json())
}
