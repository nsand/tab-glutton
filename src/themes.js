export const DEFAULT_THEME = 'Light';

export default {
  Light: {
    navigation: '#009688',
    placeholder: 'rgba(255, 255, 255, 0.8)',
    section: '#ddd',
    main: '#ffffff',
    tab: {
      title: '#212121',
      link: '#9e9e9e',
      background: '#ffffff',
      hover: 'rgba(0, 0, 0, 0.02)',
      separator: '#ddd',
      audioIcon: '#9e9e9e',
      active: '#4DB6AC',
      pinActive: '#009688',
      actionsHover: '#212121'
    }
  },
  Dark: {
    navigation: '#1e1e1e',
    placeholder: 'rgba(255, 255, 255, 0.4)',
    section: 'rgba(255, 255, 255, 0.12)',
    main: '#202124',
    tab: {
      title: '#e8eaed',
      link: '#9aa0a6',
      background: '#282a2d',
      hover: 'rgba(255, 255, 255, 0.1)',
      separator: '#4a4c4f',
      audioIcon: '#9e9e9e',
      active: '#9aa0a6',
      pinActive: '#ffffff',
      actionsHover: '#ffffff'
    }
  }
};