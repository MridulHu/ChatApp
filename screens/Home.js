import React, { useEffect } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../colors";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const catImageUrl = "https://i.pravatar.cc/300?u=" + auth.currentUser?.email;

const Home = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.replace("Login");
        } catch (error) {
            Alert.alert("Logout Failed", error.message);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={colors.gray} style={{ marginLeft: 15 }} />
            ),
            headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={{ uri: catImageUrl }} style={styles.avatar} />
                    <TouchableOpacity onPress={handleLogout}>
                        <FontAwesome name="sign-out" size={24} color="red" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            {/* Chat Button */}
            <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate("Chat")}>
                <Text style={styles.chatButtonText}>Go to Chat</Text>
            </TouchableOpacity>

            {/* Bottom text */}
            <View style={styles.footer}>
                <Text style={styles.text}>ChatApp made by Mridul Das</Text>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center", // Centered content
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
    },
    footer: {
        position: "absolute",
        bottom: 20,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    chatButton: {
        backgroundColor: "#0084ff",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 20,
    },
    chatButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
