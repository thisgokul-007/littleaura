import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ChildProvider } from './context/ChildContext';
import { NotificationProvider } from './context/NotificationContext';

import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { ErrorBoundary } from './components/common/ErrorBoundary';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChildProfilePage } from './pages/ChildProfilePage';
import { GrowthTrackerPage } from './pages/GrowthTrackerPage';
import { MedicalReportsPage } from './pages/MedicalReportsPage';
import { DailyCarePage } from './pages/DailyCarePage';
import { EssentialsPage } from './pages/EssentialsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { PhotoInsightPage } from './pages/PhotoInsightPage';
import { LearningHubPage } from './pages/LearningHubPage';
import { TimelinePage } from './pages/TimelinePage';
import { CalendarPage } from './pages/CalendarPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ChildProvider>
            <NotificationProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public & Authentication Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/onboarding" element={<OnboardingPage />} />

                  {/* Authenticated Protected Application Routes (Wrapped in ProtectedRoute and AppLayout) */}
                  <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/child" element={<ChildProfilePage />} />
                      <Route path="/growth" element={<GrowthTrackerPage />} />
                      <Route path="/medical" element={<MedicalReportsPage />} />
                      <Route path="/daily-care" element={<DailyCarePage />} />
                      <Route path="/essentials" element={<EssentialsPage />} />
                      <Route path="/ai-assistant" element={<AIAssistantPage />} />
                      <Route path="/photo-insight" element={<PhotoInsightPage />} />
                      <Route path="/learning" element={<LearningHubPage />} />
                      <Route path="/timeline" element={<TimelinePage />} />
                      <Route path="/calendar" element={<CalendarPage />} />
                      <Route path="/notifications" element={<NotificationsPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                    </Route>
                  </Route>

                  {/* Catch-all 404 Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </NotificationProvider>
          </ChildProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
