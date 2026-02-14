import { useEffect, useState } from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { Header } from './Header';
import { SkeletonGrid } from './SkeletonLoader';
import { getDocuments } from '../../services/documentService';

interface Document {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface DashboardPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onCreateDocument: () => void;
  onAskAI: (documentId: number) => void;
  onSelectDocument: (documentId: number) => void;
}

export function DashboardPage({
  isDarkMode,
  onToggleTheme,
  onCreateDocument,
  onAskAI,
  onSelectDocument,
}: DashboardPageProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDocuments()
      .then((data) => setDocuments(data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header
        title="My Documents"
        subtitle={`${documents.length} document${documents.length !== 1 ? 's' : ''}`}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        action={
          <Button onClick={onCreateDocument} variant="primary" size="md">
            <FileText className="size-5" />
            New Document
          </Button>
        }
      />

      <main className="flex-1 p-6">
        {isLoading ? (
          <SkeletonGrid count={6} />
        ) : documents.length === 0 ? (
          <EmptyState onCreateDocument={onCreateDocument} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in">
            {documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onAskAI={() => onAskAI(doc.id)}
                onSelect={() => onSelectDocument(doc.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function DocumentCard({
  document,
  onAskAI,
  onSelect,
}: {
  document: Document;
  onAskAI: () => void;
  onSelect: () => void;
}) {
  return (
    <Card variant="default" hover className="flex flex-col gap-4" onClick={onSelect}>
      <div className="flex items-start gap-3">
        <div className="size-12 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shrink-0 shadow-md">
          <FileText className="size-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{document.title}</h3>
          <p className="text-sm text-muted-foreground">
            {new Date(document.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-3">
        {document.content.slice(0, 120)}...
      </p>

      <div className="flex gap-2 mt-auto">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          <FileText className="size-4" />
          Edit
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onAskAI();
          }}
        >
          <Sparkles className="size-4" />
          Ask AI
        </Button>
      </div>
    </Card>
  );
}

function EmptyState({ onCreateDocument }: { onCreateDocument: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6 max-w-md fade-in">
        <div className="flex justify-center">
          <div className="size-24 rounded-3xl bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 flex items-center justify-center shadow-lg">
            <FileText className="size-12 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">No documents yet</h2>
          <p className="text-muted-foreground">
            Get started by creating your first document.
          </p>
        </div>

        <Button onClick={onCreateDocument} variant="primary" size="lg">
          <FileText className="size-5" />
          Create Your First Document
        </Button>
      </div>
    </div>
  );
}
