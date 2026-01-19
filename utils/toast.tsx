import LottieView from 'lottie-react-native';
import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

const animations = {
  success: require('../assets/images/success.json'),
  error: require('../assets/images/error.json'),
  info: require('../assets/images/warning.json'),
};

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 0,
        backgroundColor: '#1A1A1A',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      }}
      contentContainerStyle={{ paddingHorizontal: 0 }}
      text1Style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}
      text2Style={{ fontSize: 14, color: '#e5e7eb', marginTop: 2 }}
      renderLeadingIcon={() => (
        <LottieView
          source={animations.success}
          autoPlay
          loop={false}
          style={{ width: 40, height: 40 }}
        />
      )}
      renderTrailingIcon={() => null}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftWidth: 0,
        backgroundColor: '#1A1A1A',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      }}
      text1Style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}
      text2Style={{ fontSize: 14, color: '#e5e7eb', marginTop: 2 }}
      renderLeadingIcon={() => (
        <LottieView
          source={animations.error}
          autoPlay
          loop={false}
          style={{ width: 40, height: 40 }}
        />
      )}
      renderTrailingIcon={() => null}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 0,
        backgroundColor: '#1A1A1A',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      }}
      text1Style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}
      text2Style={{ fontSize: 14, color: '#e5e7eb', marginTop: 2 }}
      renderLeadingIcon={() => (
        <LottieView
          source={animations.info}
          autoPlay
          loop={false}
          style={{ width: 40, height: 40 }}
        />
      )}
      renderTrailingIcon={() => null}
    />
  ),
};

class ToastMessage {
  static show(type: ToastType, title: string, message?: string) {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 50,
    });
  }

  static success(title: string, message?: string) {
    this.show('success', title, message);
  }

  static error(title: string, message?: string) {
    this.show('error', title, message);
  }

  static info(title: string, message?: string) {
    this.show('info', title, message);
  }

  static config = toastConfig;
}

export default ToastMessage;
