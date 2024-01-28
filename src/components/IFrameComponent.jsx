import React from 'react'

const ResponsiveIframe = ({ youtube_source }) => {
  return (
    <iframe
      className=" w-[80dvw] h-[70dvw] md:h-[40dvw] pb-[20px] pt-[20px]"
      src={youtube_source}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  )
}

export default ResponsiveIframe
