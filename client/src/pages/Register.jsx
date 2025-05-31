
import React, { useState } from 'react';
import { registerUser } from '../api/auth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        email: form.email.trim() || null,
      };
      delete payload.confirmPassword;
      await registerUser(payload);
      toast.success("Inscription réussie ! Vous pouvez vous connecter.");
      setForm({ username: '', email: '', password: '', confirmPassword: '', role: 'user' });
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Erreur lors de l'inscription");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-2"
          name="username"
          placeholder="Nom d'utilisateur"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 w-full mb-2"
          name="email"
          type="email"
          placeholder="Email (optionnel)"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full mb-2"
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 w-full mb-2"
          name="confirmPassword"
          type="password"
          placeholder="Confirmer le mot de passe"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <select
          className="border p-2 w-full mb-2"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">Utilisateur</option>
          <option value="admin">Admin</option>
        </select>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <span>Déjà un compte ? </span>
        <Link to="/login" className="text-blue-600 hover:underline">Se connecter</Link>
      </div>
    </div>
  );
};

export default Register;
