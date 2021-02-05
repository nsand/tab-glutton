import React from 'react';

import themes, { DEFAULT_THEME } from '../../themes';

export default class Options extends React.Component {
  constructor(props) {
    super(props);
    const showURL = window.localStorage.getItem('showURL');
    const isCollapsed = window.localStorage.getItem('isCollapsed');
    const isSeparated = window.localStorage.getItem('isSeparated');
    this.state = {
      showUrl: JSON.parse(showURL),
      isSeparated: JSON.parse(isSeparated),
      isCollapsed: isCollapsed === null ? true : JSON.parse(isCollapsed),
      theme: window.localStorage.getItem('theme') || DEFAULT_THEME
    };
    this.changeTheme = this.changeTheme.bind(this);
    this.changeShowUrl = this.changeShowUrl.bind(this);
    this.changeSeparated = this.changeSeparated.bind(this);
    this.changeDense = this.changeDense.bind(this);
  }
  changeTheme(event) {
    const theme = event.target.value;
    this.setState({ theme });
    window.localStorage.setItem('theme', theme);
  }
  changeShowUrl(event) {
    const showUrl = event.target.checked;
    this.setState({ showUrl });
    window.localStorage.showURL = showUrl;
  }
  changeDense(event){
    const isCollapsed = event.target.checked;
    this.setState({ isCollapsed, isSeparated: !isCollapsed ? false : this.state.isSeparated });
    window.localStorage.removeItem('isSeparated');
		window.localStorage.isCollapsed = isCollapsed;
  }
  changeSeparated(event) {
    const isSeparated = event.target.checked;
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
                  <input
                    type="checkbox"
                    id="collapse"
                    checked={this.state.isCollapsed}
                    onChange={this.changeDense}
                  />
                  <label className="label" for="collapse">
                    Dense tab list
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
                        disabled={!this.state.isCollapsed}
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
                <div className="theme-wrapper">
                  <label>
                    Choose theme
                  </label>
                  <br />
                  <select
                    value={this.state.theme}
                    name="theme"
                    id="theme"
                    onChange={this.changeTheme}
                    className="theme-select"
                  >
                    {Object.keys(themes).map(theme => (
                      <option value={theme} selected={this.state.theme === theme}>
                        {theme}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
            </ul>
          </section>
        </main>
      </div>
    );
  }
}
