import React from 'react';
import styles from './tab-item.scss';
import activeStyles from './tab-item-active.scss';

export default class TabItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let isCollapsed = JSON.parse(localStorage.getItem('isCollapsed'));
    if (isCollapsed === null) {
      isCollapsed = true;
    }

    this.setState({
      showUrl: localStorage['showURL'],
      isCollapsed,
      isSeparated: JSON.parse(localStorage.getItem('isSeparated'))
    });
  }
  focus(event) {
    const {tab} = this.props;
    chrome.tabs.update(tab.id, {active: true}, () => {
      chrome.windows.update(tab.windowId, {focused: true})
    });
  }
  render() {
    const {tab, onClose} = this.props;
    let enhancement = '';
    if (this.state.isCollapsed && this.state.isSeparated) {
      enhancement = '--separated';
    }
    else if (!this.state.isCollapsed) {
      enhancement = '--expanded';
    }
    const cls = `tabItem${enhancement}`;
    console.log(cls)
    let additionalDetails;
    if (this.state.showUrl === 'true') {
      additionalDetails = <div className={styles.tabUrl}>{tab.url}</div>;
    }
    if (!tab.favIconUrl || tab.favIconUrl.indexOf('chrome://') === 0) {
      tab.favIconUrl = '../img/empty.svg';
    }

    return (
      <li className={tab.selected ? activeStyles[cls] : styles[cls]} onClick={this.focus.bind(this)}>
        <img src={tab.favIconUrl}></img>
        <div className={styles.tabDetails}>
          <div className={styles.tabTitle}>{tab.title}</div>
          {additionalDetails}
        </div>
        <span className={styles.close} onClick={onClose.bind(null, tab)}>×</span>
      </li>
    );
  }
}
