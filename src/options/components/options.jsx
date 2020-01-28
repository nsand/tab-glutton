import React from 'react';

import themes from '../../themes';

export default class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUrl: window.localStorage.showURL,
      isSeparated: window.localStorage.getItem('isSeparated'),
      isCollapsed: window.localStorage.getItem('isCollapsed') || 'true',
      theme: window.localStorage.getItem('theme') || 'light'
    };
  }
  changeTheme(event) {
    this.setState({theme: event.target.value});
    window.localStorage.setItem('theme', event.target.value);
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
                  <input type="checkbox" id="showURL" />
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
                    Dense tab list
                  </label>
                </div>
                <div className="optionTip">
                  List tabs without a lot of space in between them
                </div>
                <ul className="options">
                  <li>
                    <div>
                      <input type="checkbox" id="separate" />
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
                <select value={this.state.theme} name="select" onChange={this.changeTheme}>
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
