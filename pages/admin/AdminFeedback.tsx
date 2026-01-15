
import React, { useState } from 'react';
import { UserFeedback } from '../../types';
import { GoogleGenAI } from "@google/genai";

interface AdminFeedbackProps {
  feedbacks: UserFeedback[];
}

export const AdminFeedback: React.FC<AdminFeedbackProps> = ({ feedbacks }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (feedbacks.length === 0) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Berikut adalah daftar saran dan kritik dari pemustaka perpustakaan kami. 
      Tolong buatkan ringkasan singkat dalam bahasa Indonesia mengenai sentimen umum dan area utama yang perlu diperbaiki:
      ${feedbacks.map(f => `- ${f.content}`).join('\n')}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      setSummary(response.text || "Gagal menghasilkan ringkasan.");
    } catch (error) {
      console.error(error);
      setSummary("Error saat menghubungi AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Summary Section */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold">Ringkasan AI (Sentimen)</h3>
            <p className="text-indigo-300 text-xs">Gunakan AI untuk menganalisis seluruh saran pemustaka dengan cepat.</p>
          </div>
          <button 
            onClick={generateSummary}
            disabled={loading || feedbacks.length === 0}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm transition-all disabled:opacity-50"
          >
            {loading ? 'Menganalisis...' : '✨ Ringkas Saran'}
          </button>
        </div>
        
        {summary && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm leading-relaxed animate-in fade-in slide-in-from-top-4 duration-500">
            {summary}
          </div>
        )}
      </div>

      {/* Feedback List */}
      <div className="grid md:grid-cols-2 gap-4">
        {feedbacks.slice().reverse().map(f => (
          <div key={f.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900">{f.name}</h4>
                  <p className="text-xs text-slate-500">{f.institution}</p>
                </div>
                <div className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold uppercase">
                  {new Date(f.date).toLocaleDateString()}
                </div>
              </div>
              <p className="text-slate-600 text-sm italic leading-relaxed">
                "{f.content}"
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-indigo-600 font-bold">📱 {f.phone}</span>
              <button className="text-xs text-slate-400 hover:text-blue-600 transition-colors">Tandai Dibaca</button>
            </div>
          </div>
        ))}

        {feedbacks.length === 0 && (
          <div className="col-span-2 py-20 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
            Belum ada saran atau kritik yang masuk.
          </div>
        )}
      </div>
    </div>
  );
};
