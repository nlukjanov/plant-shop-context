import React, { useContext } from 'react';

import CollectionPreview from '../collection-preview/collection-preview.component';
import { CollectionsContext } from '../../providers/collections/collections.provider';

import {
  SpinnerContainer,
  SpinnerOverlay
} from '../../components/with-spinner/with-spinner.styles';

import { CollectionsOverviewContainer } from './collections-overview.styles';

const CollectionsOverview = () => {
  const collectionsObject = useContext(CollectionsContext);
  const collections = Object.values(collectionsObject.collections);
  return collectionsObject.isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <CollectionsOverviewContainer>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </CollectionsOverviewContainer>
  );
};

export default CollectionsOverview;
