import React, { useContext } from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { CollectionsContext } from '../../providers/collections/collections.provider';

import {
  SpinnerContainer,
  SpinnerOverlay
} from '../../components/with-spinner/with-spinner.styles';

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer
} from './collection.styles';

const CollectionPage = ({ match }) => {
  const collections = useContext(CollectionsContext);
  console.log(collections);
  const collection = collections.collections[match.params.collectionId];
  console.log(collections.collections);
  // const { title, items } = collection;
  return collections.isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <CollectionPageContainer>
      <CollectionTitle>{collection.title}</CollectionTitle>
      <CollectionItemsContainer>
        {collection.items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

export default CollectionPage;
