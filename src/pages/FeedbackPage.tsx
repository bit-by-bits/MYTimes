import React from 'react';
import {
  Github,
  ArrowRight,
  MessageCircle,
  Users,
  FolderGit2,
} from 'lucide-react';

const FeedbackPage: React.FC = () => (
  <div className="max-w-2xl mx-auto p-4 space-y-8">
    <div className="flex items-center mb-4">
      <MessageCircle className="h-6 w-6 mr-2 text-primary" />
      <h1 className="text-2xl font-bold">Feedback & Contributing</h1>
    </div>
    <div className="space-y-8">
      {/* How to Report an Issue */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">How to Report an Issue</h2>
        </div>
        <div className="bg-muted/30 rounded-lg p-4 flex items-start gap-3">
          <MessageCircle className="h-6 w-6 text-primary mt-1" />
          <div>
            <p className="mb-2">
              Found a bug or want to suggest a feature? Please open an issue on
              our GitHub repository:
            </p>
            <a
              href="https://github.com/buildscraps/Semantic-Highlighter/issues"
              className="text-primary underline inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to Issues <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
      {/* How to Contribute */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">How to Contribute</h2>
        </div>
        <div className="bg-muted/30 rounded-lg p-4 flex items-start gap-3">
          <Users className="h-6 w-6 text-primary mt-1" />
          <div>
            <p className="mb-2">
              Want to help improve the project? Fork the repo, make your
              changes, and submit a pull request!
            </p>
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li>Fork the repository on GitHub</li>
              <li>Make your changes in a new branch</li>
              <li>Open a pull request describing your changes</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Repo Access */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Repo Access</h2>
        </div>
        <div className="bg-muted/30 rounded-lg p-4 flex items-start gap-3">
          <FolderGit2 className="h-6 w-6 text-primary mt-1" />
          <div>
            <p className="mb-2">
              All project code and issues are managed on GitHub. Visit the
              repository for more information:
            </p>
            <a
              href="https://github.com/buildscraps/Semantic-Highlighter"
              className="inline-flex items-center gap-2 text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              View the GitHub Repository
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default FeedbackPage;
