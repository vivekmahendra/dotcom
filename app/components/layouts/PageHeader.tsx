import { DecryptedText } from "../react-bits";

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="mb-16">
      <h1 className="text-4xl font-light">
        <DecryptedText text={title} animateOn="view" revealDirection="start" speed={100} />
      </h1>
    </div>
  );
}
