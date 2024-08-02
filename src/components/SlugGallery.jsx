import React, { useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from 'sanity:client'
import IFrameComponent from './IFrameComponent.jsx'

const SlugGallery = ({ data }) => {
  const builder = imageUrlBuilder(sanityClient)

  function urlFor(source) {
    return builder.image(source)
  }
  const youtube_source = data.youtubelink

  // State for the selected image
  const [selectedImage, setSelectedImage] = useState(null)

  // Function to open the image overlay
  const openImage = (imageData) => {
    setSelectedImage(imageData)
  }

  // Function to close the image overlay
  const closeImage = () => {
    setSelectedImage(null)
  }

  return (
    <div className="relative flex flex-col z-10">
      <div className="flex flex-col justify-center items-center relative pt-[40px]">
        <div className="h-full w-full flex flex-col">
          {data.titleImage ? (
            <img
              src={`${urlFor(data.titleImage.options.source)}`}
              className="cursor-pointer"
            />
          ) : (
            <div className="flex flex-col items-center pb-[20px]">
              {youtube_source ? (
                <>
                  <IFrameComponent youtube_source={youtube_source.url} />
                  <div className="pt-[10px] text-[14px]">{data.title}</div>
                </>
              ) : (
                <div className="font-bold"></div>
              )}
            </div>
          )}
        </div>
        <div className="pb-[20px]">{data.brandDescription}</div>
      </div>

      <div className="columns-1 gap-2 mx-2 p-2 sm:columns-2 sm:gap-2 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:pt-2">
        {data.gallery.map((imageData, index) => {
          const source = urlFor(imageData)
          if (index === 0) {
            return (
              <img
                key={index}
                className="object-cover object-center cursor-pointer"
                src={`${source}`}
                alt={`Gallery Image ${index}`}
                onClick={() => openImage({ original: source })}
              />
            )
          } else
            return (
              <img
                key={index}
                className="w-[100%] h-[50%] object-cover cursor-pointer"
                src={`${source}`}
                alt={`Gallery Image ${index}`}
                onClick={() => openImage({ original: source })}
              />
            )
        })}
      </div>

      {selectedImage && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeImage}
        >
          <img
            src={selectedImage.original}
            alt="Selected Image"
            className="object-contain max-h-full max-w-full"
          />
        </div>
      )}
    </div>
  )
}

export default SlugGallery
