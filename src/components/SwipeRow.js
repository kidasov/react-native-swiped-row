import React, {useEffect, useCallback} from 'react';
import {Animated, Dimensions, PanResponder} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

let translation = null;

const SwipeRow = props => {
  const panValue = new Animated.ValueXY();
  const opacityValue = new Animated.Value(0);

  const panListener = useCallback(({value}) => {
    translation = value;
  }, []);

  useEffect(() => {
    panValue.x.addListener(panListener);

    return () => {
      panValue.x.removeListener(panListener);
    };
  }, [panValue, panListener]);

  const panRepsonder = PanResponder.create({
    onShouldBlockNativeResponder: () => false,
    onMoveShouldSetPanResponder: (e, gestureState) => {
      return gestureState.dx > props.minOffsetToMove;
    },
    onPanResponderMove: (e, gs) => {
      panValue.x.setValue(gs.dx);
    },
    onPanResponderTerminate: () => {
      handlePanResponderEnd();
    },
    onPanResponderRelease: () => {
      handlePanResponderEnd();
    },
  });

  const handlePanResponderEnd = () => {
    const {animationDuration, maxOffsetToMove} = props;
    if (translation > maxOffsetToMove) {
      Animated.parallel([
        Animated.timing(panValue.x, {
          toValue: SCREEN_WIDTH,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        const {onAnimationComplete} = props;
        onAnimationComplete && onAnimationComplete();
      });
    } else {
      Animated.timing(panValue.x, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    }
  };

  const opacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const panStyle = {
    transform: panValue.getTranslateTransform(),
    opacity,
  };

  return (
    <Animated.View
      {...panRepsonder.panHandlers}
      style={[props.style, panStyle]}>
      {props.children}
    </Animated.View>
  );
};

SwipeRow.defaultProps = {
  minOffsetToMove: 2,
  maxOffsetToMove: 120,
  animationDuration: 200,
};

export default SwipeRow;
