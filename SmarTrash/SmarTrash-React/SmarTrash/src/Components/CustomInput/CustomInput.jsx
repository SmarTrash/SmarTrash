import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import COLORS from '../../Consts/colors'
import { MaterialIcons } from '@expo/vector-icons';

const CustomInput = ({
  label,
  iconName,
  error,
  password,defaultValue,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{marginBottom: 5}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.green
              : COLORS.light,
            alignItems: 'center',
          },
        ]}>
        <MaterialIcons
          name={iconName}
          style={{color: COLORS.grey, fontSize: 22, marginRight: 10}}
        />
        <TextInput
       
        defaultValue={defaultValue}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{color:COLORS.grey, flex: 1}}
          {...props}
        />
        {password && (
          <MaterialIcons
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'visibility-off' : 'remove-red-eye'}
            style={{color: COLORS.grey, fontSize: 22,marginLeft:5}}
          />
        )}
      </View>
      {error && (
        <Text style={{ color: COLORS.red, fontSize: 14}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 15,
   
  },
});

export default CustomInput;