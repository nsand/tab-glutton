import React from 'react';
import TabItem from '../tab-item/tab-item.jsx';
import styles from './popup.scss';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windows: [],
      filter: ''
    };
  }
  componentDidMount() {
    chrome.windows.getAll({populate: true}, (windows) => {
      this.setState({windows: windows});
    });
    this.refs.filter.focus();
  }
  filter(event) {
    this.setState({filter: event.target.value});
  }
  closeTab(tab, event) {
    // Don't close the window when closing tabs
    event.stopPropagation();

    // Close the tab and refresh the list of windows
    chrome.tabs.remove(tab.id, () => {
      const windows = this.state.windows.reduce((windows, $window) => {
        $window.tabs = $window.tabs.filter($tab => $tab.id !== tab.id);
        if ($window.tabs.length > 0) {
          // Add the window back only if it has some tabs
          windows.push($window);
        }
        return windows;
      }, []);
      this.setState({windows});
    });
  }
  render() {
    const {filter, windows} = this.state;
    return (
      <div>
        <nav className={styles.navigation}>
          <div>
            <input className={styles.filter} ref="filter" type="text" placeholder="Search" onChange={this.filter.bind(this)}/>
          </div>
        </nav>
        <main className={styles.main}>
          {
            windows.map($window =>
              <section className={styles.window} key={$window.id}>
                <header className={styles.heading}>
                  <h2 className={styles.headingText}>{$window.tabs.length} tabs</h2>
                </header>
                <ul className={styles.tabList}>
                  {
                    $window.tabs
                      .filter(tab => filter.trim().length === 0 || tab.title.indexOf(filter) >= 0 || tab.url.indexOf(filter) >= 0)
                      .map(tab => <TabItem key={tab.id} tab={tab} onClose={this.closeTab.bind(this)}></TabItem>)
                  }
                </ul>
              </section>
            )
          }
        </main>
      </div>
    );
  }
}
