import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { motion } from 'framer-motion';
import coachImg from './images/coach.png';

function App() {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    weight_kg: '',
    height_cm: '',
    activity_level: 'sedentary'
  });
const coaches = [
  {
    name: "Coach Mark",
    image: coachImg,
    phone: "123-456-7890",
    email: "Mark@Fit.com",
  },
  {
    name: "Coach Diana",
    image: coachImg,
    phone: "987-654-3210",
    email: "Diana@Fit.com",
  },
  {
    name: "Coach Eric",
    image: coachImg,
    phone: "456-789-0123",
    email: "Eric@Fit.com",
  },
  {
    name: "Coach Emma",
    image: coachImg,
    phone: "321-654-9870",
    email: "Emma@Fit.com",
  },
];
  const [currentCoach, setCurrentCoach] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const { age, gender, weight_kg, height_cm, activity_level } = formData;

    if (!age || !gender || !weight_kg || !height_cm || !activity_level) {
      setError('⚠️ Please fill in all fields.');
      return;
    }

    if (+age <= 0 || +weight_kg <= 0 || +height_cm <= 0) {
      setError('⚠️ Age, weight, and height must be positive numbers.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/calculate/', formData);
      setResults({
        bmr: res.data.BMR,
        tdee: res.data.TDEE,
        ...res.data.calories
      });
    } catch (err) {
      setError('🚫 ERROR CONNECTING TO API');
      console.error(err.response?.data || err.message);
    }
  };

  const handleReset = () => {
    setFormData({
      age: '',
      gender: 'male',
      weight_kg: '',
      height_cm: '',
      activity_level: 'sedentary'
    });
    setResults(null);
    setError('');
  };

  return (
    <div className="App">
      <h2>Welcome to our</h2>
      <h1>🥗 Calorie Calculator 🥗</h1>

      <form onSubmit={handleSubmit}>
        <input name="age" placeholder="Age 🔢" type="number" value={formData.age} onChange={handleChange} />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">👨 Male</option>
          <option value="female">👩 Female</option>
        </select>
        <input name="weight_kg" placeholder="Weight (Kg) ⚖️" type="number" value={formData.weight_kg} onChange={handleChange} />
        <input name="height_cm" placeholder="Height (Cm) 📏" type="number" value={formData.height_cm} onChange={handleChange} />
        <select name="activity_level" value={formData.activity_level} onChange={handleChange}>
          <option value="sedentary">🪑 Sedentary</option>
          <option value="light">🚶 Lightly Active</option>
          <option value="moderate">🏃 Moderately Active</option>
          <option value="active">💪 Very Active</option>
          <option value="very_active">🔥 Extremely Active</option>
        </select>

        <div className="button-group">
          <button type="submit">Calculate 🔍</button>
          <button type="button" className="reset-btn" onClick={handleReset}>Reset ♻️</button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {results && (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="result"
  >
    {/* <h2>📊 Results</h2> */}
    <p><strong>Basal Metabolic Rate (BMR) :</strong> {Math.round(results.bmr)} Cal</p>
    <p><strong>Total Daily Energy Expenditure (TDEE) :</strong> {Math.round(results.tdee)} Cal</p>

    <h2 style={{ marginTop: '20px' }}>🍽️ Daily Calorie Recommendations</h2>
    <p>✅ To maintain weight: <strong>{results.maintain} Cal</strong></p>
    <p>🔻 Mild weight loss: <strong>{results.mild_loss} Cal</strong></p>
    <p>🔻 Weight loss: <strong>{results.loss} Cal</strong></p>
    <p>⚠️ Extreme weight loss: <strong>{results.extreme_loss} Cal</strong></p>
    <p>🔺 Mild weight gain: <strong>{results.mild_gain} Cal</strong></p>
    <p>🔺 Weight gain: <strong>{results.gain} Cal</strong></p>
    <p>📈 Fast weight gain: <strong>{results.fast_gain} Cal</strong></p>



    <div className="coach-section">
  <h2>Let Our Friendly Coaches Guide You to a Healthier Lifestyle</h2>
  <div className="carousel">
    <button onClick={() => setCurrentCoach((prev) => (prev - 1 + coaches.length) % coaches.length)}>←</button>

    <div className="coach-card">
      <img src={coaches[currentCoach].image} alt={coaches[currentCoach].name} />
      <h3>{coaches[currentCoach].name}</h3>
      <p>📞 {coaches[currentCoach].phone}</p>
      <p>✉️ {coaches[currentCoach].email}</p>
    </div>

    <button onClick={() => setCurrentCoach((prev) => (prev + 1) % coaches.length)}>→</button>
  </div>
</div>

  </motion.div>

  
)}
    </div>
  );
}

export default App;
