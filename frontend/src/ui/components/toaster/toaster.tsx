import { Toaster as ReactToaster, ToastBar } from "react-hot-toast";

import { components } from "./toaster.styles";

export const Toaster: React.FC = () => {
  return (
    <ReactToaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "none",
          boxShadow: "none",
          padding: 0,
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <components.container type={t.type}>
              {icon}
              <div>{message}</div>
            </components.container>
          )}
        </ToastBar>
      )}
    </ReactToaster>
  );
};
