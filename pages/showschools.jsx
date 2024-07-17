import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/schools');
      setSchools(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {schools.map(school => (
        <div key={school.id}>
          <h2>{school.name}</h2>
          <p>{school.address}, {school.city}</p>
          <img src={`/schoolImages/${school.image}`} alt={school.name} />
        </div>
      ))}
    </div>
  );
}
