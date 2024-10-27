import { auth } from "@/auth";
import HeroSection from "@/components/custom/main/HeroSection";
import StartupCards from "@/components/custom/main/StartupCards";
import { SanityLive } from "@/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const session = await auth();
  console.log(session?.id);

  const query = (await searchParams).query;
  return (
    <>
      <HeroSection query={query} />
      <StartupCards query={query} />
      <SanityLive />
    </>
  );
}
