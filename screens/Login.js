import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Image, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar, 
  Alert 
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../config/firebase";

const backImage = require("../assets/backImage.png");

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onHandleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Fetch additional user data from Firestore
      const userRef = doc(database, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        console.log("User data:", userSnap.data());
      } else {
        console.log("No additional user data found in Firestore.");
      }

      console.log("Login successful");
      navigation.replace("Home"); // Navigate to Home on success
    } catch (error) {
      console.log(error.message);
      let errorMessage = "Login failed. Please try again.";
      if (error.code === "auth/invalid-email") errorMessage = "Invalid email format.";
      else if (error.code === "auth/user-not-found") errorMessage = "No user found with this email.";
      else if (error.code === "auth/wrong-password") errorMessage = "Incorrect password.";
      else if (error.code === "auth/too-many-requests") errorMessage = "Too many failed attempts. Try again later.";

      Alert.alert("Login Error", errorMessage);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Log In</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={onHandleLogin} disabled={loading}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            {loading ? "Logging in..." : "Log In"}
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "#f57c00",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  footerText: {
    color: "gray",
    fontWeight: "600",
    fontSize: 14,
  },
  signupText: {
    color: "#f57c00",
    fontWeight: "600",
    fontSize: 14,
  },
});
