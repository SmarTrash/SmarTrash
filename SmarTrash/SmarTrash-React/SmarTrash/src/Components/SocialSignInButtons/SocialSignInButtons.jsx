
import React from 'react'
import CustonButton from '../CustomButton/CustonButton'

const SocialSignInButtons = () => {

  const onSignInFacebookPressed = () => {
    console.warn("facebook");
  }

  const onSignInGooglePressed = () => {
  // const config = {iosClientId: '1097573340666-5jete35a7t8scdkl8oqre8k04054icgq.apps.googleusercontent.com'}
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