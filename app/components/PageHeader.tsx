interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="mb-16">
      <h1 className="text-4xl font-light">{title}</h1>
    </div>
  );
}
