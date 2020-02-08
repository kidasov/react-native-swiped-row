/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  UIManager,
  LayoutAnimation,
} from 'react-native';

import SwipeRow from './components/SwipeRow';
import {useEffect, useState} from 'react';

const names = [
  'Rebecca',
  'John',
  'Samanta',
  'Ken',
  'Ivar',
  'Bjorn',
  'Priscilla',
  'Geralt',
];

let contactList = [...Array(30).keys()].map(x => {
  return {
    id: x,
    name: names[Math.floor(Math.random() * names.length)],
    style: {
      backgroundColor: `#${(((1 << 24) * Math.random()) | 0).toString(16)}`,
    },
  };
});

const App = () => {
  const [contacts, setContacts] = useState(contactList);

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }, []);

  const onAnimationComplete = contact => {
    setContacts(contacts.filter(c => contact.id !== c.id));
    // run system animation
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.easeInEaseOut,
        'opacity',
      ),
    );
  };

  return (
    <FlatList
      data={contacts}
      renderItem={({item}) => {
        return (
          <SwipeRow onAnimationComplete={() => onAnimationComplete(item)}>
            <View style={[styles.item, item.style]}>
              <Text>{item.name}</Text>
            </View>
          </SwipeRow>
        );
      }}
      contentContainerStyle={styles.content}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 10,
  },

  item: {
    borderWidth: 1,
    borderColor: '#dfdfdf',
    marginVertical: 10,
    padding: 10,
  },
});

export default App;
