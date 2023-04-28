import 'expo-dev-client';
import './config/design-presets';
import AuthContextProvider from './contexts/auth.context';
import MainStack from './screens';

const App = () => {
  return (
    <AuthContextProvider>
      <MainStack />
    </AuthContextProvider>
  );
};

export default App;
