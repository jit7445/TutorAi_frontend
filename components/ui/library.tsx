"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, FileText, Download, PlayCircle, ExternalLink, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaItem {
  id: string;
  title: string;
  topic: string;
  url: string;
  thumbnailUrl?: string;
  createdAt: string;
  type: "video" | "note";
}

interface TopicGroup {
  topic: string;
  video?: MediaItem;
  note?: MediaItem;
  createdAt: string;
}

export const Library = () => {
  const [groups, setGroups] = useState<TopicGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "video" | "note">("all");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      window.open(url, "_blank");
    }
  };


  useEffect(() => {

    const fetchLibrary = async () => {
      const token = localStorage.getItem("tutorai_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const [notesRes, videosRes] = await Promise.all([
          fetch("http://localhost:3005/api/v1/store/notes", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch("http://localhost:3005/api/v1/store/videos", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        const notes = await notesRes.json();
        const videos = await videosRes.json();

        // Group by topic - using a more robust key to prevent accidental merging
        const topicMap = new Map<string, TopicGroup>();

        // Process notes
        (notes.data || []).forEach((n: any) => {
          const topic = n.topic?.trim() || n.title?.trim() || "Untitled Note";
          const existing = topicMap.get(topic) || { topic, createdAt: n.createdAt };
          topicMap.set(topic, { 
            ...existing, 
            note: { 
              ...n, 
              id: n._id || n.id, 
              url: n.pdfUrl, // Map pdfUrl to url
              thumbnailUrl: n.thumbnailUrl,
              type: "note" 
            },
            createdAt: new Date(n.createdAt) > new Date(existing.createdAt) ? n.createdAt : existing.createdAt
          });
        });

        // Process videos
        (videos.data || []).forEach((v: any) => {
          const topic = v.topic?.trim() || v.title?.trim() || "Untitled Video";
          const existing = topicMap.get(topic) || { topic, createdAt: v.createdAt };
          topicMap.set(topic, { 
            ...existing, 
            video: { 
              ...v, 
              id: v._id || v.id, 
              url: v.videoUrl, // Map videoUrl to url
              type: "video" 
            },
            createdAt: new Date(v.createdAt) > new Date(existing.createdAt) ? v.createdAt : existing.createdAt
          });
        });


        const sortedGroups = Array.from(topicMap.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setGroups(sortedGroups);
      } catch (err) {
        console.error("Failed to fetch library:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  const filteredGroups = groups.filter(group => {
    if (activeTab === "all") return true;
    if (activeTab === "video") return !!group.video;
    if (activeTab === "note") return !!group.note;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (groups.length === 0) return null;

  return (
    <>
      <section id="library" className="py-32 px-4 max-w-7xl mx-auto relative z-40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight">Your Library</h2>
            <p className="text-white/50 font-sans text-lg">Your study topics and generated materials.</p>
          </div>

          <div className="flex p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl relative">
            {(["all", "video", "note"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all z-10",
                  activeTab === tab ? "text-black" : "text-white/40 hover:text-white"
                )}
              >
                <span className="relative z-10">{tab}</span>
                {activeTab === tab && (
                  <motion.div 
                    layoutId="active-tab"
                    className="absolute inset-0 bg-white rounded-xl shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <AnimatePresence mode="popLayout">
            {filteredGroups.map((group) => (
              <motion.div
                key={group.topic}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative p-[1px] rounded-[2.6rem] overflow-hidden transition-all duration-500"
              >
                {/* Animated Border Gradient */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 z-0"
                >
                  <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0,transparent_25%,#2563eb_50%,transparent_75%,transparent_100%)] animate-[spin_3s_linear_infinite]" />
                </motion.div>

                {/* Inner Card Content */}
                <div className="relative z-10 glass-card p-8 rounded-[2.5rem] bg-slate-900/90 backdrop-blur-3xl border border-white/10 flex flex-col min-h-[320px] h-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">


                {/* Topic Header */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      {group.video && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                      {group.note && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                    </div>
                    <div className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                      {new Date(group.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  </h4>

                  {/* PDF Thumbnail / Template Preview */}
                  {group.note?.thumbnailUrl && (
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/5 bg-slate-800">
                       <img 
                         src={group.note.thumbnailUrl} 
                         alt="Note Preview" 
                         className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    </div>
                  )}
                  
                  <div className="flex gap-2 flex-wrap mb-8">
                    {group.video && (
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">Video Ready</span>
                    )}
                    {group.note && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Notes Ready</span>
                    )}
                  </div>
                </div>

                {/* Actions Grid */}
                <div className="space-y-3">
                  {group.video && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedItem(group.video!)}
                        className="flex-1 flex items-center justify-between px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white transition-all group/btn shadow-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Video className="w-5 h-5" />
                          <span className="font-bold text-sm">Watch Video</span>
                        </div>
                        <PlayCircle className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 transition-all translate-x-2 group-hover/btn:translate-x-0" />
                      </button>
                      <button 
                        onClick={() => handleDownload(group.video!.url, `${group.topic}-video.mp4`)}
                        className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                        title="Download Video"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  
                  {group.note && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedItem(group.note!)}
                        className="flex-1 flex items-center justify-between px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all group/btn"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-emerald-400" />
                          <span className="font-bold text-sm">Read Study Notes</span>
                        </div>
                        <Download className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 transition-all translate-x-2 group-hover/btn:translate-x-0" />
                      </button>
                      <button 
                        onClick={() => handleDownload(group.note!.url, `${group.topic}-notes.pdf`)}
                        className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                        title="Download Notes"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>


                {/* Background Decoration */}
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full group-hover:bg-blue-500/10 transition-colors" />
                </div>
              </motion.div>

            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Integrated Media Viewer Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedItem(null)} />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl aspect-video md:aspect-auto md:h-full bg-slate-900/80 rounded-[2.5rem] overflow-hidden border border-white/30 shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col backdrop-blur-3xl"
            >

              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center border border-white/10",
                    selectedItem.type === "video" ? "bg-blue-500/20" : "bg-emerald-500/20"
                  )}>
                    {selectedItem.type === "video" ? <Video className="w-5 h-5 text-blue-400" /> : <FileText className="w-5 h-5 text-emerald-400" />}
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-display text-xl">{selectedItem.topic}</h3>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">{selectedItem.type} session</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleDownload(selectedItem.url, `${selectedItem.topic}-${selectedItem.type}`)}
                    className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <a 
                    href={selectedItem.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open in New Tab
                  </a>
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="px-6 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 transition-all"
                  >
                    Close
                  </button>
                </div>

              </div>

              {/* Viewer Content */}
              <div className="flex-1 bg-black relative">
                {selectedItem.type === "video" ? (
                  <iframe 
                    src={selectedItem.url.replace("watch?v=", "embed/")} 
                    className="w-full h-full border-none"
                    allowFullScreen
                    title={selectedItem.topic}
                  />
                ) : (
                  <object
                    data={`${selectedItem.url}#toolbar=1&navpanes=0`}
                    type="application/pdf"
                    className="w-full h-full border-none"
                  >
                    <div className="flex flex-col items-center justify-center h-full text-white p-8 text-center space-y-6">
                      <FileText className="w-20 h-20 text-white/10" />
                      <div>
                        <h4 className="text-2xl font-bold font-display mb-2">Unable to display PDF</h4>
                        <p className="text-white/40 max-w-md mx-auto">Your browser or the server might be blocking the embedded view.</p>
                      </div>
                      <button 
                        onClick={() => {
                          console.log("Opening URL:", selectedItem.url);
                          window.open(selectedItem.url, "_blank", "noopener,noreferrer");
                        }}
                        className="px-8 py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-500 transition-all flex items-center gap-2 pointer-events-auto cursor-pointer"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Open PDF in New Window
                      </button>
                    </div>
                  </object>

                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


