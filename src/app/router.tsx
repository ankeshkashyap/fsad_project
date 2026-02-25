import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MainLayout } from "../components/layout/MainLayout";
import { LandingPage } from "../features/dashboard/LandingPage";
import { LoginPage } from "../features/auth/LoginPage";
import { RegisterPage } from "../features/auth/RegisterPage";
import { UserDashboard } from "../features/dashboard/UserDashboard";
import { LessonsListPage } from "../features/lessons/LessonsListPage";
import { LessonDetailPage } from "../features/lessons/LessonDetailPage";
import { ProjectsPage } from "../features/projects/ProjectsPage";
import { ResourcesPage } from "../features/resources/ResourcesPage";
import { ProgressPage } from "../features/dashboard/ProgressPage";
import { AdminDashboardPage } from "../features/admin/AdminDashboardPage";
import { AdminLessonsPage } from "../features/admin/AdminLessonsPage";
import { AdminProjectsPage } from "../features/admin/AdminProjectsPage";
import { AdminResourcesPage } from "../features/admin/AdminResourcesPage";
import { ErrorBoundary } from "../components/shared/ErrorBoundary";

type ProtectedRouteProps = {
  children: React.ReactElement;
  requireAdmin?: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  if (!requireAdmin && user.role === "admin") {
    // Admins should access admin area, not student dashboard routes
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export const AppRouter: React.FC = () => {
  return (
    <ErrorBoundary>
      <MainLayout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Student */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lessons"
            element={
              <ProtectedRoute>
                <LessonsListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lessons/:id"
            element={
              <ProtectedRoute>
                <LessonDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <ResourcesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <ProgressPage />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/lessons"
            element={
              <ProtectedRoute requireAdmin>
                <AdminLessonsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute requireAdmin>
                <AdminProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/resources"
            element={
              <ProtectedRoute requireAdmin>
                <AdminResourcesPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </ErrorBoundary>
  );
};

