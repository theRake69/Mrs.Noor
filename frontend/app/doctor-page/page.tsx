import AuthProvider from "@/lib/auth/authProvider";

const DoctorPge = () => {
  return (
    <AuthProvider roles={["doc"]}>
      <div>Doctor page</div>
    </AuthProvider>
  );
};

export default DoctorPge;
