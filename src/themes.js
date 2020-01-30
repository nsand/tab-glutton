export const DEFAULT_THEME = 'light';

export default {
  light: {
    navigation: '#009688',
    placeholder: 'rgba(255, 255, 255, 0.8)',
    main: '#ffffff',
    tab: {
      title: '#212121',
      link: '#9e9e9e',
      background: '#ffffff',
      hover: 'rgba(0, 0, 0, 0.02)',
      separator: '#ddd',
      audioIcon: '#9e9e9e',
      active: '#4DB6AC'
    }
  },
  dark: {
    navigation: '#1e1e1e',
    placeholder: 'rgba(255, 255, 255, 0.4)',
    main: '#202124',
    tab: {
      title: '#e8eaed',
      link: '#9aa0a6',
      background: '#282a2d',
      hover: 'rgba(255, 255, 255, 0.1)',
      separator: 'red',
      audioIcon: '#9e9e9e',
      active: '#9aa0a6'
    }
  }
};