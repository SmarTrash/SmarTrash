import { View, Text } from 'react-native'
import React from 'react'
import CustonButton from '../CustomButton/CustonButton'

const SocialSignInButtons = () => {

  const onSignInFacebookPressed = () => {
    console.warn("facebook");
  }

  const onSignInGooglePressed = () => {
    console.warn("google");
  }

  return (
    <>
      <CustonButton
        text="Sign in with Facebook"
        onPress={onSignInFacebookPressed}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      />

      <CustonButton
        text="Sign in with Google"
        onPress={onSignInGooglePressed}
        bgColor="#E7EAF4"
        fgColor="#DD4D44"
      />
    </>
  )
}

export default SocialSignInButtons