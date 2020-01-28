import React from 'react';

import themes from '../../themes';

export default class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUrl: window.localStorage.showURL,
      isSeparated: window.localStorage.getItem('isSeparated') || 'false',
      isCollapsed: window.localStorage.getItem('isCollapsed') || 'true',
      theme: window.localStorage.getItem('theme') || 'light'
    };
    this.changeTheme = this.changeTheme.bind(this);
    this.changeShowUrl = this.changeShowUrl.bind(this);
    this.changeSeparated = this.changeSeparated.bind(this);
  }
  changeTheme(event) {
    const theme = event.target.value;
    this.setState({ theme });
    window.localStorage.setItem('theme', theme);
  }
  changeShowUrl(event) {
    const showUrl = event.target.checked ? 'true' : 'false';
    this.setState({ showUrl });
    window.localStorage.showURL = showUrl;
  }
  changeSeparated(event) {
    const isSeparated = event.targed.checked ? 'true' : 'false';
    this.setState({ isSeparated });
    window.localStorage.setItem('isSeparated', isSeparated);
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <nav className="navigation">
          <img src="../img/tab_glutton_48.png" className="brand" />
          <h1>Tab Glutton</h1>
        </nav>
        <main className="main">
          <section>
            <header className="heading">
              <h2 className="headingText">Display</h2>
            </header>
            <ul className="options">
              <li>
                <div>
                  <input
                    type="checkbox"
                    id="showURL"
                    checked={this.state.showUrl}
                    onChange={this.changeShowUrl}
                  />
                  <label className="label" for="showURL">
                    Show tab URL
                  </label>
                </div>
                <div className="optionTip">
                  Shows the URL of the tab in addition to its title
                </div>
              </li>
              <li>
                <div>
                  <input type="checkbox" id="collapse" />
                  <label className="label" for="collapse">
                    Dense tab list (does it work after styled-components
                    migration?)
                  </label>
                </div>
                <div className="optionTip">
                  List tabs without a lot of space in between them
                </div>
                <ul className="options">
                  <li>
                    <div>
                      <input
                        type="checkbox"
                        id="separate"
                        checked={this.state.isSeparated}
                        onChange={this.changeSeparated}
                      />
                      <label className="label" for="separate">
                        Show separators
                      </label>
                    </div>
                    <div className="optionTip">
                      Shows separators between each tab in the list
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <select
                  value={this.state.theme}
                  name="select"
                  onChange={this.changeTheme}
                >
                  {Object.keys(themes).map(theme => (
                    <option value={theme} selected={this.state.theme === theme}>
                      {theme}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          </section>
        </main>
      </div>
    );
  }
}
