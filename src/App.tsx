
    import './App.css';
    
    const docsLinks = [
      { name: 'Vite', url: 'https://vitejs.dev' },
      { name: 'React', url: 'https://react.dev' },
      { name: 'TailwindCSS', url: 'https://tailwindcss.com/docs' },
      { name: 'Shadcn/UI', url: 'https://ui.shadcn.com/' },
    ];
    
    function App() {
      return (
        <div className="min-h-screen py-8 px-4 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Didi-Stack UI Starter kit</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {docsLinks.map((doc) => (
              <a
                key={doc.name}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-200 p-6 shadow-lg rounded-lg transform transition hover:scale-105 hover:shadow-2xl"
              >
                <h2 className="text-xl font-semibold text-center text-gray-700">{doc.name}</h2>
              </a>
            ))}
          </div>
          <footer className="mt-12 text-gray-600">
            <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
          </footer>
        </div>
      );
    }
    
    export default App;
    