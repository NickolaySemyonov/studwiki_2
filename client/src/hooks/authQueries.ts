// src/hooks/authQueries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkAuth, login, register, logout } from "../services/AuthService";

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: checkAuth
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(['auth'], user);
    },
  });
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      queryClient.setQueryData(['auth'], user);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['auth'], null);
      queryClient.clear(); // Optional: clear all queries on logout
    },
  });
};