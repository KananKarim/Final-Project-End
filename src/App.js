import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import InfoPage from "./pages/InfoPage/InfoPage";
import MainPage from "./pages/MainPage/MainPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import store from "./redux/reducer/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/:id" element={<InfoPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App; 