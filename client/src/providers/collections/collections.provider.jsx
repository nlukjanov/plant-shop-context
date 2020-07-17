import React, { createContext, useState, useEffect } from 'react';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

export const CollectionsContext = createContext({
  collections: { hello: 'hello' },
  isLoading: false
});

const CollectionsProvider = ({ children }) => {
  // we useState to set default value which is the same as in cart context (true)
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const updateCollections = async () => {
      const collectionRef = firestore.collection('collections');
      const snapshot = await collectionRef.get();
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      setCollections(collectionsMap);
      setIsLoading(false);
    };
    updateCollections();
  }, []);

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        isLoading
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};

export default CollectionsProvider;
