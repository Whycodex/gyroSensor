import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Switch, Text, View } from "react-native";
import { Gyroscope } from "expo-sensors";

export default function App() {
  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroEnabled, setGyroEnabled] = useState(false);

  useEffect(() => {
    let subscription;
    if (gyroEnabled) {
      subscription = Gyroscope.addListener((gyroscopeData) => {
        setGyroData(gyroscopeData);
      });
    } else {
      subscription?.remove();
    }
    return () => {
      subscription?.remove();
    };
  }, [gyroEnabled]);

  const handlerGyroToggle = () => {
    setGyroEnabled(!gyroEnabled);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gyroscope</Text>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: "#cecece", true: "#000" }}
          thumbColor={gyroEnabled ? "#cecece" : "#000"}
          ios_backgroundColor="#fff"
          onValueChange={handlerGyroToggle}
          value={gyroEnabled}
          style={styles.switch}
        />
      </View>
      <View
        style={{
          height: 100,
          width: 100,
          borderRadius: 50,
          backgroundColor: "#000000",
          transform: [
            { translateX: gyroData.x * 10 },
            { translateY: gyroData.y * 10 },
          ],
        }}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  switchContainer: {
    marginBottom: 40,
    marginTop: 30,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
});
