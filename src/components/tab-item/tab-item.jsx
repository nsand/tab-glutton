import React from 'react';
import styles from './tab-item.scss';
import activeStyles from './tab-item-active.scss';

export default class TabItem extends React.Component {
  focus(event) {
    const {tab} = this.props;
    chrome.tabs.update(tab.id, {active: true}, () => {
      chrome.windows.update(tab.windowId, {focused: true})
    });
  }
  render() {
    const {tab, onClose} = this.props;
    return (
      <li className={tab.selected ? activeStyles.tabItem : styles.tabItem} onClick={this.focus.bind(this)}>
        <img src={tab.favIconUrl || (tab.favIconUrl === 'chrome://newtab/' ? 'img/chromium_logo.png' : 'img/defaultIcon.png')}></img>
        <span className={styles.tabTitle}>{tab.title}</span>
        <span className={styles.close} onClick={onClose.bind(null, tab)}>×</span>
      </li>
    );
  }
}
