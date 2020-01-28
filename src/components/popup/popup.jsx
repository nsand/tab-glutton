import React from 'react';
import TabItem from '../tab-item/tab-item.jsx';
import styles from './popup.scss';
import { Navigation, Filter } from './style.js';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windows: [],
      filter: '',
      mru: {}
    };
  }
  componentDidMount() {
    chrome.runtime.sendMessage({action: 'mru'}, (mru) => {
      // Update the state with the most-recently used windows
      this.setState({mru});
    });
    chrome.windows.getAll({populate: true}, (windows) => {
      this.setState({windows: windows});
    });
    this.setState({isSeparated: JSON.parse(localStorage.getItem('isSeparated'))});
    this.refs.filter.focus();
  }
  filter(event) {
    this.setState({filter: event.target.value.trim().toLocaleLowerCase()});
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
    const {filter, windows, mru} = this.state;
    const cls = this.state.isSeparated ? '' : styles.window;
    return (
      <div>
        <Navigation>
          <div>
            <Filter ref="filter" type="text" placeholder="Search" onChange={this.filter.bind(this)}/>
          </div>
        </Navigation>
        <main className={styles.main}>
          {
            windows.sort((left, right) => {
              // Compare the timestamps, if they exist, from the mru state
              const comp = (mru[right.id] || 0) - (mru[left.id] || 0);
              if (comp === 0) {
                // If there's no data, go off the focused field of the left item
                return left.focused ? -1 : (right.id - left.id);
              }
              return comp;
            }).map($window =>
              <section className={cls} key={$window.id}>
                <header className={styles.heading}>
                  <h2 className={styles.headingText}>{$window.tabs.length} tabs</h2>
                </header>
                <ul className={styles.tabList}>
                  {
                    $window.tabs
                      .filter(tab => filter.length === 0 || tab.title.toLocaleLowerCase().indexOf(filter) >= 0 || tab.url.toLocaleLowerCase().indexOf(filter) >= 0)
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
