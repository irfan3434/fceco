"use client";

import ImageBanner from "@/components/imagebanner";

const HomePage = () => {
  // Example 1: Basic responsive banner with different images per device
  const bannerConfig = {
    id: 'hero',
    
    // Desktop image (landscape, wide composition)
    image: {
      src: '/assets/7.png',
      alt: 'Hero image for desktop',
      aspectRatio: 1.77 // 16:9 aspect ratio
    },
    
    // Tablet image (balanced composition)
    imageTablet: {
      src: '/assets/7.png',
      alt: 'Hero image for tablet',
      aspectRatio: 1.33 // 4:3 aspect ratio
    },
    
    // Mobile image (portrait or square, focused composition)
    imageMobile: {
      src: '/assets/22.png',
      alt: 'Hero image for mobile',
      aspectRatio: 0.75 // 3:4 aspect ratio
    },
    
    imageHeight: 'large',
    imageBehavior: 'zoom-in',
    imageOverlayOpacity: 30,
    desktopContentPosition: 'middle-center',
    
    blocks: [
      {
        type: 'heading',
        heading: 'Shaping a Sustainable Future with Information Technology',
        headingSize: 'hxl'
      },
      {
        type: 'buttons',
        buttonLabel1: 'Explore',
        buttonLink1: '/solutions',
        buttonStyleSecondary2: true
      }
    ],
    
    priority: true,
    enableAnimations: true
  };

 
  
  

  return (
    <div>
      <ImageBanner {...bannerConfig} /> 
    </div>
  );
};

export default HomePage;

