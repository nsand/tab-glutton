import React from 'react';
import TabItem from '../tab-item/tab-item.jsx';
import styles from './popup.scss';

export default class Popup extends React.Component {
  render() {
    const tabs = [{id: 'foo', title: 'gmail', favIconUrl: 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/ic_product_inbox_16dp_r2_2x.png'}, {id: 'bar', title: 'Facebook'}];
    return (
      <section>
        <h2>{tabs.length} tabs</h2>
        <ul className={styles.tabList}>
          {
            tabs.map(tab => <TabItem key={tab.id} tab={tab}></TabItem>)
          }
        </ul>
      </section>
    );
  }
}
