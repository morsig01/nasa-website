import Timeline from '@/components/organisms/Timeline'
import React from 'react'

const History = () => {
  return (
    <>
      <section className="flex items-end min-h-[20vh] p-6 bg-neutral-700">
          <div className="w-full flex pl-52">
              <h1 className="text-4xl font-bold">Historic Events</h1>
          </div>  
      </section>
      <section className="flex-grow mt-46">
          <Timeline />
      </section>
    </>
  )
}

export default History