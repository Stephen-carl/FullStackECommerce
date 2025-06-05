import { create } from "zustand";

export const useCart = create((set)=>({
    // this object is the whole global store
    // empty item
    items : [],

    // an action i can call to add an array of products of type any
    // it will return the result either to me or the items

    addProduct: (newProduct: any) =>
    set((state: any) => {
      // Try to find an existing cart item with the same pid
      const existing = state.items.find(
        (i: any) => i.product.pid === newProduct.pid
      );

      if (existing) {
        // Bump its quantity in place and return a *new* array reference
        existing.quantity += 1;
        return { items: [...state.items] };
      }

      // Otherwise append a new entry with with the exosting state
      return {
        items: [...state.items, { product: newProduct, quantity: 1 }],
      };
    }),

    // TODO: if already in cart increase quantity
    // addProduct: (product: any) => set((state:any) => ({
    //     items: [...state.items, {product, quantity: 1}]
    // })
    // )

    resetCart: () => set({items: []}),

}))

