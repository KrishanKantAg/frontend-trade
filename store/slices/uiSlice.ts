import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  tooltipContent: string | null;
  popoverOpen: string | null;
}

const initialState: UIState = {
  isModalOpen: false,
  modalContent: null,
  tooltipContent: null,
  popoverOpen: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<React.ReactNode>) => {
      state.isModalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalContent = null;
    },
    setTooltipContent: (state, action: PayloadAction<string | null>) => {
      state.tooltipContent = action.payload;
    },
    setPopoverOpen: (state, action: PayloadAction<string | null>) => {
      state.popoverOpen = action.payload;
    },
  },
});

export const { openModal, closeModal, setTooltipContent, setPopoverOpen } = uiSlice.actions;

export default uiSlice.reducer;

