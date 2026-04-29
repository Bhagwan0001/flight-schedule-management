import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, } from "@mui/material";
export function ConfirmDialog({ open, title, description, confirmText = "Confirm", cancelText = "Cancel", danger = false, onConfirm, onClose, }) {
    return (_jsxs(Dialog, { open: open, onClose: onClose, maxWidth: "xs", fullWidth: true, children: [_jsx(DialogTitle, { children: title }), description ? (_jsx(DialogContent, { children: _jsx(DialogContentText, { children: description }) })) : null, _jsxs(DialogActions, { children: [_jsx(Button, { variant: "outlined", onClick: onClose, children: cancelText }), _jsx(Button, { variant: "contained", color: danger ? "error" : "primary", onClick: () => {
                            onConfirm();
                            onClose();
                        }, children: confirmText })] })] }));
}
