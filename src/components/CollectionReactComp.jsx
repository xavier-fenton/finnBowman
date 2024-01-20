import React, { useEffect, useRef } from 'react'
import data from '../data.json'
import '../styles/index.css'

const CollectionReactComp = () => {
  const shuffle = (array) => {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => {
        return (
          <div key={a.value.id} id={a.value.id} className="group">
            <div className="cursor-pointer">
              <div className="hidden border-4 rounded-lg border-grey-500 bg-black text-white p-2 group-hover:block">
                <div>{a.value.tag.brand_title}</div>
                <div>
                  description:
                  <div>
                    Ea sint veniam ea consequat officia fugiat pariatur dolor
                    consectetur. Reprehenderit tempor consectetur anim ea
                    exercitation. Laboris ea nisi magna voluptate ad nisi duis.
                  </div>
                </div>
              </div>
              <img className="h-auto" src={a.value.img} alt="" />
            </div>
          </div>
        )
      })
  }
  return (
    <>
      <div className="grid grid-cols grid-cols-2 md:grid-cols-4">
        <div className="">{shuffle(data)}</div>
        <div className="">{shuffle(data)}</div>
        <div className="">{shuffle(data)}</div>
        <div className="">{shuffle(data)}</div>
      </div>
    </>
  )
}

export default CollectionReactComp
