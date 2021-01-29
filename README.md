## Installation

If using yarn:
```
yarn add react-native-swiped-row
```
If using npm:

```
npm i react-native-swiped-row
```

## Usage

```
import SwipeRow from 'react-native-swiped-row';
```

Simply place a `<SwipedRow />` tag as a part of the flatlist item.

```
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
```

## Swipe to delete example for react-native with FlatList

![alt text](https://github.com/kidasov/react-native-swipe-to-delete/blob/master/example-swipe.gif "Example")
