'use client';

import { useAdminContext } from '../../context/admin';
import Creator from './Creator';

export default function Actor() {
  const {
    adminState: { selectedWord },
    deleteWord,
    switchToEditMode,
    isAnyProcessOngoing,
  } = useAdminContext();

  const handleDelete = () => {
    const confirmed = confirm(`Are you sure you want to delete this word, ${selectedWord.word}?`);

    if (!confirmed) return;

    deleteWord();
  };

  if (!selectedWord) {
    return <div>Please select a word to take actions!</div>;
  }

  return (
    <div className='grid grid-rows-2 p-2 bg-emerald-100 gap-4'>
      <div className='divide-y divide-fuchsia-300 grid gap-1 content-center'>
        <div className='text-4xl'>Word details</div>
        <div className='grid grid-cols-4'>
          <p className='grid col-span-1'>Internal-id</p>
          <p className='grid col-span-2'>{selectedWord.id}</p>
        </div>
        <div className='grid grid-cols-4'>
          <p className='grid col-span-1'>Word</p>
          <p className='grid col-span-2'>{selectedWord.word}</p>
        </div>
        <div className='grid grid-cols-4'>
          <p className='grid col-span-1'>Definition</p>
          <p className='grid col-span-2'>{selectedWord.definition}</p>
        </div>
        <div />
      </div>
      <div className='grid grid-cols-2 gap-2 p-2 place-content-end'>
        <button
          className='p-2 bg-green-400 place-self-start w-1/2'
          onClick={switchToEditMode}
          disabled={isAnyProcessOngoing}
        >
          Edit
        </button>
        {selectedWord && (
          <button
            className='p-2 bg-red-400 place-self-end w-1/2'
            onClick={handleDelete}
            disabled={isAnyProcessOngoing}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
