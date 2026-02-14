import { useState } from 'react';
import { Sparkles, ArrowLeft, Send } from 'lucide-react';
import { Button } from './Button';
import { Textarea } from './Textarea';
import { Card } from './Card';
import { Header } from './Header';
import { askAI } from '../../services/aiService';

interface AskAIPageProps {
  document: {
    id: number;
    title: string;
  };
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onBack: () => void;
}

export function AskAIPage({ document, isDarkMode, onToggleTheme, onBack }: AskAIPageProps) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setResponse('');

    try {
      const res = await askAI(document.id, question);
      setResponse(res.answer);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header
        title="Ask AI"
        subtitle={`About: ${document.title}`}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        action={
          <Button onClick={onBack} variant="ghost" size="md">
            <ArrowLeft className="size-5" />
            Back
          </Button>
        }
      />

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6 fade-in">

          <div className="space-y-4">
            <Textarea
              label="Your Question"
              placeholder="Ask anything about your document..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
            />

            <Button
              onClick={handleAsk}
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              disabled={!question.trim()}
            >
              <Send className="size-5" />
              Ask AI
            </Button>
          </div>

          {(response || isLoading) && (
            <Card variant="glass" className="fade-in">
              <div className="flex items-start gap-3 mb-4">
                <div className="size-10 rounded-xl bg-gradient-to-br from-accent via-primary to-accent flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles className="size-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Response</h3>
                  <p className="text-sm text-muted-foreground">Powered by AI Document Assistant</p>
                </div>
              </div>

              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded skeleton"></div>
                  <div className="h-4 bg-muted rounded skeleton w-5/6"></div>
                  <div className="h-4 bg-muted rounded skeleton w-4/6"></div>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none">
                  <p className="text-foreground whitespace-pre-line">{response}</p>
                </div>
              )}
            </Card>
          )}

          {!response && !isLoading && (
            <Card variant="default" className="p-6">
              <h4 className="font-semibold text-foreground mb-3">Suggested Questions</h4>
              <div className="space-y-2">
                {[
                  'Summarize the main points',
                  'What are the key takeaways?',
                  'Explain this in simpler terms',
                  'What questions does this raise?',
                ].map((suggested) => (
                  <button
                    key={suggested}
                    onClick={() => setQuestion(suggested)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-sm transition-smooth"
                  >
                    {suggested}
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
