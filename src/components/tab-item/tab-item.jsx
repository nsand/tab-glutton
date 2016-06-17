import React from 'react';

export default class TabItem extends React.Component {
  close() {
    console.log(`Closing ${this.props.tab.title}`);
  }
  render() {
    return (
      <li class="tab-item">
        <img src={this.props.tab.favIconUrl || (this.props.tab.favIconUrl === 'chrome://newtab/' ? 'img/chromium_logo.png' : 'img/defaultIcon.png')}></img>
        <span class="label">{this.props.tab.title}</span>
        <span onClick={this.close.bind(this)}>&times;</span>
      </li>
    );
  }
}
