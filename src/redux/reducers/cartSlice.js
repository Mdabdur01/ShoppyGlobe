// import { createSlice } from "@reduxjs/toolkit";

// // Utility function to persist cart items in localStorage
// const persistCart = (items) => {
//   localStorage.setItem('items', JSON.stringify(items));
// };

// // Get initial cart items from localStorage
// const getCartFromLocalStorage = () => {
//   const savedItems = localStorage.getItem('items');
//   return savedItems ? JSON.parse(savedItems) : [];
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: getCartFromLocalStorage(),
//   },
//   reducers: {
//     // Action to add item to cart
//     addToCart: (state, action) => {
//       const existingItem = state.items.find((item) => item.id === action.payload.id);
      
//       // If the item doesn't exist, add it to the cart
//       if (!existingItem) {
//         state.items.push({ ...action.payload, quantity: action.payload.quantity });
//       } else {
//         // If the item exists, update the quantity
//         existingItem.quantity += action.payload.quantity;
//       }
      
//       persistCart(state.items); // Persist the updated cart to localStorage
//     },
    
//     // Action to remove item from cart
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//       persistCart(state.items);
//     },

//     // Action to modify quantity (increase or decrease)
//     modifyQuantity: (state, action) => {
//       const { id, type } = action.payload;
//       const item = state.items.find((item) => item.id === id);
      
//       if (item) {
//         if (type === 'increase') {
//           item.quantity += 1;
//         } else if (type === 'decrease' && item.quantity > 1) {
//           item.quantity -= 1;
//         }
//       }
      
//       persistCart(state.items); // Persist the updated cart to localStorage
//     },

//     // Action to clear cart
//     clearCart: (state) => {
//       state.items = [];
//       persistCart(state.items);
//     },
//   },
// });

// // Export actions
// export const { addToCart, removeFromCart, modifyQuantity, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const cartItems = JSON.parse(localStorage.getItem('items'));

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: cartItems || []
    },
    reducers: {
        // Action to add item to cart
        addToCart: (state, action) => {
            const existingItem = state.items.find((item => item.id === action.payload.id))
            if (!existingItem) {
                state.items.push({ ...action.payload, quantity: action.payload.quantity })
            }

            localStorage.setItem('items', JSON.stringify(state.items))
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
            localStorage.setItem('items', JSON.stringify(state.items))
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find((item) => item.id == action.payload)
            if (item) {
                item.quantity += 1;
            }
            localStorage.setItem('items', JSON.stringify(state.items));

        }, decreaseQuantity: (state, action) => {
            const item = state.items.find((item) => item.id == action.payload)
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            localStorage.setItem('items', JSON.stringify(state.items));
        },
        clearCart: (state, action) => {
            state.items = []
            localStorage.setItem('items', JSON.stringify(state.items));
        }
    }
})
export const { addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer 