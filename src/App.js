import React from 'react';
import { Routes, Route } from "react-router-dom";

import Login from "./pages/0_Login";
import MailVerfy from "./pages/0_MailVerify";
import User from "./pages/0_User";

import Home from "./pages/1_Home";
import About from "./pages/2_About";

import PrivacyPolicy from "./pages/91_PrivacyPolicy";
import TermOfService from "./pages/92_TermOfService";
import DataDeletion from "./pages/93_DataDeletion";
import NotFound from "./pages/99_NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { LangProvider } from "./contexts/LangContext";
import MainLayout from "./layouts/MainLayout";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./layouts/Theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LangProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/verify" element={<MailVerfy />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/term-of-service" element={<TermOfService />} />
                        <Route path="/data-deletion" element={<DataDeletion />} />
                        <Route path="*" element={<NotFound />} />

                        <Route element={<MainLayout />}>
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <Home />
                                    </ProtectedRoute>
                                }
                            />         
                            <Route
                                path="/about"
                                element={
                                    <ProtectedRoute>
                                        <About />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/user"
                                element={
                                    <ProtectedRoute>
                                        <User />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>

                    </Routes>
                </AuthProvider>
            </LangProvider>
        </ThemeProvider> 
    );
}

export default App;
