import { useState } from "react";
import { resetData } from "../data/dataManager";
import { CARD_COLORS } from "../components/ButtonCard";
import BackButton from "../components/BackButton";

const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

function LoginGate({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem("admin-auth", "1");
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6">
          <BackButton />
        </div>
        <form
          onSubmit={handleSubmit}
          className="animate-scale-in rounded-2xl border border-white/10 bg-surface p-8 shadow-2xl"
        >
          <h1 className="mb-6 text-center text-2xl font-bold text-white">כניסת מנהל</h1>

          <div className="mb-4">
            <label className="mb-1.5 block text-sm text-slate-400">שם משתמש</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-surface-light px-4 py-2.5 text-white outline-none transition-colors focus:border-primary/50"
              autoFocus
            />
          </div>

          <div className="mb-6">
            <label className="mb-1.5 block text-sm text-slate-400">סיסמה</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-surface-light px-4 py-2.5 text-white outline-none transition-colors focus:border-primary/50"
            />
          </div>

          {error && (
            <p className="animate-fade-in mb-4 text-center text-sm text-red-400">
              שם משתמש או סיסמה שגויים
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-2.5 font-medium text-white transition-colors hover:bg-primary-light"
          >
            כניסה
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage({ data, setData }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin-auth") === "1");
  const [editingId, setEditingId] = useState(null);
  const [saved, setSaved] = useState(false);

  if (!authed) {
    return <LoginGate onLogin={() => setAuthed(true)} />;
  }

  function showSaved() {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function handleTitleChange(e) {
    setData({ ...data, mainTitle: e.target.value });
  }

  function handleTitleBlur() {
    showSaved();
  }

  function handleFieldChange(id, field, value) {
    setData({
      ...data,
      buttons: data.buttons.map((b) =>
        b.id === id ? { ...b, [field]: value } : b
      ),
    });
  }

  function handleSaveButton() {
    setEditingId(null);
    showSaved();
  }

  function handleAddButton() {
    const maxId = data.buttons.reduce((max, b) => Math.max(max, b.id), 0);
    const newButton = {
      id: maxId + 1,
      title: "כפתור חדש",
      subtitle: "",
      text: "תוכן הכפתור...",
      image: "",
    };
    setData({ ...data, buttons: [...data.buttons, newButton] });
    setEditingId(newButton.id);
    showSaved();
  }

  function handleDeleteButton(id) {
    if (data.buttons.length <= 1) {
      alert("לא ניתן למחוק את הכפתור האחרון.");
      return;
    }
    if (!window.confirm("למחוק את הכפתור הזה?")) return;
    setData({
      ...data,
      buttons: data.buttons.filter((b) => b.id !== id),
    });
    if (editingId === id) setEditingId(null);
    showSaved();
  }

  function handleReset() {
    if (window.confirm("לאפס את כל התוכן לברירת המחדל? לא ניתן לבטל פעולה זו.")) {
      setData(resetData());
      setEditingId(null);
      showSaved();
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("admin-auth");
    setAuthed(false);
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton />
            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-400 transition-colors hover:border-white/20 hover:text-white"
            >
              התנתק
            </button>
          </div>
          {saved && (
            <span className="animate-fade-in rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">
              נשמר
            </span>
          )}
        </div>

        <h1 className="mb-8 text-3xl font-bold text-white">לוח ניהול</h1>

        {/* Main Title */}
        <section className="mb-8 rounded-xl border border-white/10 bg-surface p-6">
          <label className="mb-2 block text-sm font-medium text-slate-400">
            כותרת ראשית
          </label>
          <input
            type="text"
            value={data.mainTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            className="w-full rounded-lg border border-white/10 bg-surface-light px-4 py-2.5 text-white outline-none transition-colors focus:border-primary/50"
          />
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              תוכן הכפתורים
              <span className="mr-2 text-sm font-normal text-slate-500">
                ({data.buttons.length})
              </span>
            </h2>
            <button
              onClick={handleAddButton}
              className="flex items-center gap-2 rounded-lg bg-emerald-600/20 px-4 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-600/30"
            >
              <span className="text-lg leading-none">+</span>
              הוסף כפתור
            </button>
          </div>

          {data.buttons.map((button, index) => {
            const color = CARD_COLORS[index % CARD_COLORS.length];
            return (
              <div
                key={button.id}
                className="rounded-xl border border-white/10 bg-surface p-6 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${color.gradient} text-xs font-bold text-white`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium text-white">{button.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setEditingId(editingId === button.id ? null : button.id)
                      }
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-primary/40 hover:text-white"
                    >
                      {editingId === button.id ? "ביטול" : "עריכה"}
                    </button>
                    <button
                      onClick={() => handleDeleteButton(button.id)}
                      className="rounded-lg border border-red-500/20 px-3 py-1.5 text-sm text-red-400/70 transition-colors hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/5"
                    >
                      מחק
                    </button>
                  </div>
                </div>

                {editingId === button.id && (
                  <div className="animate-expand mt-6 space-y-4">
                    <Field
                      label="כותרת"
                      value={button.title}
                      onChange={(v) => handleFieldChange(button.id, "title", v)}
                    />
                    <Field
                      label="כותרת משנה"
                      value={button.subtitle}
                      onChange={(v) => handleFieldChange(button.id, "subtitle", v)}
                    />
                    <Field
                      label="טקסט"
                      value={button.text}
                      onChange={(v) => handleFieldChange(button.id, "text", v)}
                      multiline
                    />
                    <Field
                      label="קישור לתמונה (אופציונלי)"
                      value={button.image}
                      onChange={(v) => handleFieldChange(button.id, "image", v)}
                      placeholder="https://example.com/image.jpg"
                    />
                    <button
                      onClick={handleSaveButton}
                      className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
                    >
                      שמור
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Reset */}
        <div className="mt-8 border-t border-white/5 pt-8">
          <button
            onClick={handleReset}
            className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
          >
            איפוס לברירת מחדל
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, multiline, placeholder }) {
  const shared =
    "w-full rounded-lg border border-white/10 bg-surface-light px-4 py-2.5 text-white outline-none transition-colors focus:border-primary/50";

  return (
    <div>
      <label className="mb-1.5 block text-sm text-slate-400">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className={`${shared} resize-y`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={shared}
        />
      )}
    </div>
  );
}
