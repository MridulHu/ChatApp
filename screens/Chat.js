import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userRef = doc(database, "users", auth.currentUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          } else {
            console.log("No user data found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          Alert.alert("Error", "Failed to load user data.");
        }
      }
    };
    fetchUserData();
  }, []);

  const onSignOut = () => {
    signOut(auth)
      .then(() => navigation.replace("Login"))
      .catch(error => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Chat",
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={onSignOut}>
          <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: {
            _id: doc.data().user._id,
            name: doc.data().user.name || "Anonymous",
            avatar: doc.data().user.avatar || `https://i.pravatar.cc/300?u=${doc.data().user._id}`
          }
        }))
      );
    });

    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    if (!userData) {
      Alert.alert("Error", "User data not found. Please try again.");
      return;
    }

    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const { _id, createdAt, text } = messages[0];

    const userWithDetails = {
      _id: auth.currentUser.uid,
      name: userData.name || "Anonymous",
      avatar: userData.avatar || `https://i.pravatar.cc/300?u=${auth.currentUser.uid}`
    };

    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user: userWithDetails
    });
  }, [userData]);

  const renderMessage = (props) => {
    const { currentMessage } = props;
    return (
      <View>
        {currentMessage.user.name && (
          <Text style={styles.username}>{currentMessage.user.name}</Text>
        )}
        <Bubble
          {...props}
          wrapperStyle={{
            right: { backgroundColor: "#0084ff" },
            left: { backgroundColor: "#f0f0f0" },
          }}
        />
      </View>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      renderMessage={renderMessage}
      showAvatarForEveryMessage={true}
      showUserAvatar={true}
      onSend={messages => onSend(messages)}
      messagesContainerStyle={{ backgroundColor: '#fff' }}
      textInputStyle={{ backgroundColor: '#fff', borderRadius: 20 }}
      user={{
        _id: auth.currentUser.uid,
        name: userData?.name || "Anonymous",
        avatar: userData?.avatar || `https://i.pravatar.cc/300?u=${auth.currentUser.uid}`
      }}
    />
  );
}

const styles = StyleSheet.create({
  username: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 2,
    color: 'gray',
  },
});
