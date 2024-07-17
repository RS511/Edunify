import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('contact', data.contact);
    formData.append('email_id', data.email_id);
    formData.append('image', image);

    await axios.post('/api/schools', formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} placeholder='School Name' />
      {errors.name && <span>This field is required</span>}
      
      <input {...register('address', { required: true })} placeholder='Address' />
      {errors.address && <span>This field is required</span>}
      
      <input {...register('city', { required: true })} placeholder='City' />
      {errors.city && <span>This field is required</span>}
      
      <input {...register('state', { required: true })} placeholder='State' />
      {errors.state && <span>This field is required</span>}
      
      <input {...register('contact', { required: true })} placeholder='Contact' />
      {errors.contact && <span>This field is required</span>}
      
      <input {...register('email_id', { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })} placeholder='Email' />
      {errors.email_id && <span>This field is required</span>}
      
      <input type='file' onChange={(e) => setImage(e.target.files[0])} />
      
      <button type='submit'>Add School</button>
    </form>
  );
}
