import React, { useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useToast } from "../utils/custom_hooks/useToast";
import { ToastMessage } from "../utils/types";

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  const showToast = useToast();

  return (
    <AppContext.Provider
      value={{
        showToast,
        isLoggedIn: !isError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
