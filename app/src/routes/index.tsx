import Container from "@/components/container";
import PageNavbar from "@/components/pageNavbar";

function App() {
  return (
    <PageNavbar title="Inbox" border={false}>
      <Container className="pt-0">
        <h1>hello ✨</h1>
      </Container>
    </PageNavbar>
  );
}

export default App;
