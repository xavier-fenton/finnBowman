import React from 'react'

const ResponsiveIframe = ({ youtube_source }) => {
  return (
    <iframe
      className="w-full h-[50dvw] flex justify-center items-center"
      src={youtube_source}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  )
}

export default ResponsiveIframe
