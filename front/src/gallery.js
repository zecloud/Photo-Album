import React from 'react';

import { LazyLoadImage, trackWindowScroll }
  from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';
const Gallery = ({ images, scrollPosition }) => (
  <div>
    {images.map((image) =>
      <LazyLoadImage
        key={image.key}
        alt={image.alt}
        height={image.height}
        effect="blur"
        placeholderSrc={ image.lowResSrc }
        // Make sure to pass down the scrollPosition,
        // this will be used by the component to know
        // whether it must track the scroll position or not
        scrollPosition={scrollPosition}
        src={image.src}
        width={image.width} />
    )}
  </div>
);
// Wrap Gallery with trackWindowScroll HOC so it receives
// a scrollPosition prop to pass down to the images
export default trackWindowScroll(Gallery);