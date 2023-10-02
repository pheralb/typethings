import ChangeTheme from "@/components/changeTheme";
import PageNavbar from "@/components/pageNavbar";

const Settings = () => {
  return (
    <>
      <PageNavbar title="Settings" border={true} />
      <ChangeTheme />
    </>
  );
};

export default Settings;
