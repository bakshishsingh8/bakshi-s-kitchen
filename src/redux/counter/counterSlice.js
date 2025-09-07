import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodItem: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    storeWholeValue: (state, action) => {
      const item = action.payload;
      const existing = state.foodItem.find((f) => f.childId === item.childId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.foodItem.push({ ...item, quantity: 1 });
      }
    },
    incQty: (state, action) => {
      const item = state.foodItem.find((f) => f.childId === action.payload);
      if (item) item.quantity += 1;
    },
    decQty: (state, action) => {
      const item = state.foodItem.find((f) => f.childId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // remove the item completely when quantity goes to 0
        state.foodItem = state.foodItem.filter(
          (f) => f.childId !== action.payload
        );
      }
    },
    removeItem: (state, action) => {
  console.log(action.payload, " <-- childId to remove");
  state.foodItem = state.foodItem
    .map((f) => {
      if (f.childId === action.payload) {
        if (f.quantity > 1) {
          return { ...f, quantity: f.quantity - 1 }; // decrease qty
        }
        return null; // mark for removal
      }
      return f; // keep other items
    })
    .filter(Boolean); // remove nulls
},

    clearCart: (state) => {
      state.foodItem = [];
    },
  },
});

export const { storeWholeValue, incQty, decQty, removeItem, clearCart } =
  counterSlice.actions;

export default counterSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   foodItem: [],
// };

// export const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     storeWholeValue: (state, action) => {
//       const item = action.payload;
//       const existing = state.foodItem.find((f) => f.childId === item.childId);
//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         state.foodItem.push({ ...item, quantity: 1 });
//       }
//     },
//     incQty: (state, action) => {
//       const item = state.foodItem.find((f) => f.childId === action.payload);
//       if (item) item.quantity += 1;
//     },
//     decQty: (state, action) => {
//       const item = state.foodItem.find((f) => f.childId === action.payload);
//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//       } else {
//         state.foodItem = state.foodItem.filter(
//           (f) => f.childId !== action.payload
//         );
//       }
//     },
//     removeItem: (state, action) => {
//       console.log(action,state,'stateee')
//       // state.foodItem = state.foodItem.filter(
//       //   (f) => f.childId !== action.payload
//       // );

//       state.foodItem = state.foodItem.filter(
//         (f) => f.childId !== quantity
//       )
//       if (quantity > 0){
//        item.quantity -= 1;
//       }
// else{
//   state.foodItem = state.foodItem.filter(
//         (f) => f.childId !== quantity
//       )
// }
//     },
//     clearCart: (state) => {
//       state.foodItem = [];
//     },
//   },
// });

// export const { storeWholeValue, incQty, decQty, removeItem, clearCart } =
//   counterSlice.actions;

// export default counterSlice.reducer;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   foodItem: [],
// };

// export const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     storeWholeValue: (state, action) => {
//       const item = action.payload;
//       const existing = state.foodItem.find((f) => f.childId === item.childId);
//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         state.foodItem.push({ ...item, quantity: 1 });
//       }
//     },
//     incQty: (state, action) => {
//       const item = state.foodItem.find((f) => f.childId === action.payload);
//       if (item) item.quantity += 1;
//     },
//     decQty: (state, action) => {
//       const item = state.foodItem.find((f) => f.childId === action.payload);
//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//       } else {
//         state.foodItem = state.foodItem.filter(
//           (f) => f.childId !== action.payload
//         );
//       }
//     },
//     removeItem: (state, action) => {
//       state.foodItem = state.foodItem.filter(
//         (f) => f.childId !== action.payload
//       );
//     },
//     clearCart: (state) => {
//       state.foodItem = [];
//     },
//   },
// });

// export const { storeWholeValue, incQty, decQty, removeItem, clearCart } =
//   counterSlice.actions;

// export default counterSlice.reducer;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//  import { createSlice } from '@reduxjs/toolkit'
// // import type { PayloadAction } from '@reduxjs/toolkit'



// const initialState = {
//   value: 0,
//   foodItem:[],
//   actuallyValuePrint:[]
// }

// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment: (state) => {
      
//       state.value += 1
//     },
//     decrement: (state) => {
//       state.value -= 1
//     },
//     storeWholeValue:(state,action)=>{
//       state.foodItem=[...state.foodItem,action.payload]
//     },


//     incrementByAmount: (state, action) => {
//       state.value += action.payload
//     },
//   },
// })

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount,storeWholeValue } = counterSlice.actions

// export default counterSlice.reducer