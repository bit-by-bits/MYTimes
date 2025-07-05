import React from 'react';
import { Button } from '../ui/button';
import {
  ArrowLeft,
  Github,
  Mail,
  BookOpen,
  Lightbulb,
  AlertCircle,
  Quote,
} from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          About Semantic Highlighter
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Intelligent text analysis and highlighting tool powered by advanced
          semantic understanding
        </p>
      </div>

      <div className="grid gap-12">
        {/* What is Semantic Highlighter */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">What is Semantic Highlighter?</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
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
          <h2 className="text-2xl font-bold">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="group p-6 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-blue-900">
                  Definitions
                </h3>
              </div>
              <p className="text-blue-800">
                Automatically identifies and highlights definitions,
                explanations, and key concepts in your text
              </p>
            </div>

            <div className="group p-6 bg-green-50 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <Lightbulb className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-green-900">
                  Examples
                </h3>
              </div>
              <p className="text-green-800">
                Finds examples and illustrations that support main concepts and
                help clarify complex ideas
              </p>
            </div>

            <div className="group p-6 bg-yellow-50 rounded-xl border border-yellow-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <AlertCircle className="h-6 w-6 text-yellow-600 mr-3" />
                <h3 className="text-lg font-semibold text-yellow-900">
                  Action Items
                </h3>
              </div>
              <p className="text-yellow-800">
                Identifies TODOs, tasks, action items, and other actionable
                content in your text
              </p>
            </div>

            <div className="group p-6 bg-purple-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <Quote className="h-6 w-6 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold text-purple-900">
                  Quotes & References
                </h3>
              </div>
              <p className="text-purple-800">
                Highlights important quotes, citations, and references from
                authoritative sources
              </p>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">How to Use</h2>
          <div className="grid gap-4">
            <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Enter Your Text</h3>
                <p className="text-muted-foreground">
                  Paste or type your text into the rich text editor. You can
                  also try our sample text to see how it works.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Click Analyze</h3>
                <p className="text-muted-foreground">
                  Press the "Analyze Text" button to process your content using
                  our advanced semantic analysis engine.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">View Highlights</h3>
                <p className="text-muted-foreground">
                  Review the color-coded highlights in your text, with each
                  category clearly marked and explained.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Customize Results</h3>
                <p className="text-muted-foreground">
                  Use the pill toggles to show or hide different highlight
                  categories based on your needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Technology Stack</h2>
          <div className="p-6 bg-muted/30 rounded-xl border">
            <p className="text-muted-foreground leading-relaxed">
              Built with modern web technologies including{' '}
              <strong>React</strong>, <strong>TypeScript</strong>,
              <strong>Tailwind CSS</strong>, and{' '}
              <strong>Firebase Authentication</strong>. The semantic analysis is
              powered by advanced pattern recognition algorithms that identify
              contextual clues and linguistic patterns in your text. The rich
              text editor is built with
              <strong>TipTap</strong> for a smooth WYSIWYG editing experience.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6 py-8">
          <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Try our semantic highlighter today and discover insights hidden in
            your text!
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={onBack} size="lg" className="px-8">
              Start Highlighting
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                window.open(
                  'https://github.com/your-username/semantic-highlighter',
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
      <footer className="mt-16 pt-8 border-t border-muted">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              <strong>Semantic Highlighter v1.0.0</strong> • Built by{' '}
              <strong>BuildScraps</strong>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Making text analysis smarter, one highlight at a time
            </p>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                window.open('mailto:contact@buildscraps.com', '_blank')
              }
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('/privacy', '_blank')}
            >
              Privacy Policy
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};
