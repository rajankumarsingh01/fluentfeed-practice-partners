import apiClient from "./client";
import type {
  ApiResponse,
  Connection,
  ConnectionStatus,
  Match,
  ProfileFormData,
  User,
} from "../types";

// ---- Profile ----
export const createProfile = (data: ProfileFormData) =>
  apiClient.post<ApiResponse<User>>("/profile", data).then((res) => res.data);

export const getProfile = (userId: string) =>
  apiClient
    .get<ApiResponse<User>>("/profile", { params: { userId } })
    .then((res) => res.data);

export const updateProfile = (userId: string, data: Partial<ProfileFormData>) =>
  apiClient
    .put<ApiResponse<User>>("/profile", data, { params: { userId } })
    .then((res) => res.data);

// ---- Matches & Users ----
export const getMatches = (userId: string) =>
  apiClient
    .get<ApiResponse<Match[]>>("/matches", { params: { userId } })
    .then((res) => res.data);

export interface UserFilters {
  englishLevel?: string;
  learningGoal?: string;
  country?: string;
  userId?: string;
}

export const getUsers = (filters: UserFilters = {}) =>
  apiClient.get<ApiResponse<User[]>>("/users", { params: filters }).then((res) => res.data);

// ---- Connections ----
export const sendConnectionRequest = (senderId: string, receiverId: string) =>
  apiClient
    .post<ApiResponse<Connection>>("/connections", { senderId, receiverId })
    .then((res) => res.data);

export const getConnections = (userId: string, type?: "incoming" | "sent" | "connected") =>
  apiClient
    .get<ApiResponse<Connection[]>>("/connections", { params: { userId, type } })
    .then((res) => res.data);

export const updateConnectionStatus = (id: string, status: ConnectionStatus) =>
  apiClient
    .put<ApiResponse<Connection>>(`/connections/${id}`, { status })
    .then((res) => res.data);