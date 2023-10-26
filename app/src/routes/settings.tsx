import PageNavbar from "@/components/pageNavbar";
import Account from "@/components/settings/account";
import Appearance from "@/components/settings/appearance";

const Settings = () => {
  return (
    <>
      <PageNavbar title="Settings" border={true} />
      <main className="container mx-auto flex flex-col space-y-8 px-6 pb-8 pt-6">
        <Account />
        <Appearance />
      </main>
    </>
  );
};

export default Settings;
