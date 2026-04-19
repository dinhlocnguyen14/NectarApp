import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FilterScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Eggs", checked: true },
    { id: 2, name: "Noodles & Pasta", checked: false },
    { id: 3, name: "Chips & Crisps", checked: false },
    { id: 4, name: "Fast Food", checked: false },
  ]);

  const [brands, setBrands] = useState([
    { id: 1, name: "Individual Callection", checked: false },
    { id: 2, name: "Cocola", checked: true },
    { id: 3, name: "Ifad", checked: false },
    { id: 4, name: "Kazi Farmas", checked: false },
  ]);

  const toggleCategory = (id) => {
    setCategories(categories.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
  };

  const toggleBrand = (id) => {
    setBrands(brands.map(b => b.id === id ? { ...b, checked: !b.checked } : b));
  };

  const Checkbox = ({ checked, onPress, label }) => (
    <TouchableOpacity style={styles.checkboxRow} onPress={onPress}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Ionicons name="checkmark" size={16} color="#fff" />}
      </View>
      <Text style={[styles.label, checked && styles.checkedLabel]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          {categories.map(cat => (
            <Checkbox 
              key={cat.id} 
              label={cat.name} 
              checked={cat.checked} 
              onPress={() => toggleCategory(cat.id)} 
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brand</Text>
          {brands.map(brand => (
            <Checkbox 
              key={brand.id} 
              label={brand.name} 
              checked={brand.checked} 
              onPress={() => toggleBrand(brand.id)} 
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.applyButton} onPress={() => navigation.goBack()}>
        <Text style={styles.applyButtonText}>Apply Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#181725",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F2F3F2",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#181725",
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#B1B1B1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checked: {
    backgroundColor: "#53B175",
    borderColor: "#53B175",
  },
  label: {
    fontSize: 16,
    color: "#181725",
  },
  checkedLabel: {
    color: "#53B175",
  },
  applyButton: {
    backgroundColor: "#53B175",
    margin: 20,
    height: 67,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default FilterScreen;
