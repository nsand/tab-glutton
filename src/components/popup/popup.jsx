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
    // TODO Do not rely on this to populate the UI; use redux
    chrome.windows.getAll({populate: true}, (windows) => {
      this.setState({windows: windows});
    });
  }
  filter(event) {
    this.setState({filter: event.target.value});
  }
  render() {
    const {filter, windows} = this.state;
    return (
      <div>
        <nav className={styles.navigation}>
          <div>
            <input className={styles.filter} type="text" placeholder="Search" onChange={this.filter.bind(this)}/>
          </div>
        </nav>
        <main className={styles.main}>
          {
            windows.map($window =>
              <section key={$window.id}>
                <header className={styles.heading}>
                  <h2 className={styles.headingText}>{$window.tabs.length} tabs</h2>
                </header>
                <ul className={styles.tabList}>
                  {
                    $window.tabs
                      .filter(tab => filter.trim().length === 0 || tab.title.indexOf(filter) >= 0 || tab.url.indexOf(filter) >= 0)
                      .map(tab => <TabItem key={tab.id} tab={tab}></TabItem>)
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
