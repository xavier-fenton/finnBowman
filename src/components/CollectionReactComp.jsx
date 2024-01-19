import React, { useEffect, useRef } from 'react'
import data from '../data.json'

const CollectionReactComp = () => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {data.map((data) => {
          return (
            <div className="grid">
              <div id={data.id}>
                <img className="h-auto max-w-full" src={data.img} alt="" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CollectionReactComp
