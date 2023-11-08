import CardSpotlight from "./cardSpotlight";
import { Lock, Sparkles, type LucideIcon, Zap, Github } from "lucide-react";

interface iFeaturesData {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
}

const FeaturesData: iFeaturesData[] = [
  {
    title: "Fast",
    description:
      "Typethings is based on Tauri. It's a fast and lightweight with a excellent performance.",
    icon: Zap,
    iconColor: "text-orange-600 dark:text-orange-300",
  },
  {
    title: "Private",
    description:
      "Typethings is a private app. Your notes are stored on your computer and not on a server.",
    icon: Lock,
    iconColor: "text-yellow-600 dark:text-yellow-300",
  },
  {
    title: "Markdown",
    description:
      "Write in markdown and Typethings will render it in real time. Using TipTap as editor.",
    icon: Sparkles,
    iconColor: "text-blue-600 dark:text-blue-300",
  },
  {
    title: "Open Source",
    description:
      "Typethings is open source. You can contribute to the project on Github and help us to improve it 🙂.",
    icon: Github,
    iconColor: "dark:text-indigo-300",
  },
];

const Features = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {FeaturesData.map((feature, index) => (
        <CardSpotlight className="relative flex flex-col space-y-4" key={index}>
          <feature.icon className={feature.iconColor} />
          <h2 className="text-xl tracking-tight dark:text-neutral-300">
            {feature.title}
          </h2>
          <p className="text-sm">{feature.description}</p>
        </CardSpotlight>
      ))}
    </div>
  );
};

export default Features;
