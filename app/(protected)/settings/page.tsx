import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      {/* info about the session if logged in or not  */}
      {JSON.stringify(session)}
      {/* sign out */}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Sign Out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
