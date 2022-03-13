import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationPage from './ScreenPages/RegistrationPage';
import SignInPage from './ScreenPages/SignInPage';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistrationPage">
        <Stack.Screen name="RegistrationPage" component={RegistrationPage} />
        <Stack.Screen name="SignInPage" component={SignInPage} />
    
      </Stack.Navigator>
    </NavigationContainer>
  );
}

