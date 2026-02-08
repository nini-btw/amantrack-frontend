import { useState } from "react";

interface ConfirmDialogState<T = unknown> {
  open: boolean;
  data?: T;
}

/**
 * Custom hook for managing confirm dialog state
 *
 * @example
 * const deleteDialog = useConfirmDialog<string>(); // string = assetId
 *
 * // Open dialog with data
 * deleteDialog.openDialog("asset-123");
 *
 * // Access the data
 * console.log(deleteDialog.data); // "asset-123"
 *
 * // Close dialog
 * deleteDialog.closeDialog();
 */
export function useConfirmDialog<T = unknown>() {
  const [state, setState] = useState<ConfirmDialogState<T>>({
    open: false,
    data: undefined,
  });

  const openDialog = (data?: T) => {
    setState({ open: true, data });
  };

  const closeDialog = () => {
    setState({ open: false, data: undefined });
  };

  return {
    isOpen: state.open,
    data: state.data,
    openDialog,
    closeDialog,
  };
}
