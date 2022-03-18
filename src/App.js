import RoutesContainer from "./containers/Routes";
import ModalContainer from "./containers/Modals/ModalContainer";
import Providers from "./context/Providers";

function App() {
  return (
    <Providers>
      <RoutesContainer />
      <ModalContainer />
    </Providers>
  );
}

export default App;
