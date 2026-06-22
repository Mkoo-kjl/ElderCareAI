import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { api } from "../lib/api";
import type {
  RegisterRequest,
  AuthResponse,
  ApiResponse,
} from "@eldercare/shared";

/** POST /api/auth/register */
async function registerUser(
  data: RegisterRequest,
): Promise<ApiResponse<AuthResponse>> {
  const response = await api.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    data,
  );
  return response.data;
}

/** POST /api/auth/login */
async function loginUser(data: {
  email: string;
  password: string;
}): Promise<ApiResponse<AuthResponse>> {
  const response = await api.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    data,
  );
  return response.data;
}

export default function WelcomeScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ─── Register Mutation ───────────────────────────────────
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {
      try {
        await SecureStore.setItemAsync("auth_token", data.data.token);
      } catch {
        // SecureStore may fail on web
      }
      Alert.alert("Welcome! 🎉", `Account created for ${data.data.user.name}`);
      resetForm();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ?? "Registration failed. Try again.";
      Alert.alert("Error", message);
    },
  });

  // ─── Login Mutation ──────────────────────────────────────
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      try {
        await SecureStore.setItemAsync("auth_token", data.data.token);
      } catch {
        // SecureStore may fail on web
      }
      Alert.alert("Welcome back! 👋", `Hello, ${data.data.user.name}`);
      resetForm();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ?? "Login failed. Check your credentials.";
      Alert.alert("Error", message);
    },
  });

  const isLoading = registerMutation.isPending || loginMutation.isPending;

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
  }

  function handleSubmit() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Validation", "Please fill in all required fields.");
      return;
    }

    if (isLogin) {
      loginMutation.mutate({ email: email.trim(), password });
    } else {
      if (!name.trim()) {
        Alert.alert("Validation", "Please enter your name.");
        return;
      }
      registerMutation.mutate({
        email: email.trim(),
        password,
        name: name.trim(),
      });
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-surface"
    >
      <View className="flex-1 justify-center px-6">
        {/* ─── Header ──────────────────────────────────── */}
        <View className="items-center mb-10">
          <View className="w-20 h-20 rounded-3xl bg-brand-600 items-center justify-center mb-4 shadow-lg">
            <Text className="text-4xl">🏥</Text>
          </View>
          <Text className="text-3xl font-bold text-white tracking-tight">
            ElderCare AI
          </Text>
          <Text className="text-base text-slate-400 mt-2">
            Compassionate care, powered by intelligence
          </Text>
        </View>

        {/* ─── Card ────────────────────────────────────── */}
        <View className="bg-surface-light rounded-3xl p-6 shadow-xl">
          {/* Toggle Tabs */}
          <View className="flex-row bg-surface rounded-2xl p-1 mb-6">
            <Pressable
              onPress={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl items-center ${
                isLogin ? "bg-brand-600" : ""
              }`}
            >
              <Text
                className={`font-semibold text-sm ${
                  isLogin ? "text-white" : "text-slate-400"
                }`}
              >
                Sign In
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl items-center ${
                !isLogin ? "bg-brand-600" : ""
              }`}
            >
              <Text
                className={`font-semibold text-sm ${
                  !isLogin ? "text-white" : "text-slate-400"
                }`}
              >
                Sign Up
              </Text>
            </Pressable>
          </View>

          {/* Name Input (Register only) */}
          {!isLogin && (
            <View className="mb-4">
              <Text className="text-slate-400 text-xs font-medium mb-2 ml-1">
                FULL NAME
              </Text>
              <TextInput
                className="bg-surface rounded-xl px-4 py-3.5 text-white text-base"
                placeholder="Enter your name"
                placeholderTextColor="#64748B"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                editable={!isLoading}
              />
            </View>
          )}

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-slate-400 text-xs font-medium mb-2 ml-1">
              EMAIL ADDRESS
            </Text>
            <TextInput
              className="bg-surface rounded-xl px-4 py-3.5 text-white text-base"
              placeholder="you@example.com"
              placeholderTextColor="#64748B"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-slate-400 text-xs font-medium mb-2 ml-1">
              PASSWORD
            </Text>
            <TextInput
              className="bg-surface rounded-xl px-4 py-3.5 text-white text-base"
              placeholder="Min. 8 characters"
              placeholderTextColor="#64748B"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />
          </View>

          {/* Submit Button */}
          <Pressable
            onPress={handleSubmit}
            disabled={isLoading}
            className={`rounded-xl py-4 items-center ${
              isLoading ? "bg-brand-800 opacity-70" : "bg-brand-600 active:bg-brand-700"
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white font-bold text-base">
                {isLogin ? "Sign In" : "Create Account"}
              </Text>
            )}
          </Pressable>

          {/* Footer */}
          <Pressable
            onPress={() => setIsLogin(!isLogin)}
            className="mt-5 items-center"
          >
            <Text className="text-slate-400 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Text className="text-brand-400 font-semibold">
                {isLogin ? "Sign Up" : "Sign In"}
              </Text>
            </Text>
          </Pressable>
        </View>

        {/* ─── Version ─────────────────────────────────── */}
        <Text className="text-center text-slate-600 text-xs mt-8">
          v1.0.0 • ElderCare AI
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
