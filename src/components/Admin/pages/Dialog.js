import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";

const DialogBox = (props) => {
  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={props.values} onDismiss={props.hideModal}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={props.hideModal}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default DialogBox;
