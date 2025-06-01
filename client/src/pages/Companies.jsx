import React, { useEffect, useState } from 'react';
import AddCompanyForm from './AddCompanyForm';
import { toast } from 'react-toastify';
import { getCompanies } from '../api/company';
import { useAuth } from '../hooks/useAuth';

const Companies = () => {
  const { token } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

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

  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Entreprises</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setShowAddForm(true)}
        >
          Ajouter Entreprise
        </button>
      </div>
      {showAddForm && (
        <AddCompanyForm
          onClose={(refresh = false, message = null, isError = false) => {
            setShowAddForm(false);
            if (refresh) fetchCompanies();
            if (message) {
              if (isError) toast.error(message);
              else toast.success(message);
            }
          }}
        />
      )}
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
