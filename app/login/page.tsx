import { useState } from "react"

const Page = () => {
  return (
    <main>
      <div className="my-5 text-center">
        <div className="text-center my-3">
          <input
            type="text"
            className="focus:outline-none bg-transparent focus:border-[1px] border-solid border-transparent border-b-white"
            placeholder="Email"
          />
        </div>
        <div className="text-center">
          <input
            type="password"
            className="focus:outline-none bg-transparent focus:border-[1px] border-solid border-transparent border-b-white"
            placeholder="Password"
          />
        </div>
        <button>login</button>
      </div>
    </main>
  )
}

export default Page
