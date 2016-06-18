import React from 'react';
import styles from './tab-item.scss';

export default class TabItem extends React.Component {
  close() {
    console.log(`Closing ${this.props.tab.title}`);
  }
  render() {
    return (
      <li className={styles.tabItem}>
        <img src={this.props.tab.favIconUrl || (this.props.tab.favIconUrl === 'chrome://newtab/' ? 'img/chromium_logo.png' : 'img/defaultIcon.png')}></img>
        <span className="label">{this.props.tab.title}</span>
        <span className={styles.close} onClick={this.close.bind(this)}>&times;</span>
      </li>
    );
  }
}
