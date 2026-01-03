import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token } from "@/types/token";

interface TokenUpdate {
  id: string;
  data: Partial<Token>;
}

interface TokenState {
  tokens: Token[];
  filteredTokens: Token[];
  activeTab: "new-pairs" | "final-stretch" | "migrated";
  sortBy: string | null;
  sortDirection: "asc" | "desc";
  isLoading: boolean;
  error: string | null;
}

const initialState: TokenState = {
  tokens: [],
  filteredTokens: [],
  activeTab: "new-pairs",
  sortBy: null,
  sortDirection: "desc",
  isLoading: false,
  error: null,
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
      state.filteredTokens = action.payload;
    },

    setActiveTab: (
      state,
      action: PayloadAction<"new-pairs" | "final-stretch" | "migrated">
    ) => {
      state.activeTab = action.payload;
    },

    setSort: (
      state,
      action: PayloadAction<{ field: string; direction: "asc" | "desc" }>
    ) => {
      state.sortBy = action.payload.field;
      state.sortDirection = action.payload.direction;
    },

    updatePrice: (
      state,
      action: PayloadAction<{ id: string; price: number; previousPrice: number }>
    ) => {
      const token = state.tokens.find((t) => t.id === action.payload.id);
      if (token) {
        token.price = action.payload.price;
        token.previousPrice = action.payload.previousPrice;
      }
      const filteredToken = state.filteredTokens.find(
        (t) => t.id === action.payload.id
      );
      if (filteredToken) {
        filteredToken.price = action.payload.price;
        filteredToken.previousPrice = action.payload.previousPrice;
      }
    },

    updateTokenData: (
      state,
      action: PayloadAction<{ id: string; data: Partial<Token> }>
    ) => {
      const updateToken = (t: Token) => {
        if (t.id === action.payload.id) {
          Object.assign(t, action.payload.data);
          if (action.payload.data.metrics) {
            t.metrics = { ...t.metrics, ...action.payload.data.metrics };
          }
        }
      };

      state.tokens.forEach(updateToken);
      state.filteredTokens.forEach(updateToken);
    },

    /**
     * Batch update multiple tokens in a single action
     * More efficient than dispatching individual updateTokenData actions
     */
    batchUpdateTokens: (state, action: PayloadAction<TokenUpdate[]>) => {
      const updates = new Map(
        action.payload.map((update) => [update.id, update.data])
      );

      const applyUpdate = (token: Token) => {
        const update = updates.get(token.id);
        if (update) {
          Object.assign(token, update);
          if (update.metrics) {
            token.metrics = { ...token.metrics, ...update.metrics };
          }
        }
      };

      state.tokens.forEach(applyUpdate);
      state.filteredTokens.forEach(applyUpdate);
    },

    addToken: (state, action: PayloadAction<Token>) => {
      state.tokens.unshift(action.payload);
      if (state.activeTab === action.payload.category) {
        state.filteredTokens.unshift(action.payload);
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    filterTokens: (state) => {
      // Filter based on active tab
      state.filteredTokens = state.tokens.filter((token) => {
        if (state.activeTab === "new-pairs") {
          return token.category === "new-pairs";
        }
        if (state.activeTab === "final-stretch") {
          return token.category === "final-stretch";
        }
        if (state.activeTab === "migrated") {
          return token.category === "migrated";
        }
        return true;
      });

      // Apply sorting
      if (state.sortBy) {
        state.filteredTokens.sort((a, b) => {
          let aValue: number;
          let bValue: number;

          switch (state.sortBy) {
            case "marketCap":
              aValue = a.marketCap;
              bValue = b.marketCap;
              break;
            case "volume":
              aValue = a.volume;
              bValue = b.volume;
              break;
            case "price":
              aValue = a.price;
              bValue = b.price;
              break;
            default:
              return 0;
          }

          if (state.sortDirection === "asc") {
            return aValue - bValue;
          }
          return bValue - aValue;
        });
      }
    },
  },
});

export const {
  setTokens,
  setActiveTab,
  setSort,
  updatePrice,
  updateTokenData,
  batchUpdateTokens,
  addToken,
  setLoading,
  setError,
  filterTokens,
} = tokenSlice.actions;

export default tokenSlice.reducer;
