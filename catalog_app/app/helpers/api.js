const apiUrl = `http://${window.location.hostname}:8000`

const defaultParams = {
  mode: 'cors',
  redirect: 'follow',
  referrer: 'no-referer',
}

export function fetchCategories() {
  const url = apiUrl + '/categories'
  return fetch(url, {
    method: 'GET',
    ...defaultParams,
  }).then(resp => resp.json())
}

export function fetchLatestItems() {
  const url = apiUrl + '/items?limit=8'
  return fetch(url, {
    method: 'GET',
    ...defaultParams,
  }).then(resp => resp.json())
}

export function fetchItem(id) {
  const url = apiUrl + `/items/${id}`
  return fetch(url, {
    headers: {
      Authorization: window.localStorage.authToken,
    },
    method: 'GET',
    ...defaultParams,
  }).then(resp => resp.json())
}

export function fetchCategoryItems(category_id) {
  const url = apiUrl + `/categories/${category_id}/items`
  return fetch(url, {
    method: 'GET',
    ...defaultParams,
  }).then(resp => resp.json())
}

export function addItem(data) {
  const url = apiUrl + '/items'
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: window.localStorage.authToken,
    },
    method: 'POST',
    ...defaultParams,
  }).then(resp => {
    return resp.json()
  })
}

export function editItem(data) {
  const url = apiUrl + '/items/' + data.id
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: window.localStorage.authToken,
    },
    method: 'PUT',
    ...defaultParams,
  }).then(resp => resp.json())
}

export function deleteItem(itemId) {
  const url = apiUrl + '/items/' + itemId
  return fetch(url, {
    headers: {
      Authorization: window.localStorage.authToken,
    },
    method: 'DELETE',
    ...defaultParams,
  }).then(resp => resp.json())
}

export function addCategory(data) {
  const url = apiUrl + '/categories'
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: window.localStorage.authToken,
    },
    method: 'POST',
    ...defaultParams,
  }).then(resp => resp.json())
}
