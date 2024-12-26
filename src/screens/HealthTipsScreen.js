import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { auth } from "../constants/FireBaseConfig";
import { getHealthTips, generateHealthTips } from "../constants/firebaseFunctions";

const { width, height } = Dimensions.get("window");

const HealthTipsScreen = ({ navigation }) => {
  const [healthTipsData, setHealthTipsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthTips = async () => {
      setLoading(true);
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) throw new Error("User is not logged in.");

        const existingTips = await getHealthTips(userId);
        if (existingTips?.tips?.length) {
          setHealthTipsData(existingTips.tips);
        } else {
          const newTips = await generateHealthTips(userId);
          if (newTips?.tips?.length) {
            setHealthTipsData(newTips.tips);
          } else {
            throw new Error("Failed to generate health tips.");
          }
        }
      } catch (error) {
        console.error("Error fetching health tips:", error.message);
        Alert.alert("Error", "Unable to load health tips. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHealthTips();
  }, []);

  const renderHealthTips = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#2260FF" style={styles.loader} />;
    }

    if (healthTipsData.length === 0) {
      return (
        <Text style={styles.emptyText}>
          No health tips available at the moment. Please check back later.
        </Text>
      );
    }

    return healthTipsData.map((tip, index) => (
      <Card key={index} style={styles.card}>
        <Card.Title
          title={tip.title}
          titleStyle={styles.cardTitle}
          subtitle={`Category: ${tip.category}`}
          subtitleStyle={styles.cardSubtitle}
        />
        <Card.Content>
          <Text style={styles.cardContent}>{tip.content}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="text" color="#2260FF" onPress={() => console.log("Tip clicked")}>
            Learn More
          </Button>
        </Card.Actions>
      </Card>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Personalized Health Tips</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderHealthTips()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4FF",
  },
  headerContainer: {
    backgroundColor: "#2260FF",
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    width: "90%",
  },
  contentContainer: {
    padding: 16,
    alignItems: "center",
  },
  loader: {
    marginTop: height * 0.3,
    alignSelf: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginVertical: height * 0.3,
    fontSize: 18,
    fontWeight: "500",
  },
  card: {
    width: width * 0.9,
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2260FF",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#888",
  },
  cardContent: {
    fontSize: 16,
    color: "#444",
    marginTop: 10,
    lineHeight: 22,
  },
});

export default HealthTipsScreen;
