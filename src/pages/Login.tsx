import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Package, 
  Users,
  AlertCircle
} from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, admins } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, complete todos los campos requeridos');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Credenciales inválidas. Por favor verifique su correo y contraseña.');
      }
    }, 400);
  };

  const handleSelectAdmin = (adminEmail: string) => {
    setEmail(adminEmail);
    setPassword('123');
    setError('');
  };

  return (
    <div className="min-h-screen w-full bg-[#0B132B] flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden font-sans">
      {/* Background Decorative Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* Left Side: Brand & Feature Showcase (Hidden on small mobile, visible on desktop) */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/80">
          
          {/* Subtle Prism Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}
          />

          {/* Top Brand Header */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-white mb-6">
              <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center font-black text-sm shadow-md shadow-indigo-500/50">
                P
              </div>
              <span className="font-bold tracking-wider text-sm">PRISMA NETWORK</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Sistema Integral de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-white">Gestión Comercial</span> e Inventario
            </h1>

            <p className="mt-4 text-slate-300 text-sm lg:text-base leading-relaxed">
              Optimiza tus procesos, controla tu stock en tiempo real y gestiona clientes y proyectos con máxima eficiencia.
            </p>
          </div>

          {/* Center Features Badges */}
          <div className="my-8 space-y-3.5 relative z-10">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm transition-all hover:bg-white/10 hover:translate-x-1">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 border border-indigo-500/30">
                <Package size={18} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Control Total de Inventario</p>
                <p className="text-slate-400 text-xs">Alertas de stock bajo y actualización en vivo</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm transition-all hover:bg-white/10 hover:translate-x-1">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 border border-sky-500/30">
                <Building2 size={18} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Gestión de Clientes y Proyectos</p>
                <p className="text-slate-400 text-xs">Seguimiento comercial y estados de entregas</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm transition-all hover:bg-white/10 hover:translate-x-1">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Acceso Seguro de Administración</p>
                <p className="text-slate-400 text-xs">Control de permisos de usuarios registrados</p>
              </div>
            </div>
          </div>

          {/* Bottom Security Footer */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-indigo-200 font-medium">
              <Sparkles size={14} className="text-indigo-400 animate-pulse" />
              Versión Enterprise 2.0
            </span>
            <span>© {new Date().getFullYear()} Prisma Network</span>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="lg:col-span-6 bg-slate-900 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
                <ShieldCheck size={14} /> Acceso Administrativo
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Iniciar Sesión</h2>
              <p className="mt-1.5 text-slate-400 text-sm">
                Ingresa tu correo y contraseña para acceder a la plataforma.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-300 p-4 rounded-2xl text-sm animate-shake">
                <AlertCircle size={18} className="shrink-0 text-red-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-200">Error de autenticación</p>
                  <p className="text-red-300/90 text-xs mt-0.5">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="geovany@prisma.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Contraseña
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember me option */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-xs text-slate-400 hover:text-slate-300 transition-colors">Recordar sesión</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Iniciar Sesión</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Users Selector */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Usuarios Administradores Registrados:
                </p>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                  Haz clic para autocompletar
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {admins.map((adm) => {
                  const isSelected = email === adm.email;
                  return (
                    <button
                      key={adm.id}
                      type="button"
                      onClick={() => handleSelectAdmin(adm.email)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-sm'
                          : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {adm.avatar}
                      </div>
                      <span>{adm.name}</span>
                      {isSelected && <CheckCircle2 size={12} className="text-indigo-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

