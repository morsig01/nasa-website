import LibraryWrapper from '@/components/organisms/LibraryWrapper';

export const metadata = {
  title: 'NASA Image Library',
};

export default function LibraryPage() {
  return (
    <main className="min-h-[90vh]">
      <LibraryWrapper />
    </main>
  );
}
