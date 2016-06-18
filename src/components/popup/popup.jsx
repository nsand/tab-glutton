import React from 'react';
import TabItem from '../tab-item/tab-item.jsx';
import styles from './popup.scss';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: []
    };
  }
  componentDidMount() {
    // TODO Do not rely on this to populate the UI; use redux
    chrome.windows.getAll({populate: true}, (windows) => {
      console.log(windows[0]);
      this.setState({tabs: windows[0].tabs});
    });
  }
  render() {
    return (
      <section>
        <header className={styles.heading}>
          <h2 className={styles.headingText}>{this.state.tabs.length} tabs</h2>
        </header>
        <ul className={styles.tabList}>
          {
            this.state.tabs.map(tab => <TabItem key={tab.id} tab={tab}></TabItem>)
          }
        </ul>
      </section>
    );
  }
}
