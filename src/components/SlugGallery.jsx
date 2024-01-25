import React, { useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from 'sanity:client'
const SlugGallery = ({ data }) => {
  const builder = imageUrlBuilder(sanityClient)
  function urlFor(source) {
    if (source === undefined) {
      return null
    } else return builder.image(source)
  }

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
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center relative pt-[96px] md:pt-[56px]">
        <div className="h-full">
          {data.titleImage ? (
            <img
              src={`${data.titleImage}`}
              onClick={() => openImage({ original: `${data.titleImage}` })}
              className="cursor-pointer"
            />
          ) : (
            <div className="font-bold">{data.title}</div>
          )}
        </div>
        <div className="px-[20px] pb-[20px] mx-[20px]">
          {data.brandDescription}
        </div>

        <div
          key={data._id}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-5"
          // className="flex flex-wrap wrap"
        >
          {data.gallery
            ? data.gallery.map((data, index) => {
                const source = urlFor(data)

                return (
                  <div
                    key={index}
                    className="flex items-center justify-center flex-col relative overflow-hidden cursor-pointer"
                    onClick={() => openImage({ original: source })}
                  >
                    <img
                      className="w-full h-auto"
                      src={`${source}`}
                      alt={`Gallery Image ${index}`}
                    />
                  </div>
                )
              })
            : null}
        </div>
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
