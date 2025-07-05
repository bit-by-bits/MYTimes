import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Github, Mail, Globe } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">About Semantic Highlighter</h1>
        <p className="text-lg text-muted-foreground">
          Intelligent text analysis and highlighting tool
        </p>
      </div>

      <div className="grid gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">What is Semantic Highlighter?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Semantic Highlighter is an intelligent text analysis tool that automatically identifies and highlights 
            important semantic structures in your text. Whether you're reading documentation, research papers, 
            or any other text content, our tool helps you quickly identify key concepts, examples, definitions, 
            and action items.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Features</h2>
          <div className="grid gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-900">Definitions</h3>
              <p className="text-blue-800">Automatically identifies and highlights definitions and explanations</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-900">Examples</h3>
              <p className="text-green-800">Finds examples and illustrations that support main concepts</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-semibold text-yellow-900">Action Items</h3>
              <p className="text-yellow-800">Identifies TODOs, tasks, and action items in your text</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-900">Quotes</h3>
              <p className="text-purple-800">Highlights important quotes and references</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">How to Use</h2>
          <ol className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="font-semibold mr-2">1.</span>
              Paste your text into the input field
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">2.</span>
              Click the "Analyze" button to process your text
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">3.</span>
              View the highlighted results with color-coded semantic categories
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">4.</span>
              Use the toggle switches to show/hide different highlight categories
            </li>
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Technology</h2>
          <p className="text-muted-foreground leading-relaxed">
            Built with modern web technologies including React, TypeScript, and Firebase Authentication. 
            The semantic analysis is powered by advanced pattern recognition algorithms that identify 
            contextual clues in your text.
          </p>
        </div>

        <div className="flex justify-center space-x-4 pt-8">
          <Button 
            variant="outline" 
            onClick={() => window.open('https://github.com/your-username/semantic-highlighter', '_blank')}
          >
            <Github className="h-4 w-4 mr-2" />
            View on GitHub
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.open('mailto:your-email@example.com', '_blank')}
          >
            <Mail className="h-4 w-4 mr-2" />
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};