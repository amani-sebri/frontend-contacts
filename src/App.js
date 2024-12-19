import React from 'react';
import './assets/App.css'; 
import './assets/ContactManager.css';
import ContactManager from './components/contact/ContactManager'; // Import your ContactManager component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Contact Management App</h1>
      </header>
      <main>
        {/* Render the ContactManager component */}
        <ContactManager />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Contact Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
