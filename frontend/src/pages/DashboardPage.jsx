import { useSelector } from "react-redux";
import DashboardContent from "../components/DashboardContent";

// Simple Auth Guard component
function AuthGuard({ children, requireAuth = true }) {
  const { user } = useSelector((state) => state.user);

  if (requireAuth && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to view your dashboard.</p>
          <a
            href="/auth/login"
            className="inline-flex items-center px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return children;
}

export default function DashboardPage() {
  return (
    <AuthGuard requireAuth={true}>
      <DashboardContent />
    </AuthGuard>
  );
}
