/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import { contractAddress } from "./contracts/index"
import contractABI from "./contracts/abi.json"
import { ethers } from "ethers"

function App() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [display, setDisplay] = useState("babe")

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }


  async function updateName() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.updateName(name);
        await transaction.wait();
        console.log("name sent")
        setName("")
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }


  async function updateAge() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.updateAge(age);
        await transaction.wait();
        setAge("")
        console.log("age is sent")
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }


  async function getEntityDetails() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.getEntityDetails();
        const { name, age } = transaction;
        const result = `Inputed name is ${name}, and the age is ${age}`
        setDisplay(result);
        console.log(result);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }


  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleAge = (e) => {
    setAge(e.target.value)
  }

  return (
    <>
      <nav className="flex justify-between font-bold">
        <div className='text-xl pt-2 font-extrabold'>Registry</div>
        <div className='p-4 bg-[#8FB3FF] text-base rounded-3xl'>Connect Wallet</div>
      </nav>
      <main className='bg-[#CCDBFF] h-[620px] rounded-xl mt-12 py-4'>
        <div className='flex justify-between w-full p-4 mb-8'>
          <div className='flex flex-col items-center w-full'>
            <div className='m-4'>
              <input className='bg-white p-4 rounded-md'
                type='text'
                placeholder='input your name here'
                value={name}
                onChange={handleName}
              />
            </div>
            <div>
              <button className='p-4 bg-[#8FB3FF] text-[#050505] text-lg font-semibold rounded-full'
                onClick={updateName}
              >
                Send
              </button>
            </div>
          </div>

          <div className='flex flex-col items-center w-full'>
            <div className='m-4'>
              <input className='bg-white p-4 rounded-md'
                type='number'
                placeholder='enter age here e.g 1234...'
                value={age}
                onChange={handleAge}
              />
            </div>
            <div>
              <button className='bg-[#8FB3FF] text-[#050505] text-lg font-semibold rounded-full p-3'
                onClick={updateAge}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <div className='bg-slate-50 w-2/5 h-[280px] flex justify-center items-center m-4 text-xl p-6'>
            {display}
          </div>
          <div className='mb-4'>
            <button onClick={getEntityDetails}
              className='bg-[#a45b7c] py-3 px-2 rounded-2xl text-xl m-2 font-medium'
            >
              Get Details
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
