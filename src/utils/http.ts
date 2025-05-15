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
  orderBy,
} from "firebase/firestore";
import { PostType, updatedPostType, UserType } from "@/type";

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

export async function addNewUser(user : UserType) {
  const usersCollection = collection(fireStore, "Users");
  try {
    await addDoc(usersCollection, user);
  } catch (error) {
    console.log(error);
  }
}

export async function addPost(post: PostType) {
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
  const postsQuery = query(postsCollection, orderBy("date"));

  try {
    const response = await getDocs(postsQuery);
    const allPosts = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return allPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

export async function getPersonalPosts(email: string): Promise<PostType[]> {
  const postsCollection = collection(fireStore, "Posts");
  const q = query(postsCollection, where("userEmail", "==", email));

  try {
    const querySnapshot = await getDocs(q);
    const posts: PostType[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const post: PostType = {
        id: doc.id,
        headline: data.headline,
        description: data.description,
        imageUrl: data.imageUrl,
        date: data.date,
      };
      posts.push(post);
    });
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
}


export async function deletePost(postId: string) {
  try {
    const q = query(collection(fireStore, "Posts"), where("id", "==", postId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      try {
        await deleteDoc(doc(fireStore, "Posts", document.id));
        console.log("Post deleted successfully");
      } catch (error) {
        if (error instanceof Error) {
          throw Error("Error deleting the post", error);
        }
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      throw Error("Cannot find the post", error);
    }
  }
}

export async function updatePost(postId: string, updatedData: updatedPostType) {
  try {
    const q = query(collection(fireStore, "Posts"), where("id", "==", postId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      try {
        await updateDoc(doc(fireStore, "Posts", document.id), { ...updatedData });
        console.log("Post updated successfully");
      } catch (error) {
        console.error(
          `Error updating document with id ${document.id}: `,
          error
        );
      }
    });
  } catch (error) {
    console.error("Error querying documents: ", error);
  }
}
