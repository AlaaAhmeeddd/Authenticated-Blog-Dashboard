import { QueryClient } from "@tanstack/react-query";
import { fireStore } from "../firebase";
import {
  getDocs,
  collection,
  addDoc,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export const queryClient = new QueryClient();

export async function getAllUsers() {
  const usersCollection = collection(fireStore, "Users");
  try {
    const response = await getDocs(usersCollection);
    const filteredUsers = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredUsers;
  } catch (error) {
    console.log(error);
  }
}

export async function addNewUser(user) {
  const usersCollection = collection(fireStore, "Users");
  try {
    await addDoc(usersCollection, user);
  } catch (error) {
    console.log(error);
  }
}

export async function addPost(post) {
  const postsCollection = collection(fireStore, "Posts");
  try {
    await addDoc(postsCollection, post);
    console.log("Post added successfully");
  } catch (error) {
    console.error("Error adding post:", error);
  }
}

export async function getPosts() {
  const postsCollection = collection(fireStore, "Posts");
  try {
    const response = await getDocs(postsCollection);
    const allPosts = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return allPosts;
  } catch (error) {
    console.error("Error adding post:", error);
  }
}

export async function getPersonalPosts(email) {
  const postsCollection = collection(fireStore, "Posts");
  const q = query(postsCollection, where("userEmail", "==", email));

  try {
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(postId) {
  try {
    const q = query(collection(fireStore, "Posts"), where("id", "==", postId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      try {
        await deleteDoc(doc(fireStore, "Posts", document.id));
      } catch (error) {
        throw Error('Error deleting the post', error);
      }
    });
  } catch (error) {
    throw Error("Cannot find the post", error);
  }
}

export async function updatePost(postId, updatedData) {
  try {
    const q = query(collection(fireStore, "Posts"), where("id", "==", postId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      try {
        await updateDoc(doc(fireStore, "Posts", document.id), updatedData);
        console.log(`Document with id ${document.id} successfully updated!`);
      } catch (error) {
        console.error(`Error updating document with id ${document.id}: `, error);
      }
    });
  } catch (error) {
    console.error("Error querying documents: ", error);
  }
}
