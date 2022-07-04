import {
    SET_MENU,
    CURRENT_SUBMENU,
    PRODUCTS,
    SELECTED_CATEGORY,
    PRICE_FILTER,
    STAR_FILTER,
    SEARCH_FILTER,
    CART_PRODUCTS,
    CURRENT_PRODUCT_ID,
    USER,
} from "../actions/Homepage.actions";

const initialState = {
    menu: "blah",
    submenu: [],
    products: [],
    selectedCategory: "",
    priceFilter: [],
    starFilter: [],
    searchFilter: "",
    cartProducts: [],
    currentProductId: 1,
    // user: {
    //     "_id": "6181362ec2eac613b5767837",
    //     "userName": "dileep",
    //     "password": "dileep",
    //     "role": "admin",
    //     "userEmail": "dileep@gmail.com",
    //     "userId": "d0d35951-33a4-4a8c-ba46-424daeda74d6"
    // },
    user: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_MENU:
            return {
                ...state,
                menu: action.payload,
            };
        case CURRENT_SUBMENU:
            return {
                ...state,
                submenu: action.payload,
            };
        case PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload,
            };
        case PRICE_FILTER:
            return {
                ...state,
                priceFilter: action.payload,
            };
        case STAR_FILTER:
            return {
                ...state,
                starFilter: action.payload,
            };
        case SEARCH_FILTER:
            return {
                ...state,
                searchFilter: action.payload,
            };
        case CART_PRODUCTS:
            return {
                ...state,
                cartProducts: action.payload,
            };
        case CURRENT_PRODUCT_ID:
            return {
                ...state,
                currentProductId: action.payload,
            };
        case USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
}
