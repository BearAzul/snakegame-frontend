import { useEffect } from "react";
import { useScoreStore } from "../store/useScoreStore.js";
import { LoaderCircle, Trophy } from "lucide-react";

const LeaderboardView = () => {
  const { leaderboard, getLeaderboard, isLeaderboardLoading } = useScoreStore();

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  return (
    <section className="min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="text-yellow-400" />
          Papan Skor
        </h1>

        {isLeaderboardLoading && (
          <div className="text-center py-10">
            <LoaderCircle className="size-10 animate-spin mx-auto" />
          </div>
        )}

        {!isLeaderboardLoading && leaderboard.length === 0 && (
          <p className="text-center text-gray-500">
            Belum ada skor. Jadilah yang pertama!
          </p>
        )}

        {!isLeaderboardLoading && leaderboard.length > 0 && (
          <div className="overflow-x-auto bg-base-300 rounded-lg">
            <table className="table">
              <thead>
                <tr>
                  <th>Peringkat</th>
                  <th>Pemain</th>
                  <th className="text-right">Skor</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry._id} className="hover">
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar hidden sm:block">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={entry.playerName.picture || `https://ui-avatars.com/api/?name=${entry.playerName.username}&background=random`}
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{entry.playerName.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right font-mono text-lg text-green-400">
                      {entry.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeaderboardView;