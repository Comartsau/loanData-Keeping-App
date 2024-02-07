import { atom } from "recoil";

export const locationStore = atom({
    key:'keyLocation',
    default: [],
})

export const collapsedStore = atom({
    key:'keycollapsed',
    default: false,
})

export const customerStore = atom({
    key:'keyCustomer',
    default: [],
})
