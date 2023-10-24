import { useState, useEffect } from 'react'
import './App.css'

function Form() {

  const [countries, setCountries] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [cities, setCities] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect( () => {
    async function paises() {
      const response = await fetch(
        'https://parseapi.back4app.com/classes/Country?limit=300&order=name&keys=name',
        {
          headers: {
            'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja', // This is the fake app's application id
            'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH', // This is the fake app's readonly master key
          }
        }
      );
      const data = await response.json(); 
      setCountries(data.results)
    }
    paises();

    async function obtenerCities () {
      const where = encodeURIComponent(JSON.stringify({
        "country": {
          "__type": "Pointer",
          "className": "Country",
          "objectId": countryCode
        }
      }));
      const response = await fetch(
        `https://parseapi.back4app.com/classes/City?limit=1000&order=name&include=country&keys=name,country,country.name&where=${where}`,
        {
          headers: {
            'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja', // This is the fake app's application id
            'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH', // This is the fake app's readonly master key
          }
        }
      );
      const data = await response.json();
      setCities(data.results) 
    };
    obtenerCities();

  }, [countryCode, selectedCountry] )

  const handleSelectChange = async (e) => {
    let selectedItem = countries.find((item)=> item.name === e.target.value);
    setSelectedCountry(selectedItem?.name);
    setCountryCode(selectedItem?.objectId);
  };

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (/^[a-zA-Z\s]+$/.test(inputValue) || inputValue === '') {
      setInputValue(inputValue);
      setError('');
    } else {
      setError('El campo solo puede contener letras alfabéticas');
    }
  };

  const [errorMail, setErrorMail] = useState('');

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(inputValue) || inputValue === '') {
      setErrorMail('');
    } else {
      setErrorMail('Ingrese un correo electrónico válido');
    }
  };

  return (
    <>
      <h1>Form:</h1>
      <form action=''>
        <label htmlFor='name'>Nombre: </label>
        <input className='input' type='text' name='name' id='name' value={inputValue} onChange={handleInputChange}/><br/>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <label htmlFor='email'>Correo electrónico: </label>
        <input className='input'
          type="email"
          id="email"
          name="email"
          onChange={handleEmailChange}
        />
        {errorMail && <p style={{ color: 'red' }}>{errorMail}</p>}<br/>
        
        <label htmlFor='country'>País: </label>
        <input className='input' list='countries' name='country' id='country' placeholder="Selecciona un país" value={selectedCountry}
        onChange={handleSelectChange}/><br/>
        <datalist id='countries'>
          {countries? 
            countries.map((country, index) => (
            <option key={index} value={country.name}></option>
          )) : null}
        </datalist>
        
        <label htmlFor='city'>Ciudad: </label>
        <input className='input' list='cities' name='city' id='city' placeholder="Selecciona una ciudad" /><br/>
        <datalist id='cities'>
        {cities? 
            cities.map((city, index) => (
            <option key={index} value={city.name}></option>
          )) : null}
        </datalist>
        
      </form>
      
    </>
  )
}

export default Form
