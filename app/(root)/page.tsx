import HeroSection from "@/components/custom/main/HeroSection";
import StartupCards from "@/components/custom/main/StartupCards";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  return (
    <>
      <HeroSection query={query} />
      <StartupCards query={query} />
    </>
  );
}
