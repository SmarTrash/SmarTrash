import React from 'react';
import {
  useWindowDimensions,
  View,
  Text,
  StyleSheet
} from 'react-native';
import LottieView from 'lottie-react-native';
const LoginLoader = ({ visible = false }) => {
  const { width, height } = useWindowDimensions();

  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <View style={style.loader}>
          <LottieView style={{ marginTop: 100, width: 20, aspectRatio: 300 / 300, flexGrow: 1, alignSelf: 'center' }}
            resizeMode="cover"
            source={require('../../../assets/LoginLoader.json')}
            autoPlay
          />
          <View style={style.brandView}>
            <Text style={style.brandViewText}>SmarTrash</Text>
          </View>
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  loader: {
    height: '120%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',

  },
  brandView: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  brandViewText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase'
  },
});

export default LoginLoader;