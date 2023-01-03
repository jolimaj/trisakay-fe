function Profile({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#f4511e", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="Aking Profile"
        component={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Profile Screen</Text>
            <Button
              title="Open drawer"
              onPress={() => navigation.openDrawer()}
            />
            <Button
              title="Toggle drawer"
              onPress={() => navigation.toggleDrawer()}
            />
          </View>
        }
        options={{
          title: "First Page", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}
