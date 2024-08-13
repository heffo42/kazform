import 'react-microsoft-login';

declare module 'react-microsoft-login' {
  interface MicrosoftLoginProps {
    children?: React.ReactNode;  // Make children optional
  }
}