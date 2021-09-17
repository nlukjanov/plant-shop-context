import React, { useContext } from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { CollectionsContext } from '../../providers/collections/collections.provider';

import {
  SpinnerContainer,
  SpinnerOverlay,
} from '../../components/with-spinner/with-spinner.styles';

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer,
} from './collection.styles';

const CollectionPage = ({ match }) => {
  const { collections, isLoading } = useContext(CollectionsContext);
  const collection = collections[match.params.collectionId];
  const { title, items } = collection;
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

export default CollectionPage;
