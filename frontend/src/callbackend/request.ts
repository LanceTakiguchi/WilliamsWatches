// import request from 'request';

// const baseUrl = 'localhost:8080'

// export const catalog = async () => {
//   request(`${baseUrl}/catalog`, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log('catalog', body);
//     }
//   })
// }

const baseUrl = ''; // in local, it's just localhost:8080

export const getCatalog = async (types?: string) => {
  try {
    const url = `${baseUrl}/catalog${types ? `?types=${types}` : ""}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok && response.status == 200) {
      const catalog = await response.json();
      console.log('getCatalog 200')
      console.log(catalog)
      return catalog
    } else {
      console.log('catalog error:', response.status)
      return {}
    }
  
  } catch (err) {
    console.log('catalog error:', err);
    return {}
  }
}

export const getInventory = async (ids: string[]) => {
  try {
    if (!(ids && ids.length > 0)) {
      console.log('inventory error: missing ids')
      return {}
    }

    const url = `${baseUrl}/batchInventory?ids=${ids.join()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok && response.status == 200) {
      const inventory = await response.json();
      console.log('getInventory 200')
      console.log(inventory)
      return inventory
    } else {
      console.log('inventory error:', response.status)
      return {}
    }
  
  } catch (err) {
    console.log('inventory error:', err);
    return {}
  }
}