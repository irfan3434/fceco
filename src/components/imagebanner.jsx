"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './imagebanner.css';

const ImageBanner = ({
  id = 'banner',
  // Enhanced image settings with responsive support
  image = null,
  image2 = null,
  // NEW: Responsive image options
  imageTablet = null,     // Tablet-specific image
  imageMobile = null,     // Mobile-specific image
  image2Tablet = null,    // Second image tablet version
  image2Mobile = null,    // Second image mobile version
  
  imageOverlayOpacity = 0,
  imageHeight = 'medium', 
  imageBehavior = 'none',
  
  // Content positioning
  desktopContentPosition = 'middle-center',
  desktopContentAlignment = 'center',
  mobileContentAlignment = 'center',
  showTextBox = true,
  
  // Mobile settings
  stackImagesOnMobile = true,
  showTextBelow = true,
  
  // Styling
  colorScheme = 'scheme-1',
  
  // Content blocks
  blocks = [],
  
  // Animation settings
  enableAnimations = true,
  
  // Additional props
  className = '',
  priority = false // For above-the-fold images
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!enableAnimations) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, [enableAnimations]);

  // Generate dynamic styles for aspect ratio and overlay
  const getDynamicStyles = () => {
    const styles = {};
    
    // Overlay opacity
    styles[`--overlay-opacity-${id}`] = imageOverlayOpacity / 100;
    
    // Aspect ratio for adaptive height
    if (imageHeight === 'adapt' && image?.aspectRatio) {
      styles[`--aspect-ratio-${id}`] = `${(1 / image.aspectRatio) * 100}%`;
    }
    
    return styles;
  };

  // Generate responsive image sizes based on image behavior
  const getImageSizes = (isSecondImage = false) => {
    switch (imageBehavior) {
      case 'ambient':
        return '(max-width: 480px) 100vw, (max-width: 768px) 100vw, (min-width: 750px) 60vw, 120vw';
      case 'fixed':
      case 'zoom-in':
        return '100vw';
      default:
        if (image && image2) {
          if (stackImagesOnMobile) {
            return '(max-width: 480px) 100vw, (max-width: 768px) 100vw, (min-width: 750px) 50vw, 100vw';
          }
          return '(max-width: 480px) 100vw, (max-width: 768px) 100vw, 50vw';
        }
        return '(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw';
    }
  };

  // Helper function to determine if we have responsive images
  const hasResponsiveImages = () => {
    return imageMobile || imageTablet || image2Mobile || image2Tablet;
  };

  // Generate CSS classes with responsive image flags
  const bannerClasses = [
    'banner',
    `banner--content-align-${desktopContentAlignment}`,
    `banner--content-align-mobile-${mobileContentAlignment}`,
    `banner--${imageHeight}`,
    stackImagesOnMobile && image && image2 ? 'banner--stacked' : '',
    imageHeight === 'adapt' && image ? 'banner--adapt' : '',
    showTextBelow ? 'banner--mobile-bottom' : '',
    !showTextBox ? 'banner--desktop-transparent' : '',
    // Add responsive image flags
    imageTablet || image2Tablet ? 'banner--has-tablet-image' : '',
    imageMobile || image2Mobile ? 'banner--has-mobile-image' : '',
    enableAnimations ? 'scroll-trigger animate--fade-in' : '',
    isVisible && enableAnimations ? 'animate--fade-in-active' : '',
    className
  ].filter(Boolean).join(' ');

  const getMediaClasses = (isFirst = true, deviceType = 'desktop') => [
    'banner__media',
    'media',
    `banner__media-${deviceType}`,
    !image && !image2 ? 'placeholder' : '',
    (isFirst && image2) || (!isFirst) ? 'banner__media-half' : '',
    imageBehavior !== 'none' ? `animate--${imageBehavior}` : '',
    enableAnimations ? 'scroll-trigger animate--fade-in' : '',
    isVisible && enableAnimations ? 'animate--fade-in-active' : ''
  ].filter(Boolean).join(' ');

  // Render content blocks
  const renderBlocks = () => {
    return blocks.map((block, index) => {
      switch (block.type) {
        case 'heading':
          return (
            <h2
              key={index}
              className={`banner__heading inline-richtext ${block.headingSize || 'h1'}`}
              dangerouslySetInnerHTML={{ __html: block.heading || '' }}
            />
          );
        
        case 'text':
          return (
            <div
              key={index}
              className={`banner__text rte ${block.textStyle || 'body'}`}
            >
              <p dangerouslySetInnerHTML={{ __html: block.text || '' }} />
            </div>
          );
        
        case 'buttons':
          return (
            <div
              key={index}
              className={`banner__buttons${
                block.buttonLabel1 && block.buttonLabel2 ? ' banner__buttons--multiple' : ''
              }`}
            >
              {block.buttonLabel1 && (
                <a
                  href={block.buttonLink1 || '/services'}
                  className={`b-button${
                    block.buttonStyleSecondary1 ? ' button--secondary' : ' button--primary'
                  }`}
                  role={!block.buttonLink1 ? 'link' : undefined}
                  aria-disabled={!block.buttonLink1 ? 'true' : undefined}
                >
                  {block.buttonLabel1}
                </a>
              )}
              {block.buttonLabel2 && (
                <a
                  href={block.buttonLink2 || '/services'}
                  className={`b-button${
                    block.buttonStyleSecondary2 ? ' button--secondary' : ' button--primary'
                  }`}
                  role={!block.buttonLink2 ? 'link' : undefined}
                  aria-disabled={!block.buttonLink2 ? 'true' : undefined}
                >
                  {block.buttonLabel2}
                </a>
              )}
            </div>
          );
        
        default:
          return null;
      }
    });
  };

  // Placeholder SVG component
  const PlaceholderSVG = () => (
    <svg
      className="placeholder-svg"
      width="100%"
      height="100%"
      viewBox="0 0 525 525"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="525" height="525" fill="#E5E5E5"/>
      <path d="M262.5 150L350 262.5L262.5 375L175 262.5L262.5 150Z" fill="#C4C4C4"/>
    </svg>
  );

  // Render responsive images for first image
  const renderFirstImage = () => {
    if (!image && !imageTablet && !imageMobile) {
      return (
        <div className={getMediaClasses(true, 'desktop')}>
          <PlaceholderSVG />
        </div>
      );
    }

    return (
      <>
        {/* Desktop Image */}
        {image && (
          <div className={getMediaClasses(true, 'desktop')}>
            <Image
              src={image.src}
              alt={image.alt || ''}
              fill
              sizes={getImageSizes()}
              priority={priority}
              quality={85}
              className={image2 ? 'banner__media-image-half' : ''}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Tablet Image */}
        {imageTablet && (
          <div className={getMediaClasses(true, 'tablet')}>
            <Image
              src={imageTablet.src}
              alt={imageTablet.alt || image?.alt || ''}
              fill
              sizes={getImageSizes()}
              priority={false}
              quality={85}
              className={image2Tablet ? 'banner__media-image-half' : ''}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Mobile Image */}
        {imageMobile && (
          <div className={getMediaClasses(true, 'mobile')}>
            <Image
              src={imageMobile.src}
              alt={imageMobile.alt || imageTablet?.alt || image?.alt || ''}
              fill
              sizes={getImageSizes()}
              priority={false}
              quality={85}
              className={image2Mobile ? 'banner__media-image-half' : ''}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
      </>
    );
  };

  // Render responsive images for second image
  const renderSecondImage = () => {
    if (!image2 && !image2Tablet && !image2Mobile) return null;

    return (
      <>
        {/* Desktop Second Image */}
        {image2 && (
          <div 
            className={getMediaClasses(false, 'desktop')} 
            style={{ left: image ? '50%' : '0' }}
          >
            <Image
              src={image2.src}
              alt={image2.alt || ''}
              fill
              sizes={getImageSizes(true)}
              priority={false}
              quality={85}
              className={image ? 'banner__media-image-half' : ''}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Tablet Second Image */}
        {image2Tablet && (
          <div 
            className={getMediaClasses(false, 'tablet')} 
            style={{ left: imageTablet ? '50%' : '0' }}
          >
            <Image
              src={image2Tablet.src}
              alt={image2Tablet.alt || image2?.alt || ''}
              fill
              sizes={getImageSizes(true)}
              priority={false}
              quality={85}
              className={imageTablet ? 'banner__media-image-half' : ''}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Mobile Second Image */}
        {image2Mobile && (
          <div 
            className={getMediaClasses(false, 'mobile')} 
            style={{ left: imageMobile ? '50%' : '0' }}
          >
            <Image
              src={image2Mobile.src}
              alt={image2Mobile.alt || image2Tablet?.alt || image2?.alt || ''}
              fill
              sizes={getImageSizes(true)}
              priority={false}
              quality={85}
              className={imageMobile ? 'banner__media-image-half' : ''}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div
      id={`Banner-${id}`}
      className={bannerClasses}
      ref={bannerRef}
      style={getDynamicStyles()}
      data-overlay-opacity={imageOverlayOpacity}
      data-image-height={imageHeight}
      data-image-behavior={imageBehavior}
    >
      {/* Responsive Images */}
      {renderFirstImage()}
      {renderSecondImage()}

      {/* Content */}
      <div className={`banner__content banner__content--${desktopContentPosition} page-width${
        enableAnimations ? ' scroll-trigger animate--slide-in' : ''
      }${isVisible && enableAnimations ? ' animate--slide-in-active' : ''}`}>
        <div className={`banner__box content-container content-container--full-width-mobile color-${colorScheme} gradient`}>
          {renderBlocks()}
        </div>
      </div>
    </div>
  );
};

export default ImageBanner;