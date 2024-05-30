import AuthProvider from "@/lib/auth/authProvider";

const Dashboard = () => {
  return <div>Dashboard</div>;
};
const DashboardPage = () => {
  return (
    <AuthProvider roles={["ADMIn"]}>
      <Dashboard />
    </AuthProvider>
  );
};
export default DashboardPage;
