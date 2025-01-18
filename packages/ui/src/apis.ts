import { get } from 'react-hook-form'
import { Web3 } from 'web3'

export const getDataWatchList=async (address)=>{

  const url = `http://10.40.0.160:3002/user/${Web3.utils.toChecksumAddress(address)}`;

  const options = {
    method: 'GET',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'Sec-GPC': '1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Expecting HTML or text response
    let collections=[]
    let result=get(data,'watchList',[])
    result.forEach((item)=>{
      item.collections.forEach((collection)=>{
        collections.push(collection)
      })

    })
    return {
      collections:collections
    }
  } catch (error) {
    return {
      collections:[]
    }
  }
}

export const getDataBlur=async ()=>{
  const url = 'https://blur.p.rapidapi.com/v1/collections/';
  const params = new URLSearchParams({
    filters: '{"sort":"VOLUME_ONE_DAY","order":"DESC"}'
  });

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'dd1c66b2damsh6c07ac2305c3252p1ed98cjsn0a13be3dfd7a',
      'x-rapidapi-host': 'blur.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(`${url}?${params}`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data
  } catch (error) {
    return {
    collections:[]
    }
  }
}

export const getDataOpenSea=async (addressContract)=>{

  const url = `https://opensea15.p.rapidapi.com/api/v2/chain/ETHEREUM/contract/${addressContract}`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'dd1c66b2damsh6c07ac2305c3252p1ed98cjsn0a13be3dfd7a',
      'x-rapidapi-host': 'opensea15.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data
  } catch (error) {
    return {
      collection: ''
    }
  }
}
//
// VM34044:17

export const getDataBest=async(collection:string)=>{
  const url = `https://opensea15.p.rapidapi.com/api/v2/listings/collection/${collection}/best`;

// Replace {slug} with the actual slug value you want to use
const slug = 'your_collection_slug'; // Change this to the actual slug you want
const finalUrl = url.replace('{slug}', slug);

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'dd1c66b2damsh6c07ac2305c3252p1ed98cjsn0a13be3dfd7a',
    'x-rapidapi-host': 'opensea15.p.rapidapi.com'
  }
};

try {
  const response = await fetch(finalUrl, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data
} catch (error) {
  return {listings: []}
}
}

export const getNFTDetail = async (collectionAddress,tokenId) => {
  const url = `https://blur.p.rapidapi.com/v1/collections/${collectionAddress}/tokens/${tokenId}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'dd1c66b2damsh6c07ac2305c3252p1ed98cjsn0a13be3dfd7a',
      'x-rapidapi-host': 'blur.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data; // Trả về dữ liệu để sử dụng trong ứng dụng
  } catch (error) {
    console.error('Error fetching NFT details:', error);
    throw error; // Ném lỗi ra để xử lý nếu cần
  }
};

export const getPrices = async (collection) => {
  const url = `https://blur.p.rapidapi.com/v1/collections/${collection}/prices`;
  const params = new URLSearchParams({
    filters: '{"traits":[],"hasAsks":true}',
  });

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'dd1c66b2damsh6c07ac2305c3252p1ed98cjsn0a13be3dfd7a',
      'x-rapidapi-host': 'blur.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(`${url}?${params.toString()}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data; // Trả về dữ liệu nếu cần dùng
  } catch (error) {

   return {
     nftPrices:[]
   }
  }
};

export const addToWatchlist = async (address,collection) => {
  const url = 'http://10.40.0.160:3002/users/watchlist/collection/add';
  const headers = {
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Cookie': '_ga=GA1.1.821235664.1737106836; _ga_Y1QCGDPSTL=GS1.1.1737106836.1.1.1737107430.0.0.0',
    'Origin': 'http://localhost:3001',
    'Pragma': 'no-cache',
    'Referer': 'http://localhost:3001/documentation',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'accept': 'application/json',
    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
  };

  const body = JSON.stringify({
    userAddress: Web3.utils.toChecksumAddress(address),
    wlName: "Main Watchlist",
    collection: collection,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
  } catch (error) {
    console.error('Error adding to watchlist:', error);
  }
};

export const removeFromWatchlist = async (address,collectionAddress) => {
  const url = 'http://10.40.0.160:3002/users/watchlist/collection/remove';
  const headers = {
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Cookie': '_ga=GA1.1.821235664.1737106836; _ga_Y1QCGDPSTL=GS1.1.1737106836.1.1.1737107430.0.0.0',
    'Origin': 'http://localhost:3001',
    'Pragma': 'no-cache',
    'Referer': 'http://localhost:3001/documentation',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'accept': 'application/json',
    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
  };

  const body = JSON.stringify({
    userAddress: Web3.utils.toChecksumAddress(address),
    wlName: "Main Watchlist",
    collection: {
      contractAddress: collectionAddress,
    },
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
  } catch (error) {
    console.error('Error removing from watchlist:', error);
  }
};





