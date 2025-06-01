import React, { useState } from 'react';
import { createCompany } from '../api/company';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';


const AddCompanyForm = ({ onClose }) => {
  const { token, user } = useAuth();
  const [form, setForm] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    type: '',
    userId: user?.id || '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Update userId if user changes (shouldn't happen, but for safety)
  React.useEffect(() => {
    setForm((prev) => ({ ...prev, userId: user?.id || '' }));
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createCompany({ ...form, userId: user?.id }, token);
      toast.success('Entreprise ajoutée avec succès');
      onClose(true);
    } catch (err) {
      setError("Erreur lors de l'ajout de l'entreprise");
    //toast.error("Erreur lors de l'ajout de l'entreprise");
      onClose(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
        <h2 className="text-lg font-bold mb-4">Ajouter une entreprise</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nom</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Adresse</label>
            <input name="address" value={form.address} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Téléphone</label>
            <input name="phone" value={form.phone} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Identifiant Fiscal</label>
            <input name="type" value={form.type} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full" disabled={loading}>
            {loading ? 'Ajout...' : 'Ajouter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyForm;
