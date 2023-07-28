'use client';

import { useAdminContext } from '../../context/admin';

export default function Actor() {
  const {
    adminState: { selectedWord, listOfWords },
    deleteWord,
    switchToEditMode,
    isAnyProcessOngoing,
  } = useAdminContext();

  const handleDelete = () => {
    const confirmed = confirm(`Are you sure you want to delete this word, ${selectedWord.word}?`);

    if (!confirmed) return;

    deleteWord()
      .then((result) => alert(result))
      .catch((error) => alert(error));
  };

  if (!selectedWord) {
    return (
      <div className='grid p-2'>
        {listOfWords.length === 0
          ? 'Once there are words to show, this section can show more details about that word!'
          : 'Please select a word or create a new one'}
      </div>
    );
  }

  return (
    <div className='grid grid-rows-2 p-2 bg-emerald-100 gap-4'>
      <div className='divide-y divide-fuchsia-300 grid gap-1'>
        <div className='text-4xl'>Details</div>
        <div className='grid grid-cols-4 items-center'>
          <p className='grid col-span-1'>Internal-id</p>
          <p className='grid col-span-2'>{selectedWord.id}</p>
        </div>
        <div className='grid grid-cols-4 items-center'>
          <p className='grid col-span-1'>Word</p>
          <p className='grid col-span-2'>{selectedWord.word}</p>
        </div>
        <div className='grid grid-cols-4 items-center'>
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
            onClick={() => handleDelete()}
            disabled={isAnyProcessOngoing}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
