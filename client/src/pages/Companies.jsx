import React, { useEffect, useState } from 'react';
import { getCompanies } from '../api/company';
import { useAuth } from '../hooks/useAuth';

const Companies = () => {
  const { token } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getCompanies(token);
        setCompanies(data);
      } catch (err) {
        setError('Erreur lors du chargement des entreprises');
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, [token]);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Entreprises</h2>
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <ul className="space-y-2">
          {companies.length === 0 ? (
            <li>Aucune entreprise trouvée.</li>
          ) : (
            companies.map((c) => (
              <li key={c.id} className="border p-2 rounded">
                <span className="font-semibold">{c.name}</span>
                {c.email && <span className="ml-2 text-gray-500">({c.email})</span>}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Companies;
