import { useState } from 'react';
import { Dropdown } from '../components/Dropdown';
import Input from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton';
import BackArrow from '../components/BackArrow';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userNameInput, setUserNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [roleAccount, setRoleAccount] = useState({ value: '', label: '' });

  const [statusMsg, setStatusMsg] = useState('');

  async function handleSubmit() {
    const newUser = {
      FirstName: firstName,
      LastName: lastName,
      UserName: userNameInput,
      Password: passwordInput,
      TableName: roleAccount.value,
    };

    console.log(newUser);

    try {
      const response = await fetch(
        'https://johntest-linux-gzbpcmd8hcbphue0.swedencentral-01.azurewebsites.net/api/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      setStatusMsg('Användaren skapad!');

      setFirstName('');
      setLastName('');
      setUserNameInput('');
      setPasswordInput('');
      setRoleAccount({ value: '', label: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <main className='p-8 flex flex-col justify-center items-center gap-8'>
      <BackArrow />
      <h1 className='text-4xl font-bold text-text-dark mb-2'>Skapa konto</h1>

      <Input
        label='Förnamn'
        name='firstName'
        id='firstName'
        type='text'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className='max-sm:w-full'
      />

      <Input
        label='Efternamn'
        name='lastName'
        id='lastName'
        type='text'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className='max-sm:w-full'
      />

      <Input
        label='Username'
        name='Username'
        id='Username'
        type='text'
        value={userNameInput}
        onChange={(e) => setUserNameInput(e.target.value)}
        className='max-sm:w-full'
      />

      <Input
        label='Lösenord'
        name='password'
        id='password'
        type='password'
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        className='max-sm:w-full'
      />

      <Dropdown
        options={[
          { value: 'Drivers', label: 'Driver' },
          { value: 'logistics', label: 'Logistik' },
          { value: 'tracking', label: 'Spårning' },
          { value: 'data', label: 'Data' },
        ]}
        selectedValue={roleAccount.value}
        onSelect={(o) => setRoleAccount(o)}
        placeholder='Välj kontotyp'
        className='
      w-100
      max-sm:w-full'
      />

      <PrimaryButton
        text='Registrera'
        fullWidth={true}
        onClick={handleSubmit}
      />

      {statusMsg}
    </main>
  );
}

export default SignUp;
