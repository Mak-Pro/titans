"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTelegram } from "@/providers/telegram";
import AppContext from "@/providers/context";
import { Select } from "@/components";
import { gameController, infoUser } from "@/api";
import { GamePhase, UserInfoProps } from "@/Types";

export default function Home() {
  const router = useRouter();
  const { user } = useTelegram();
  const { isRegistered, loading, setRewardsData } = useContext(AppContext);
  const [gamePhase, setGamePhase] = useState<GamePhase | string>("");
  const [checkIn, setCheckIn] = useState<string | boolean>(true);

  useEffect(() => {
    if (user && isRegistered) {
      infoUser(user.id)
        .then((data: UserInfoProps) => {
          if (data.dailyReward !== null) {
            setRewardsData(data.dailyReward);
          }
          if (data.firstCheckIn) {
            router.replace("/rewards");
          } else {
            setCheckIn(data.firstCheckIn);
          }
        })
        .then(() => {
          gameController("/games/info", { telegramId: user.id }).then(
            (data) => {
              const gamePhase: GamePhase = data.gamePhase;
              if (gamePhase === "FARMING") {
                router.replace("/farming");
              } else {
                setGamePhase(gamePhase);
              }
            }
          );
        });
    }
  }, [user, isRegistered]);

  if (!isRegistered && !loading) {
    router.replace("/onboarding");
  }

  if (!isRegistered || gamePhase !== "CHARGE" || checkIn) return null;

  return <Select />;
}
