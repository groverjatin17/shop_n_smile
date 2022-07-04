// This file contains actions for this project

export const SET_MENU = 'SET_MENU';
export const CURRENT_SUBMENU = 'CURRENT_SUBMENU';
export const PRODUCTS = 'PRODUCTS';
export const SELECTED_CATEGORY = 'SELECTED_CATEGORY';
export const PRICE_FILTER = 'PRICE_FILTER';
export const CART_PRODUCTS = 'CART_PRODUCTS';
export const CURRENT_PRODUCT_ID = 'CURRENT_PRODUCT_ID';
export const STAR_FILTER = 'STAR_FILTER';
export const SEARCH_FILTER = 'SEARCH_FILTER';
export const USER = 'USER';

export function setMenu(value) {
    return (dispatch) => {
        dispatch({
            type: SET_MENU,
            payload: value,
        });
    };
}

export function setSubMenu(value) {
    return (dispatch) => {
        dispatch({
            type: CURRENT_SUBMENU,
            payload: value,
        });
    };
}
