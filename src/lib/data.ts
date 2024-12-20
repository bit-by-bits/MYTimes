import Routes from "./routes";
import { HelpCircle, MessageCircle } from "lucide-react";

export const navData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg"
  },
  topNav: [
    {
      title: "Wordle",
      icon: "/wordle.png",
      items: [
        { title: "Play Wordle", url: Routes.WORDLE.PLAY },
        { title: "How To Play", url: Routes.WORDLE.RULES }
      ]
    },
    {
      title: "Crossword",
      icon: "/crossword.png",
      items: [
        { title: "Play Crossword", url: Routes.CROSSWORD.PLAY },
        { title: "How To Play", url: Routes.CROSSWORD.RULES }
      ]
    },
    {
      title: "Sudoku",
      icon: "/sudoku.png",
      items: [
        { title: "Play Sudoku", url: Routes.SUDOKU.PLAY },
        { title: "How To Play", url: Routes.SUDOKU.RULES }
      ]
    }
  ],
  bottomNav: [
    { title: "Feedback", url: "#", icon: MessageCircle },
    { title: "Support", url: "#", icon: HelpCircle }
  ]
};
