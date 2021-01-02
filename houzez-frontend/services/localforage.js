import localForage from 'localforage';
// import { cartCacheLiveTime } from '@constant'

// export const servicesSetCacheCartData = async (data) => {
//     localForage.setItem('cacheCartInformation', JSON.stringify(data.information));
//     localForage.setItem('cacheCartProducts', JSON.stringify(data.products));
//     const now = new Date().getTime();
//     localForage.setItem('cacheCarSetupTime', now);
// }

// export const servicesGetCacheCartData = async () => {
//     const [information, products, setupTime] = await Promise.all([
//         localForage.getItem('cacheCartInformation'),
//         localForage.getItem('cacheCartProducts'),
//         localForage.getItem('cacheCarSetupTime')
//     ])
//     if (!setupTime) {
//         return {
//             information: information ? JSON.parse(information) : false,
//             products: products ? JSON.parse(products) : []
//         }
//     } else {
//         const now = new Date().getTime();
//         if (now - setupTime > cartCacheLiveTime * 60 * 60 * 1000) {
//             localForage.clear()
//             return {
//                 information: false,
//                 products: []
//             }
//         } else {
//             return {
//                 information: information ? JSON.parse(information) : false,
//                 products: products ? JSON.parse(products) : []
//             }
//         }
//     }
// }

// export const servicesClearCartCache = async () => {
//     return Promise.all([
//         localForage.removeItem('cacheCartInformation'),
//         localForage.removeItem('cacheCartProducts'),
//         localForage.removeItem('cacheCarSetupTime')
//     ])
// }

export const servicesSetCacheSearchValue = async (data, key = 'cacheSearchValue') => {
    return localForage.setItem(key, JSON.stringify(data))
}

export const servicesGetCacheSearchValue = async (key = 'cacheSearchValue') => {
    const data = await localForage.getItem(key)
    return data ? JSON.parse(data) : false
}
