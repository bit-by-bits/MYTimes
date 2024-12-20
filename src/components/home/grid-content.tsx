import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { navData } from "@/lib/data";
import { useRouter } from "next/navigation";

const GridContent = () => {
  const games = navData.topNav;
  const router = useRouter();

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-4">
      {games.map(game => (
        <Card
          key={game.title}
          className="relative transition transform rounded-xl"
        >
          <CardHeader className="relative flex items-center justify-center h-36 bg-muted/20 rounded-t-xl">
            <Image
              src={game.icon}
              alt={game.title}
              width={64}
              height={64}
              className="rounded-full bg-white p-2 shadow-lg"
            />
          </CardHeader>
          <CardContent className="text-center p-4 space-y-4">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              {game.title}
            </CardTitle>
            <div className="flex justify-center gap-4">
              <Button
                className="py-2 px-4"
                onClick={() => router.push(game.items[0].url)}
              >
                Play
              </Button>
              <Button
                variant="outline"
                className="py-2 px-4"
                onClick={() => router.push(game.items[1].url)}
              >
                Rules
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GridContent;
