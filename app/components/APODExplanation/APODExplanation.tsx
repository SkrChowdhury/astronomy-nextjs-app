import React from 'react'

export default function APODExplanation({ title, explanation }: { title: string; explanation: string }) {
  return (
    <>
    <h2 className="text-2xl font-semibold mt-4">{title}</h2>
    <p className="mt-2 text-gray-700">{explanation}</p>
  </>
  )
}
