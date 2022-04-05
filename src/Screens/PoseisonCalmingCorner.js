import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList,
    SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Task from "../Components/Task";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { selectUser } from "../slices/authSlice";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";

const Home = () => {
    const [Items, setItems] = useState([{}]);
    const [answered, setAnswered] = useState(false);

    useEffect(() => {
        fetchDB();
    }, [Items]);

    const complete = (index) => {
        const docId = Items[index].id;

        const docRef = doc(db, "Home", docId);
        deleteDoc(docRef); // remove from db
    };

    const fetchDB = async () => {
        const colRef = collection(db, "Home");
        const snapshot = await getDocs(colRef);
        let array = [];
        snapshot.docs.forEach((doc) => {
            array.push({ id: doc.id, data: doc.data().array });
        });
        setItems(array);
    };

    return (
        <View style={styles.container}>
            {/* Scroll view when list gets longer than page */}
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                keyboardShouldPersistTaps="handled"
            >
                {/* Today */}
                <View style={styles.tasksWrapper}>
                    <Text style={styles.sectionTitle}>Calming Corner</Text>
                    <View style={styles.items}>
                        {/* This is where the entered by the user will go! */}
                        {Items.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => complete(index)}
                                >
                                    <Task text={item.data} />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
            {!answered && (
                <View style={styles.symptomContainer}>
                    <Text style={styles.symptomText}>
                        Tap To Play Meditation Music Below:
                    </Text>
                    <View flexDirection="row" justifyContent="space-evenly">


                        <TouchableOpacity
                            style={styles.symptomIcons}
                            onPress={() => setAnswered(true)}
                        >
                            <Icon
                                type="font-awesome-5"
                                color="#3D426B"
                                name="music"
                                size="48"
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    symptomContainer: {
        paddingBottom: 20,
    },
    container: {
        flex: 3,
        backgroundColor: "#FAF9F6",
        alignItems: "center",
        paddingTop: 70,
        paddingBottom: 20,
    },
    sectionTitle: {
        color: "black",
        fontSize: 36,
        fontWeight: "bold",
    },
    tasksWrapper: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: "absolute",
        bottom: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: "#FFF",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#C0C0C0",
        borderWidth: 1,
    },
    addText: {},
    symptomText: {
        color: "black",
        fontSize: 24,
        textAlign: "center",
    },
    symptomIcons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingTop: 15,
    },
});

export default Home;
