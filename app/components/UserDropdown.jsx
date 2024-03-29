'use client';
import { useRouter } from 'next/navigation';
import constants from '../constants';
import { useUserContext } from '../context';

export default function UserDropdown() {
  const { state, setState } = useUserContext();
  const router = useRouter();

  const handleChange = (event) => {
    if (!event || event.target.value === '') {
      return;
    }
    setState({
      userType: event.target.value,
    });

    router.push(event.target.value);
  };

  return (
    <>
      <label htmlFor='user-type-menu' className='text-sm'>
        Select a user-type to proceed :{' '}
      </label>
      <select
        className='border rounded border-violet-900 p-2 shadow-inner border-opacity-20'
        onChange={handleChange}
        value={state.userType}
        id='user-type-menu'
      >
        <option value={''} disabled>
          {'select an option'}
        </option>
        {Object.entries(constants.USERS).map(([key, value], utIdx) => (
          <option key={`user-${key}-${utIdx + 1}`} className='capitalize' value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}
