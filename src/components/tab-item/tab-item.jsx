import React from 'react';
import styles from './tab-item.scss';
import activeStyles from './tab-item-active.scss';

export default class TabItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.setState({showUrl: localStorage['showURL']})
  }
  focus(event) {
    const {tab} = this.props;
    chrome.tabs.update(tab.id, {active: true}, () => {
      chrome.windows.update(tab.windowId, {focused: true})
    });
  }
  render() {
    const {tab, onClose} = this.props;
    let additionalDetails;
    if (this.state.showUrl === 'true') {
      additionalDetails = <div className={styles.tabText}>{tab.url}</div>;
    }

    return (
      <li className={tab.selected ? activeStyles.tabItem : styles.tabItem} onClick={this.focus.bind(this)}>
        <img src={tab.favIconUrl || (tab.favIconUrl === 'chrome://newtab/' ? 'img/chromium_logo.png' : 'img/defaultIcon.png')}></img>
        <div className={styles.tabDetails}>
          <div className={styles.tabText}>{tab.title}</div>
          {additionalDetails}
        </div>
        <span className={styles.close} onClick={onClose.bind(null, tab)}>×</span>
      </li>
    );
  }
}
