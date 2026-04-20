import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "./Skeleton";

export const ProductSkeleton = () => {
  return (
    <View style={styles.card}>
      <Skeleton width={100} height={80} style={styles.image} />
      <Skeleton width={120} height={20} style={styles.title} />
      <Skeleton width={80} height={15} style={styles.subtitle} />
      <View style={styles.footer}>
        <Skeleton width={50} height={20} />
        <Skeleton width={35} height={35} borderRadius={15} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 250,
    borderWidth: 1,
    borderColor: "#F2F3F2",
    borderRadius: 18,
    padding: 15,
    marginRight: 15,
    backgroundColor: "#fff",
  },
  image: {
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
