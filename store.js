import { atom } from "jotai";

export const favoritesAtom= atom();
export const searchHistoryAtom = atom();
export const userAtom = atom ({
                            isLoggedIn : false,
                            userName : "",
                        });