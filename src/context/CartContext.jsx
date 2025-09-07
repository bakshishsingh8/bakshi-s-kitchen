import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const key = action.payload.key;
      const existing = state.items[key];
      const qty = (existing?.qty || 0) + 1;
      const nextItem = existing ? { ...existing, qty } : { ...action.payload, qty };
      return { items: { ...state.items, [key]: nextItem } };
    }
    case "INC": {
      const it = state.items[action.key];
      if (!it) return state;
      return { items: { ...state.items, [action.key]: { ...it, qty: it.qty + 1 } } };
    }
    case "DEC": {
      const it = state.items[action.key];
      if (!it) return state;
      if (it.qty <= 1) {
        const items = { ...state.items };
        delete items[action.key];
        return { items };
      }
      return { items: { ...state.items, [action.key]: { ...it, qty: it.qty - 1 } } };
    }
    case "REMOVE": {
      const items = { ...state.items };
      delete items[action.key];
      return { items };
    }
    case "CLEAR":
      return { items: {} };
    default:
      return state;
  }
}

const initState = { items: {} };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initState, (init) => {
    try {
      const saved = localStorage.getItem("cart:v1");
      return saved ? JSON.parse(saved) : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart:v1", JSON.stringify(state));
    } catch {}
  }, [state]);

  const api = useMemo(() => {
    const items = Object.values(state.items);
    const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
    return {
      items,
      total,
      add(item) {
        // ensure a stable key (name+price is fine for your data)
        const key = item.key ?? `${item.name}-${item.price}`;
        dispatch({ type: "ADD", payload: { ...item, key } });
      },
      inc: (key) => dispatch({ type: "INC", key }),
      dec: (key) => dispatch({ type: "DEC", key }),
      remove: (key) => dispatch({ type: "REMOVE", key }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
