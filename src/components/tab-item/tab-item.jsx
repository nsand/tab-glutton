import React from 'react';
import styles from './tab-item.scss';

export default class TabItem extends React.Component {
  close() {
    chrome.tabs.remove(this.props.tab.id);
    console.log(`Closing ${this.props.tab.title}`);
  }
  focus() {
    chrome.tabs.update(this.props.tab.id, {active: true}, () => {
      chrome.windows.update(this.props.tab.windowId, {focused: true})
    });
  }
  render() {
    return (
      <li className={styles.tabItem} onClick={this.focus.bind(this)}>
        <img src={this.props.tab.favIconUrl || (this.props.tab.favIconUrl === 'chrome://newtab/' ? 'img/chromium_logo.png' : 'img/defaultIcon.png')}></img>
        <span className={styles.tabTitle}>{this.props.tab.title}</span>
        <span className={styles.close} onClick={this.close.bind(this)}>×</span>
      </li>
    );
  }
}
