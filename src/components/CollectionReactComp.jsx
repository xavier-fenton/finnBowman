import data from '../data.json'

const CollectionReactComp = () => {
  const shuffle = (array) => {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => {
        return (
          <div
            key={a.value.id}
            id={a.value.id}
            className="group grid h-auto  filter grayscale blur-md contrast-200 hover:filter-none"
          >
            <div className="cursor-pointer relative">
              <div className="hidden border-4 border-grey-500 bg-black text-white p-2 absolute bottom-[0px] md:h-[200px] group-hover:block animation-fade">
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
