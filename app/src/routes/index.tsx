import Container from "@/components/container";
import PageNavbar from "@/components/pageNavbar";

function App() {
  const greeting = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 12) {
      return "Good morning";
    } else if (hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  return (
    <PageNavbar title="Inbox" border={false}>
      <Container className="pt-0">
        <h1>hello ✨</h1>
      </Container>
    </PageNavbar>
  );
}

export default App;
