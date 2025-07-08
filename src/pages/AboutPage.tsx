import React from 'react';
import { Button } from '../components/ui/button';
import { Github } from 'lucide-react';

const TAG_TYPES: Array<{
  key: string;
  label: string;
  color: string;
  description: string;
  trigger: string;
}> = [
  {
    key: 'definition',
    label: 'Definition',
    color: 'bg-blue-500',
    description: 'Highlights definitions and key concepts.',
    trigger: 'Phrases like "is defined as", "refers to", etc.',
  },
  {
    key: 'example',
    label: 'Example',
    color: 'bg-green-500',
    description: 'Highlights examples and illustrations.',
    trigger: 'Phrases like "for example", "such as", etc.',
  },
  {
    key: 'todo',
    label: 'TODO',
    color: 'bg-yellow-400',
    description: 'Highlights TODOs, tasks, and action items.',
    trigger: 'Lines starting with TODO, REVIEW, etc.',
  },
  {
    key: 'bullet',
    label: 'Bullet',
    color: 'bg-orange-600',
    description: 'Highlights bullet points.',
    trigger: 'Lines starting with •, -, or *.',
  },
  {
    key: 'numbered',
    label: 'Numbered',
    color: 'bg-purple-500',
    description: 'Highlights numbered lists.',
    trigger: 'Lines starting with 1., 2., etc.',
  },
  {
    key: 'code',
    label: 'Code',
    color: 'bg-gray-500',
    description: 'Highlights code blocks.',
    trigger: 'Text inside triple backticks (```).',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6 space-y-6 sm:space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          About Semantic Highlighter
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Intelligent text analysis and highlighting tool powered by advanced
          semantic understanding
        </p>
      </div>
      <div className="grid gap-8 sm:gap-12">
        {/* What is Semantic Highlighter */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">
            What is Semantic Highlighter?
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
            Semantic Highlighter is an intelligent text analysis tool that
            automatically identifies and highlights important semantic
            structures in your text. Whether you're reading documentation,
            research papers, or any other text content, our tool helps you
            quickly identify key concepts, examples, definitions, and action
            items using advanced pattern recognition algorithms.
          </p>
        </section>
        {/* Features */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold">Supported Tag Types</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg bg-card">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Trigger/Rule</th>
                  <th className="px-4 py-2 text-left">Color</th>
                </tr>
              </thead>
              <tbody>
                {TAG_TYPES.map(type => (
                  <tr key={type.key} className="border-t">
                    <td className="px-4 py-2 font-semibold flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full inline-block ${type.color}`}
                      />
                      {type.label}
                    </td>
                    <td className="px-4 py-2 text-sm">{type.description}</td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {type.trigger}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block w-8 h-4 rounded ${type.color}`}
                      ></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* How to Use */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold">How to Use</h2>
          <div className="grid gap-4">
            <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                1
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold">Paste or type your text</span>{' '}
                into the editor.
              </div>
            </div>
            <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                2
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold">Click "Analyze Text"</span> to
                highlight key structures.
              </div>
            </div>
            <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                3
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold">
                  Review and customize highlights
                </span>{' '}
                as needed.
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="text-center space-y-4 sm:space-y-6 py-6 sm:py-8">
          <h2 className="text-xl sm:text-2xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Try our semantic highlighter today and discover insights hidden in
            your text!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button asChild size="lg">
              <a href="/">Start Highlighting</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                window.open(
                  'https://github.com/buildscraps/Semantic-Highlighter',
                  '_blank'
                )
              }
            >
              <Github className="h-5 w-5 mr-2" />
              View Source
            </Button>
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-muted">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-sm text-muted-foreground">
              <strong>Semantic Highlighter v1.0.0</strong> • Built by{' '}
              <strong>BuildScraps</strong>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Making text analysis smarter, one highlight at a time
            </p>
          </div>
          {/* Privacy Policy button removed until implemented */}
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
