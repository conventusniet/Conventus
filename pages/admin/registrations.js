import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import {
  LogOut, Search, CheckCircle, XCircle, RefreshCw, ExternalLink, Clock, ShieldCheck, AlertCircle,
} from 'lucide-react';

const STATUS_STYLES = {
  'Verified': 'bg-green-100 text-green-800 border-green-300',
  'Rejected': 'bg-red-100 text-red-700 border-red-300',
  'Pending Verification': 'bg-amber-100 text-amber-800 border-amber-300',
};

export default function RegistrationsAdmin() {
  const [authed, setAuthed] = useState(null); // null = checking
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [regs, setRegs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState('');

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const fetchRegs = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/admin/registrations');
      if (res.status === 401) { setAuthed(false); return; }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load');
      setRegs(Array.isArray(data.registrations) ? data.registrations : []);
      setAuthed(true);
    } catch (e) {
      setError(e.message);
      setAuthed(true); // authed but backend error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRegs(); }, []);

  const login = async (e) => {
    e.preventDefault();
    setLoggingIn(true); setLoginError('');
    try {
      const res = await fetch('/api/admin/reg-login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Login failed');
      setCreds({ username: '', password: '' });
      await fetchRegs();
    } catch (e) {
      setLoginError(e.message);
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = async () => {
    await fetch('/api/admin/reg-logout', { method: 'POST' });
    setAuthed(false); setRegs([]);
  };

  const setStatus = async (regId, status) => {
    setBusyId(regId);
    try {
      const res = await fetch('/api/admin/registrations', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regId, status }),
      });
      if (!res.ok) throw new Error();
      setRegs((prev) => prev.map((r) => (r['Reg ID'] === regId ? { ...r, Status: status } : r)));
    } catch {
      setError('Could not update status. Try again.');
    } finally {
      setBusyId('');
    }
  };

  const summary = useMemo(() => {
    const s = { total: regs.length, pending: 0, verified: 0, rejected: 0, collected: 0 };
    for (const r of regs) {
      const st = r['Status'];
      if (st === 'Verified') { s.verified++; s.collected += Number(r['Fee (₹)']) || 0; }
      else if (st === 'Rejected') s.rejected++;
      else s.pending++;
    }
    return s;
  }, [regs]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return regs.filter((r) => {
      if (filter !== 'All' && r['Status'] !== filter) return false;
      if (!q) return true;
      return ['Name', 'Email', 'Phone', 'Institution', 'Reg ID'].some(
        (k) => String(r[k] || '').toLowerCase().includes(q)
      );
    });
  }, [regs, query, filter]);

  // ---------- Login screen ----------
  if (authed === false) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center p-4">
        <Head><title>Admin — Conventus Registrations</title></Head>
        <form onSubmit={login} className="bg-white w-full max-w-sm p-8 border-t-8 border-primary">
          <div className="flex items-center gap-2 text-primary mb-1"><ShieldCheck size={20} /><span className="eyebrow text-xs font-bold">ADMIN ACCESS</span></div>
          <h1 className="font-serif-display text-2xl font-bold text-ink mb-6">Registrations Dashboard</h1>
          <label className="block text-xs font-bold text-ink mb-1">Username</label>
          <input className="w-full py-2.5 px-3 border border-ink/15 text-sm mb-4 focus:ring-1 focus:ring-primary focus:border-primary"
            value={creds.username} onChange={(e) => setCreds({ ...creds, username: e.target.value })} autoFocus />
          <label className="block text-xs font-bold text-ink mb-1">Password</label>
          <input type="password" className="w-full py-2.5 px-3 border border-ink/15 text-sm mb-5 focus:ring-1 focus:ring-primary focus:border-primary"
            value={creds.password} onChange={(e) => setCreds({ ...creds, password: e.target.value })} />
          {loginError && <p className="text-primary text-xs mb-4 flex items-center gap-1 font-semibold"><AlertCircle size={12} /> {loginError}</p>}
          <button type="submit" disabled={loggingIn} className="btn-primary w-full disabled:opacity-60">{loggingIn ? 'Signing in…' : 'Sign In'}</button>
        </form>
      </div>
    );
  }

  if (authed === null) {
    return <div className="min-h-screen bg-paper flex items-center justify-center text-ink-500 text-sm">Loading…</div>;
  }

  // ---------- Dashboard ----------
  return (
    <div className="min-h-screen bg-paper">
      <Head><title>Registrations — Conventus Admin</title></Head>
      <header className="bg-ink text-white px-6 py-4 flex items-center justify-between">
        <div>
          <span className="eyebrow text-[10px] text-accent font-bold">CONVENTUS ADMIN</span>
          <h1 className="font-serif-display text-xl font-bold">CMUN Connect Registrations</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchRegs} className="flex items-center gap-1.5 text-xs font-semibold border border-white/30 px-3 py-2 hover:bg-white/10">
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button onClick={logout} className="flex items-center gap-1.5 text-xs font-semibold border border-white/30 px-3 py-2 hover:bg-white/10">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: 'Total', value: summary.total, cls: 'text-ink' },
            { label: 'Pending', value: summary.pending, cls: 'text-amber-700' },
            { label: 'Verified', value: summary.verified, cls: 'text-green-700' },
            { label: 'Rejected', value: summary.rejected, cls: 'text-red-700' },
            { label: 'Collected (₹)', value: summary.collected, cls: 'text-primary' },
          ].map((c) => (
            <div key={c.label} className="bg-white border border-ink/10 p-4">
              <p className="text-[11px] uppercase tracking-wider text-ink-500 font-bold">{c.label}</p>
              <p className={`text-2xl font-bold ${c.cls}`}>{c.value}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input placeholder="Search name, email, phone, college, reg ID…" value={query} onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-ink/15 text-sm bg-white focus:ring-1 focus:ring-primary focus:border-primary" />
          </div>
          <div className="flex gap-1">
            {['All', 'Pending Verification', 'Verified', 'Rejected'].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-xs font-semibold px-3 py-2 border ${filter === f ? 'bg-primary text-white border-primary' : 'bg-white text-ink border-ink/15 hover:border-ink/40'}`}>
                {f === 'Pending Verification' ? 'Pending' : f}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="text-primary text-sm font-semibold mb-3 flex items-center gap-1"><AlertCircle size={14} /> {error}</div>}

        {/* Table */}
        <div className="bg-white border border-ink/10 overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="bg-ink/5 text-left text-[11px] uppercase tracking-wider text-ink-600">
                <th className="px-3 py-3 font-bold">Reg ID</th>
                <th className="px-3 py-3 font-bold">Name</th>
                <th className="px-3 py-3 font-bold">Email / Phone</th>
                <th className="px-3 py-3 font-bold">College</th>
                <th className="px-3 py-3 font-bold">Committee</th>
                <th className="px-3 py-3 font-bold">Fee</th>
                <th className="px-3 py-3 font-bold">Proof</th>
                <th className="px-3 py-3 font-bold">Status</th>
                <th className="px-3 py-3 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 && (
                <tr><td colSpan={9} className="px-3 py-10 text-center text-ink-400">{loading ? 'Loading…' : 'No registrations found.'}</td></tr>
              )}
              {visible.map((r) => (
                <tr key={r['Reg ID']} className="border-t border-ink/5 hover:bg-paper/50 align-top">
                  <td className="px-3 py-3 font-mono text-xs text-ink-700 whitespace-nowrap">{r['Reg ID']}</td>
                  <td className="px-3 py-3 font-semibold text-ink">{r['Name']}</td>
                  <td className="px-3 py-3 text-ink-700 text-xs">{r['Email']}<br />{r['Phone']}</td>
                  <td className="px-3 py-3 text-ink-700 text-xs">{r['Institution']}</td>
                  <td className="px-3 py-3 text-ink-700 text-xs whitespace-nowrap">{r['Committee 1']}<br /><span className="text-ink-400">{r['Category']}</span></td>
                  <td className="px-3 py-3 text-ink-700 whitespace-nowrap">₹{r['Fee (₹)']}</td>
                  <td className="px-3 py-3">
                    {r['Payment Screenshot']
                      ? <a href={r['Payment Screenshot']} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold flex items-center gap-1 text-xs">View <ExternalLink size={11} /></a>
                      : <span className="text-ink-300 text-xs">—</span>}
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 border ${STATUS_STYLES[r['Status']] || STATUS_STYLES['Pending Verification']}`}>
                      {r['Status'] === 'Verified' ? <CheckCircle size={11} /> : r['Status'] === 'Rejected' ? <XCircle size={11} /> : <Clock size={11} />}
                      {r['Status'] === 'Pending Verification' ? 'Pending' : r['Status']}
                    </span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex gap-1">
                      <button disabled={busyId === r['Reg ID'] || r['Status'] === 'Verified'} onClick={() => setStatus(r['Reg ID'], 'Verified')}
                        className="text-[11px] font-bold px-2 py-1.5 bg-green-600 text-white disabled:opacity-40 hover:bg-green-700">Verify</button>
                      <button disabled={busyId === r['Reg ID'] || r['Status'] === 'Rejected'} onClick={() => setStatus(r['Reg ID'], 'Rejected')}
                        className="text-[11px] font-bold px-2 py-1.5 bg-red-600 text-white disabled:opacity-40 hover:bg-red-700">Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink-400 mt-3">Showing {visible.length} of {regs.length} registrations.</p>
      </main>
    </div>
  );
}
