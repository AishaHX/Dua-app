import React, { useState, useEffect } from 'react'
import './App.css' // Custom CSS for styling

const App = () => {
  const [duas, setDuas] = useState([])
  const [filteredDuas, setFilteredDuas] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('أذكار الصباح')

  // Fetch data from the JSON file in the public folder
  useEffect(() => {
    fetch('/azkar.json') // Relative path to the JSON file in the public folder
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        if (data[selectedCategory]) {
          setDuas(data[selectedCategory])
          setFilteredDuas(data[selectedCategory])
        } else {
          console.error(
            'Selected category not found in data:',
            selectedCategory
          )
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [selectedCategory])

  const filterDuas = category => {
    setSelectedCategory(category)
    if (Array.isArray(duas)) {
      setFilteredDuas(duas)
    } else {
      console.error('Invalid category or data structure')
    }
  }

  return (
    <div className='app'>
      <header className='header'>
        <h1>Dua App</h1>
      </header>

      <div className='category-selector'>
        <button onClick={() => filterDuas('أذكار الصباح')}>Morning Duas</button>
        <button onClick={() => filterDuas('أذكار المساء')}>Evening Duas</button>

        <button
          onClick={() => filterDuas('أذكار بعد السلام من الصلاة المفروضة')}
        >
          Duas after obligatory prayers
        </button>
        <button onClick={() => filterDuas('تسابيح')}>Tasbeeh</button>
      </div>

      <div className='dua-grid'>
        {filteredDuas.map(
          (dua, index) =>
            dua.content && (
              <div className='dua-card' key={index}>
                <p>{dua.content}</p>
                <p>
                  <strong>Repeat:</strong> {dua.count} time(s)
                </p>
              </div>
            )
        )}
      </div>

      <footer className='footer'>
        <p>Developed by Aisha | Dua App</p>
      </footer>
    </div>
  )
}

export default App
