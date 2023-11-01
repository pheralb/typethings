import Container from "@/components/container";
import PageNavbar from "@/components/pageNavbar";
import Account from "@/components/settings/account";
import Appearance from "@/components/settings/appearance";

const Settings = () => {
  return (
    <>
      <PageNavbar title="Settings" border={true} close={true} />
      <Container>
        <Account />
        <Appearance />
      </Container>
    </>
  );
};

export default Settings;
