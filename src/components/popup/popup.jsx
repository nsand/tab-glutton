import React from 'react';
import TabItem from '../tab-item/tab-item.jsx';
import styles from './popup.scss';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windows: []
    };
  }
  componentDidMount() {
    // TODO Do not rely on this to populate the UI; use redux
    chrome.windows.getAll({populate: true}, (windows) => {
      this.setState({windows: windows});
    });
  }
  render() {
    return (
      <div>
        {
          this.state.windows.map($window =>
            <section>
              <header className={styles.heading}>
                <h2 className={styles.headingText}>{$window.tabs.length} tabs</h2>
              </header>
              <ul className={styles.tabList}>
                {
                  $window.tabs.map(tab => <TabItem key={tab.id} tab={tab}></TabItem>)
                }
              </ul>
            </section>
          )
        }
      </div>
    );
  }
}
