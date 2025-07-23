import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  async function handleSearch() {
    if (!query) return;
    const res = await fetch(`/api/parts?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
      <Head>
        <title>EasyFarmingUS</title>
      </Head>
      <h1>EasyFarmingUS</h1>
      <input
        type="search"
        placeholder="Search equipment or part"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: '8px', width: '300px', marginRight: '8px' }}
      />
      <button onClick={handleSearch}>Search</button>
      <h2>Featured Brands & Models</h2>
      <ul>
        <li>John Deere</li>
        <li>Polaris</li>
        <li>Honda</li>
      </ul>
      <h2>Latest Available Parts</h2>
      <ul>
        <li>Tractor Wheel (2021) - <Link href="/part/1">View</Link></li>
        <li>ATV Brake Pad (2019) - <Link href="/part/2">View</Link></li>
      </ul>
      {results.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {results.map(part => (
              <li key={part.id}>
                {part.name} - <Link href={`/part/${part.id}`}>View</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
