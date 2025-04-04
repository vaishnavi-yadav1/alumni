import React from 'react'
export default function CreateJob() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Post a Job</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Position'
          className='border p-3 rounded-lg'
          id='position'
          required
        />
        <input
          type='text'
          placeholder='Company'
          className='border p-3 rounded-lg'
          id='company'
          required
        />
        <input
          type='number'
          placeholder='Experience (in years)'
          className='border p-3 rounded-lg'
          id='experience'
          required
        />
        <input
          type='number'
          placeholder='Salary (INR)'
          className='border p-3 rounded-lg'
          id='salary'
          required
        />
        <input
          type='text'
          placeholder='Location'
          className='border p-3 rounded-lg'
          id='location'
          required
        />
        <select
          id='workType'
          className='border p-3 rounded-lg'
          required
        >
          <option value=''>Select Work Type</option>
          <option value='Remote'>Remote</option>
          <option value='On-site'>On-site</option>
          <option value='Hybrid'>Hybrid</option>
        </select>
        <button
          className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95'
        >
          Post Job
        </button>
      </form>
    </main>
  );
}
