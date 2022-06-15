import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'; 
import COLORS from '../../Consts/colors';

const CoinIcon = () => {
  return (
  
      <FontAwesome5 name="coins" size={22} color={COLORS.gold} //margin={30}  
      />

  )
}

export default CoinIcon