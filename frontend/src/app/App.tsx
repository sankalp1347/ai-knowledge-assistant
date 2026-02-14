import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { DashboardPage } from './components/DashboardPage';
import { CreateDocumentPage } from './components/CreateDocumentPage';
import { AskAIPage } from './components/AskAIPage';
import { Sidebar } from './components/Sidebar';

import { logout } from '../services/authService';
import { getDocuments, createDocument, deleteDocument } from '../services/documentService';
import { askAI } from '../services/aiService';

type Page = 'login' | 'register' | 'documents' | 'create' | 'edit' | 'ask-ai';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);

  // ✅ JWT check on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setCurrentPage('documents');
    }
  }, []);

  // Theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // ✅ Load documents from backend
  useEffect(() => {
    if (isAuthenticated && currentPage === 'documents') {
      setIsLoading(true);
      getDocuments()
        .then((data) => setDocuments(data))
        .finally(() => setIsLoading(false));
    }
  }, [isAuthenticated, currentPage]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('documents');
    toast.success('Welcome back!');
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setCurrentPage('documents');
    toast.success('Account created!');
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setCurrentPage('login');
    setDocuments([]);
    setSelectedDocumentId(null);
    toast.info('Logged out');
  };

  const handleCreateDocument = () => {
    setCurrentPage('create');
    setSelectedDocumentId(null);
  };

  // ✅ Save document to backend
  const handleSaveDocument = async (title: string, content: string) => {
    await createDocument({ title, content });
    toast.success('Document saved!');
    setCurrentPage('documents');
  };

  const handleSelectDocument = (documentId: number) => {
    setSelectedDocumentId(documentId);
    setCurrentPage('edit');
  };

  const handleAskAI = (documentId: number) => {
    setSelectedDocumentId(documentId);
    setCurrentPage('ask-ai');
  };

  const handleNavigate = (page: string) => {
    if (page === 'documents') {
      setCurrentPage('documents');
      setSelectedDocumentId(null);
    } else if (page === 'create') {
      handleCreateDocument();
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const selectedDocument = selectedDocumentId
    ? documents.find((doc) => doc.id === selectedDocumentId)
    : undefined;

  // Auth pages
  if (!isAuthenticated) {
    return (
      <>
        {currentPage === 'login' && (
          <LoginPage
            onLogin={handleLogin}
            onNavigateToRegister={() => setCurrentPage('register')}
          />
        )}
        {currentPage === 'register' && (
          <RegisterPage
            onRegister={handleRegister}
            onNavigateToLogin={() => setCurrentPage('login')}
          />
        )}
        <Toaster position="top-right" richColors theme={isDarkMode ? 'dark' : 'light'} />
      </>
    );
  }

  // Main app
  return (
    <div className="min-h-screen w-full gradient-bg">
      <div className="gradient-overlay" />
      <div className="flex relative z-10">
        <Sidebar
          currentPage={currentPage === 'edit' ? 'documents' : currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />

        <div className="flex-1">
          {currentPage === 'documents' && (
            <DashboardPage
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
              onCreateDocument={handleCreateDocument}
              onAskAI={handleAskAI}
              onSelectDocument={handleSelectDocument}
            />
          )}

          {currentPage === 'create' && (
            <CreateDocumentPage
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
              onSave={handleSaveDocument}
              onBack={() => setCurrentPage('documents')}
            />
          )}

          {currentPage === 'edit' && selectedDocument && (
            <CreateDocumentPage
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
              onSave={handleSaveDocument}
              onBack={() => setCurrentPage('documents')}
              existingDocument={{
                id: selectedDocument.id,
                title: selectedDocument.title,
                content: selectedDocument.content,
              }}
            />
          )}

          {currentPage === 'ask-ai' && selectedDocument && (
            <AskAIPage
              document={selectedDocument}
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
              onBack={() => setCurrentPage('documents')}
            />
          )}
        </div>
      </div>

      <Toaster position="top-right" richColors theme={isDarkMode ? 'dark' : 'light'} />
    </div>
  );
}
