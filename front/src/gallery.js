import React from 'react';

import { LazyLoadImage, trackWindowScroll }
  from 'react-lazy-load-image-component';
import PhotoGallery from "react-photo-gallery";
import 'react-lazy-load-image-component/src/effects/blur.css';




const Gallery = ({ images, scrollPosition }) => (
  <div>
       <PhotoGallery photos={images} renderImage={
          ({ index, left, top, key, photo }) => (
            <LazyLoadImage
              key={photo.key}
              alt={photo.alt}
              height={photo.height}
              effect="blur"
              placeholderSrc={ photo.lowResSrc }
              // Make sure to pass down the scrollPosition,
              // this will be used by the component to know
              // whether it must track the scroll position or not
              scrollPosition={scrollPosition}
              src={photo.src}
              width={photo.width} />
              )
       } />
  </div>
);
// Wrap Gallery with trackWindowScroll HOC so it receives
// a scrollPosition prop to pass down to the images
export default trackWindowScroll(Gallery);