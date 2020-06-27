import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { config } from './firebase.config';
import SHOP_DATA from '../redux/shop/shop.data';

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const storage = firebase.storage();

export const updateImagesUrls = async () => {
  const urlCategories = ['bathroom', 'bedroom', 'kitchen', 'living', 'study'];
  const storageRef = storage.ref();

  const shopData = JSON.parse(JSON.stringify(SHOP_DATA));
  let imageUrls = {};

  const getCategoryStorage = async (category) => {
    return await storageRef.child(`plants/${category}`).listAll();
  };

  async function getImageUrls() {
    await Promise.all(
      urlCategories.map(async (category) => {
        const categoryArray = [];
        const categoryStorage = await getCategoryStorage(category);
        categoryStorage.items.map((image) => {
          return categoryArray.push(
            'gs://' + config.storageBucket + '/' + image.fullPath
          );
        });
        imageUrls = { ...imageUrls, [category]: categoryArray };
      })
    );
    return updateUrls();
  }

  function updateUrls() {
    urlCategories.map((category) => {
      return SHOP_DATA[category].items.map((item, index) => {
        return (item.imageUrl = imageUrls[category][index]);
      });
    });
    return SHOP_DATA;
  }

  const newData = await getImageUrls();
  console.log(newData);
  return newData;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
