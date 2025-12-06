"use client"

import { PlusCircle, Trash2Icon, UserCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

function Page() {
  const [neweffort, setNewEffort] = useState([{
    activity: "",
    comments: "",
    hours: 0,

  }])
  const [result, setResult] = useState<{ activity: string, comments: string, hours: number }[]>([])
  const [load,setLoad] = useState(false)


  useEffect(() => {
    const saved = localStorage.getItem("result")
    if (saved) {
      setResult(JSON.parse(saved))
    }
    setLoad(true)
  }, [])
  useEffect(() => {
    if(load){
    localStorage.setItem("result", JSON.stringify(result))
    }
  }, [result])

  function deleteOne(index:number) {
    const updated = result.filter((_,i) => i !== index)
    setResult(updated)
    localStorage.setItem("result",JSON.stringify(updated))
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!neweffort[0].activity || !neweffort[0].hours) return
    setResult(prev => [...prev, neweffort[0]])
    setNewEffort([{
      activity: "",
      comments: "",
      hours: 0,
    }])
  }

  return (
    <div className="min-h-screen bg-linear-to-br p-6 from-blue-50 to-indigo-100">
      <div className="bg-white  max-w-4xl mx-auto rounded-2xl shadow-md p-6">
        <div className="flex flex-col items-center">
          {/* Image */}
          <UserCircleIcon className="w-20 h-20" />
          {/* Set your Default efforts */}
          <p className="text-gray-500 mt-2 ">Set your default efforts that appear automatically each day</p>
        </div>
        <div className="space-y-3 mb-5">
          {/* Your Default efforts */}
          <p className=" text-sm mt-10">Your Default efforts</p>
          {result.map((res,index) => {
            return (
              <div
                className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg p-4"
                key={index}
              >
                <div>
                  <h3 className="text-gray-700 font-medium">{res.activity}</h3>
                  <p className="text-xs text-gray-400 italic mt-1">{res.comments}</p>
                  <p className="text-sm text-gray-500">{res.hours} hrs</p>
                </div>

                <Trash2Icon onClick={() => deleteOne(index)} className="w-5 h-5 cursor-pointer hover:text-red-600 text-red-500" />
              </div>
            );
          })}

        </div>
        <div>
          <div className="p-5 bg-linear-to-br from-blue-50 to-indigo-100 rounded-lg">
            <div>
              <h2 className="flex gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-500" />
                Add new Default Effort
              </h2>
            </div>
            <div className="flex items-center justify-start mt-5 space-x-5">
              {/* activity input */}
              <input value={neweffort[0].activity} onChange={(e) => setNewEffort([{ ...neweffort[0], activity: e.target.value }])} type="text" placeholder="Effort name" name="" id="" className="border border-gray-500 rounded-lg px-3 py-2 focus:outline-none" />
              {/* input */}
              <input value={neweffort[0].comments} onChange={(e) => setNewEffort([{ ...neweffort[0], comments: e.target.value }])} type="text" placeholder="Comment" name="" id="" className="border border-gray-500 rounded-lg px-3 py-2 focus:outline-none" />

              <input value={neweffort[0].hours} onChange={(e) => setNewEffort([{ ...neweffort[0], hours: Number(e.target.value) }])} type="number" placeholder="Hours" name="" min={0} id="" className="border border-gray-500 rounded-lg px-3 py-2 no-spinner focus:outline-none" />
              {/* button */}
              <button onClick={handleClick} className="bg-indigo-500 cursor-pointer hover:bg-indigo-600 text-white font-medium rounded-lg px-4 py-2 transition">Add</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default Page;






