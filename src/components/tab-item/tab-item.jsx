import React from 'react';

import { 
  Item,
  Title,
  Details,
  URL,
  Favicon,
  Audible,
  Actions,
  Pin,
  Close,
  PlainButton
} from './style';

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
      additionalDetails = <URL>{tab.url}</URL>;
    }
    if (!tab.favIconUrl || tab.favIconUrl.indexOf('chrome://') === 0) {
      tab.favIconUrl = '../img/empty.svg';
    }
    const pinClasses = `${isPinned ? 'pin--active' : ''}`;
    return (
      <Item className={`${tab.selected ? `${cls} tabItem--active`  : cls} ${isPinned ? 'tabItem--pinned' : ''}`} onClick={this.focus.bind(this)}>
        <Favicon>
          <img src={tab.favIconUrl}></img>
          { tab.audible && 
            <Audible viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </Audible>
          }
        </Favicon>
        <Details>
          <Title>{tab.title}</Title>
          {additionalDetails}
        </Details>
        <Actions>
          <PlainButton onClick={this.togglePin}>
            <Pin className={pinClasses} viewBox="0 0 24 24">
              <path d="M9 6v1h.5v5L8 13v2h3.5v4h1v-4H16v-2l-1.5-1V7h.5V6H9z" />
            </Pin>
          </PlainButton>
          <PlainButton onClick={onClose.bind(null, tab)}>
            <Close viewBox="0 0 24 24" height="24" width="24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </Close>
          </PlainButton>
        </Actions>
      </Item>
    );
  }
}
