import React from 'react';

import { LazyLoadImage, trackWindowScroll }
  from 'react-lazy-load-image-component';
import PhotoGallery from "react-photo-gallery";
import { SRLWrapper } from "simple-react-lightbox";
import 'react-lazy-load-image-component/src/effects/blur.css';
const browser = navigator.userAgent
const isFirefox = browser.indexOf('Firefox') > -1

const options = {
    settings: {
      overlayColor: isFirefox ? '#000000' : 'rgba(0,0,0,0,8)'
    }
};



const Gallery = ({ images, scrollPosition }) => (
  <div>
      <SRLWrapper options={options}>
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
       </SRLWrapper>
  </div>
);
// Wrap Gallery with trackWindowScroll HOC so it receives
// a scrollPosition prop to pass down to the images
export default trackWindowScroll(Gallery);