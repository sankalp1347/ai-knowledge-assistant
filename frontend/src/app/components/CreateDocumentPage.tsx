import { useState } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Header } from './Header';
import { createDocument, updateDocument } from '../../services/documentService';

interface CreateDocumentPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onBack: () => void;
  existingDocument?: {
    id: number;
    title: string;
    content: string;
  };
}

export function CreateDocumentPage({
  isDarkMode,
  onToggleTheme,
  onBack,
  existingDocument,
}: CreateDocumentPageProps) {
  const [title, setTitle] = useState(existingDocument?.title || '');
  const [content, setContent] = useState(existingDocument?.content || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;

    setIsSaving(true);

    try {
      if (existingDocument) {
        await updateDocument(existingDocument.id, { title, content });
      } else {
        await createDocument({ title, content });
      }
      onBack(); // go back to dashboard
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header
        title={existingDocument ? 'Edit Document' : 'Create New Document'}
        subtitle="Write your content and ask AI questions about it"
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        action={
          <div className="flex gap-2">
            <Button onClick={onBack} variant="ghost" size="md">
              <ArrowLeft className="size-5" />
              Back
            </Button>
            <Button
              onClick={handleSave}
              variant="primary"
              size="md"
              isLoading={isSaving}
              disabled={!title.trim() || !content.trim()}
            >
              <Save className="size-5" />
              Save
            </Button>
          </div>
        }
      />

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6 fade-in">
          <Input
            label="Document Title"
            placeholder="Enter a descriptive title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl"
          />

          <Textarea
            label="Content"
            placeholder="Start writing your document content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            className="font-mono text-base"
          />

          <div className="flex justify-end gap-3">
            <Button onClick={onBack} variant="ghost" size="lg">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="primary"
              size="lg"
              isLoading={isSaving}
              disabled={!title.trim() || !content.trim()}
            >
              <Save className="size-5" />
              {existingDocument ? 'Update Document' : 'Create Document'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
