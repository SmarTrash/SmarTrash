import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationPage from './ScreenPages/RegistrationPage';
import SignInPage from './ScreenPages/SignInPage';
import GiftPage from './ScreenPages/GiftPage';
import SelectedGift from './ScreenPages/SelectedGift';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GiftPage">
        <Stack.Screen name="RegistrationPage" component={RegistrationPage} />
        <Stack.Screen name="SignInPage" component={SignInPage} />
        <Stack.Screen name="GiftPage" component={GiftPage} />
        <Stack.Screen name="SelectedGift" component={SelectedGift} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

