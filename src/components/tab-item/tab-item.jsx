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
      isSeparated: JSON.parse(localStorage.getItem('isSeparated')),
      isPinned: this.props.tab.pinned
    });
  }
  focus(event) {
    const {tab} = this.props;
    chrome.tabs.update(tab.id, {active: true}, () => {
      chrome.windows.update(tab.windowId, {focused: true})
    });
  }
  togglePin = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const {tab} = this.props;
    const {isPinned} = this.state;
    chrome.tabs.update(tab.id, {pinned: !isPinned}, () => {
      this.setState({isPinned: !isPinned});
    });
  }
  render() {
    const {tab, onClose} = this.props;
    const {isPinned} = this.state;

    let enhancement = '';
    if (this.state.isCollapsed && this.state.isSeparated) {
      enhancement = '--separated';
    }
    else if (!this.state.isCollapsed) {
      enhancement = '--expanded';
    }
    const cls = `tabItem${enhancement}`;

    let additionalDetails;
    if (this.state.showUrl === 'true') {
      additionalDetails = <div className={styles.tabUrl}>{tab.url}</div>;
    }
    if (!tab.favIconUrl || tab.favIconUrl.indexOf('chrome://') === 0) {
      tab.favIconUrl = '../img/empty.svg';
    }
    const pinClasses = `${styles.pin} ${isPinned ? styles['pin--active'] : ''}`;
    return (
      <li className={tab.selected ? activeStyles[cls] : styles[cls]} onClick={this.focus.bind(this)}>
        <img src={tab.favIconUrl}></img>
        <div className={styles.tabDetails}>
          <div className={styles.tabTitle}>{tab.title}</div>
          {additionalDetails}
        </div>
        <span className={styles.actions}>
          <button className={styles.plainButton} onClick={this.togglePin}>
            <svg className={pinClasses} viewBox="0 0 24 24">
              <path d="M9 6v1h.5v5L8 13v2h3.5v4h1v-4H16v-2l-1.5-1V7h.5V6H9z" />
            </svg>
          </button>
          <button className={styles.plainButton} onClick={onClose.bind(null, tab)}>
            <svg className={styles.closeButton} viewBox="0 0 24 24" height="24" width="24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </span>
      </li>
    );
  }
}
